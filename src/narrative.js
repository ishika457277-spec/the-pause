// Narrative content for The Pause, split into beats so the UI can reveal
// them one at a time instead of dumping the whole scene as one block.
//
// beat types: line (narration), quote (dialogue), thought (internal),
// draft (typed but not sent), emphasis (the standalone payoff lines)

export const scenes = [
  {
    id: 'scene1',
    title: 'Scene 1',
    subtitle: 'The Ask',
    beats: [
      { type: 'line', text: 'It took Aarav three days to send the message.' },
      { type: 'line', text: 'He opened the chat. Closed it. Typed. Deleted. Opened it again.' },
      { type: 'line', text: 'He wondered if he was interrupting. If it had been too long. If asking would make things awkward.' },
      { type: 'line', text: 'On the third evening, he finally pressed send.' },
      { type: 'quote', speaker: 'Aarav', text: 'hey, want to hang out this weekend?' },
      { type: 'line', text: 'The message was read almost immediately.' },
      { type: 'line', text: 'A reply arrived less than a minute later.' },
      { type: 'quote', speaker: 'Friend', text: "ah can't, kinda busy this weekend" },
      { type: 'line', text: 'Five words. Nothing more.' },
      { type: 'line', text: 'Aarav stared at the screen. The typing cursor disappeared. The conversation stayed still.' },
    ],
    promptLabel: 'Pause for a moment. Before anything else happens —',
    prompt: 'What did Aarav actually receive? Write only what is directly observable. Try not to include what you think it means.',
    placeholder: 'He sent a message asking to hang out, and got a reply saying...',
    analyzeSentiment: false,
  },
  {
    id: 'scene2',
    title: 'Scene 2',
    subtitle: 'The Flood',
    beats: [
      { type: 'line', text: "An hour passes. The conversation hasn't changed." },
      { type: 'line', text: 'His phone is face down now, but he knows exactly where it is.' },
      { type: 'line', text: "His chest feels tight. His shoulders won't relax. His stomach twists in a way that's difficult to describe." },
      { type: 'line', text: "Not pain. More like his body has decided something is wrong before he's had the chance to." },
      { type: 'line', text: 'His thoughts begin filling in the empty space.' },
      { type: 'thought', text: "I shouldn't have asked." },
      { type: 'thought', text: 'They probably felt obligated to reply.' },
      { type: 'thought', text: 'I made things weird.' },
      { type: 'thought', text: "They didn't even try to suggest another day." },
      { type: 'thought', text: 'Maybe this happens every time and I just never noticed.' },
      { type: 'line', text: 'He opens the chat again. His fingers hover over the keyboard.' },
      { type: 'draft', text: '"no worries."' },
      { type: 'draft', text: '"it\'s okay."' },
      { type: 'draft', text: '"forget i asked."' },
      { type: 'line', text: 'Finally he types something shorter.' },
      { type: 'quote', speaker: 'Aarav (unsent)', text: 'all good' },
      { type: 'line', text: "He doesn't send it. He just stares at it." },
    ],
    promptLabel: 'Take a moment before continuing.',
    prompt: 'What is Aarav feeling in his body right now? And separately — what is he telling himself this message means? Do those feel like the same thing, or are they different?',
    placeholder: "In his body, he's feeling... and he's telling himself...",
    analyzeSentiment: true,
  },
  {
    id: 'scene3',
    title: 'Scene 3',
    subtitle: 'The Pause',
    beats: [
      { type: 'line', text: "Two days later, his phone vibrates. It's the same friend." },
      { type: 'quote', speaker: 'Friend', text: 'hey! sorry, i realized my reply sounded abrupt \u{1F62D}' },
      { type: 'quote', speaker: 'Friend', text: 'this weekend is packed because of family stuff.' },
      { type: 'quote', speaker: 'Friend', text: "i'm free next weekend though if you're still up for it?" },
      { type: 'line', text: 'Aarav reads the messages twice.' },
      { type: 'line', text: 'The tightness in his chest eases.' },
      { type: 'line', text: 'Then something else arrives. Embarrassment.' },
      { type: 'line', text: "Not because his friend had done anything wrong. Because somewhere between one short reply and this moment, his mind had quietly built an entire story." },
      { type: 'line', text: 'A story where he had already been rejected. Where asking had been a mistake. Where distance was safer than trying again.' },
      { type: 'line', text: 'None of those things had appeared in the messages. They had appeared somewhere else.' },
      { type: 'line', text: "His thumb hovers above the keyboard. He hasn't replied yet." },
      { type: 'emphasis', text: 'There is a small space between what happened... and the story his mind wrote about it.' },
      { type: 'emphasis', text: 'For the first time, he notices that space.' },
    ],
    promptLabel: 'Before Aarav replies —',
    prompt: "Can you describe what actually happened in this story, from beginning to end? Then describe what Aarav's mind added on top of those events. You don't need to solve anything. Just notice the difference.",
    placeholder: 'What actually happened was... what his mind added was...',
    analyzeSentiment: false,
  },
];

export const personalPrompt = {
  id: 'personal',
  title: 'One more thing',
  subtitle: 'Before we finish',
  beats: [
    { type: 'line', text: "You just watched Aarav build a whole story out of five neutral words." },
    { type: 'line', text: "That's not unique to him." },
    { type: 'emphasis', text: 'Has something like this ever happened to you?' },
  ],
  promptLabel: "This one's about you, not Aarav.",
  prompt: "Think of a small, ordinary moment — a short reply, a delay, a quiet room — where your mind built something bigger than what actually happened. You don't need to tell the whole story. Just name the moment, briefly, if one comes to mind.",
  placeholder: "A time this happened to me was... (or: nothing comes to mind right now, and that's fine too)",
  optional: true,
};

export const endScreen = {
  title: 'The Pause',
  intro: [
    'Throughout this story, you were invited to separate events from interpretations.',
    'Sometimes those two things stay close together. Sometimes the distance between them becomes much larger than we realize. That distance is what this prototype is interested in.',
  ],
  reflectionsLabel: 'Your reflections',
  responseLabels: ['What happened', "What Aarav's mind built", 'Looking back', 'In your own life'],
  synthesisLabel: 'A personalized reflection',
  synthesisIntro: 'The reflection below was generated from the responses you wrote during the story. It is intended to summarize patterns you noticed, not to evaluate or diagnose you.',
  closing: [
    'Thank you for taking part. This experience is a research prototype exploring how interactive narratives can support metacognitive reflection about emotionally ambiguous situations.',
  ],
  disclaimer: 'It is not a diagnostic tool, psychological assessment, or substitute for professional support.',
};
