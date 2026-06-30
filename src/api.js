

const HF_API_URL = 'https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';

export async function analyzeSentiment(text) {
  const apiKey = import.meta.env.VITE_HF_API_KEY;
  if (!apiKey || !text?.trim()) return null;

  try {
    const res = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error('Hugging Face API error', res.status, errorBody);
      return null;
    }
    const data = await res.json();
    // Response shape: [[{label, score}, ...]]
    const scores = Array.isArray(data) ? data[0] : null;
    if (!scores) {
      console.error('Hugging Face response had unexpected shape:', data);
      return null;
    }
    const top = scores.reduce((a, b) => (b.score > a.score ? b : a));
    return { label: top.label, score: top.score };
  } catch (err) {
    console.error('Sentiment analysis failed:', err);
    return null;
  }
}

export async function generateReflection(responses, sentiment) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const fallback = templatedFallback(responses);
  if (!apiKey) return fallback;

  const prompt = buildPrompt(responses, sentiment);

  try {
    const res = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
      }),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error('Gemini API error', res.status, errorBody);
      return fallback;
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error('Gemini response had no text. Full response:', data);
    }
    return text?.trim() || fallback;
  } catch (err) {
    console.error('Reflection generation failed:', err);
    return fallback;
  }
}

function buildPrompt(responses, sentiment) {
  const [r1, r2, r3, r4] = responses;
  const sentimentLine = sentiment
    ? `An emotion classifier analyzed their Scene 2 response and detected "${sentiment.label}" as the dominant emotional tone (confidence ${(sentiment.score * 100).toFixed(0)}%). Weave an acknowledgment of this detected emotion naturally into your reflection — e.g. "there's a real [emotion] in how you described..." — without naming the classifier itself.`
    : '';

  const personalLine = r4?.trim()
    ? `4. (Asked directly about their OWN life — a time something similar happened to them, not to Aarav): "${r4}"`
    : '4. (Asked about their own life, but they left this blank or said nothing comes to mind — that is a valid answer, do not push them to find an example that isn\'t there)';

  return `You are generating a short, personalized reflection for a research prototype about metacognition and rejection sensitivity. A user just went through a 3-scene interactive narrative about a character named Aarav who asked a friend to hang out, got a brief neutral reply ("kinda busy"), and spiraled into believing he'd been rejected before learning the friend just meant a different weekend. After the story, they were asked directly whether something similar has happened in their own life.

The user wrote these responses:
1. (What Aarav received, factually): "${r1 || '(no response)'}"
2. (What Aarav felt in his body / told himself it meant): "${r2 || '(no response)'}"
3. (Looking back, what happened vs what his mind added): "${r3 || '(no response)'}"
${personalLine}

${sentimentLine}

STRICT REQUIREMENTS — your reflection will be rejected if it doesn't follow these:
- You MUST directly reference or closely paraphrase at least one specific word or phrase the user actually wrote across responses 1-4. Generic reflections that could apply to any user are not acceptable.
- If response 4 contains a real personal example, that is the most important thing to respond to — explicitly connect it to the pattern they just watched in Aarav's story. Name the structural similarity (a neutral trigger, then an internal story) without diagnosing or labeling it.
- If response 4 is blank or says nothing comes to mind, do not invent a connection — instead, briefly affirm that noticing the pattern in someone else's story is itself useful, and leave it there.
- If response 1 stuck to pure facts and response 2 or 3 introduced interpretation/emotion, point out that shift.
- If the user's responses were short, sparse, or vague, say so honestly rather than inventing depth that isn't there.
- Write 3-5 sentences, second person, addressing the user directly.
- Do not diagnose, do not use clinical terms like "RSD" or "ADHD".
- Do not be preachy or give advice. End on a specific observation about THEIR writing, not a generic life lesson.
- Output only the reflection text, nothing else — no preamble, no markdown.`;
}

function templatedFallback(responses) {
  const [, r2, r3, r4] = responses;
  if (r4?.trim()) {
    return "What you named from your own life isn't so different from what you watched happen to Aarav — a small, neutral moment, and a much bigger story built on top of it. Noticing that pattern in yourself, even briefly, is the harder and more useful version of what this prototype is pointing at.";
  }
  if (r2 || r3) {
    return "Looking at what you wrote, there's a moment where the facts of what happened and the story your mind told about it started to pull apart. That gap, once you can see it, is the whole skill this prototype is pointing at — not making the feeling go away, just noticing there's space between the feeling and the conclusion.";
  }
  return "There's often a small space between what actually happens and the story we build on top of it. Noticing that space, even after the fact, is the whole skill this prototype is pointing at.";
}
