# The Pause

A short interactive narrative exploring how storytelling and guided reflection can encourage metacognitive thinking about ambiguous social situations.

**Live demo:** https://your-username.github.io/the-pause/ *(update after deployment)*

## About

The Pause is a three scene interactive narrative designed to encourage reflection on how we interpret everyday social situations.

You follow Aarav as he sends a friend a text asking to hang out. The reply is short and neutral, but he immediately starts reading into it and imagining the worst. Two days later, he discovers it never meant what he thought it did.

After each scene, the reader pauses to write a short reflection before continuing. At the end, the app generates a personalized reflection based on everything they wrote throughout the experience.

The story is inspired by rejection sensitivity, but I intentionally avoid mentioning that term inside the narrative. Instead, the experience focuses on helping users notice the gap between an event and the interpretation they build around it.

This isn't a diagnostic tool or a clinical application. It's a research prototype that I built as part of my graduate school portfolio to explore interactive storytelling, reflection, and metacognition.

## Why I built it

This is the third project in my portfolio.

My previous projects focused on HCI and generative AI. With this project, I wanted to explore how interactive storytelling and reflective writing could support metacognition.

Rather than teaching through explanations, the experience encourages users to move through an ambiguous situation, reflect on their own interpretation, and then compare it with what actually happened. The goal is to create a moment of reflection instead of presenting a lesson.

One design decision I cared about was using free text responses instead of multiple choice options. Since the project is about personal interpretation, asking people to write their own thoughts felt more authentic than forcing them into predefined categories.

The final AI generated reflection ties those responses together into a personalized summary instead of showing every user the same conclusion.

## Design decisions

- The friend is never portrayed as rude or dismissive. Everything they do is intentionally reasonable because the story is about interpretation, not about someone behaving badly.
- The narrative avoids clinical terminology. Aarav never labels what he is experiencing.
- The ending resolves the misunderstanding but not necessarily Aarav's emotions. I didn't want the story to suggest that one realization instantly fixes everything.
- The final reflection prompt is optional, so users don't have to share a personal experience if they don't want to.

## Tech stack

- React
- Vite
- Single page application (no router)

Scene 2 responses are sent to the Hugging Face emotion classifier (`j-hartmann/emotion-english-distilroberta-base`). The predicted emotion is never shown to the user directly. Instead, it provides additional context for generating the final reflection.

The closing reflection is generated with Gemini Flash Lite.

Everything is stored locally using `localStorage`. There is no backend or database, so nothing is collected or stored remotely.

API keys are currently exposed on the client since this is a small portfolio prototype. In a production application, both API calls would be routed through a backend or serverless proxy.

## Running locally

```bash
npm install
cp .env.example .env.local
# Add your API keys
npm run dev
```

## Deployment

```bash
npm run deploy
```

This publishes the `dist` folder to the `gh-pages` branch. Enable GitHub Pages and use the `gh-pages` branch as the source.

## Future research directions

- Move the API calls behind a small serverless proxy.
- Improve the mobile layout, especially the end screen.
- Compare AI generated reflections with fixed reflection prompts to investigate whether personalization encourages deeper reflection.
- Explore different prompting strategies that encourage metacognition without steering users toward a particular interpretation.