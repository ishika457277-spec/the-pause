import { useState } from 'react';
import { scenes, personalPrompt } from './narrative';
import Scene from './Scene';
import EndScreen from './EndScreen';
import { analyzeSentiment } from './api';
import { saveSession } from './storage';
import './App.css';

const TOTAL_STEPS = scenes.length + 1; // 3 narrative scenes + 1 personal reflection

export default function App() {
  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState(['', '', '', '']);
  const [sentiment, setSentiment] = useState(null);
  const [finished, setFinished] = useState(false);

  const activeStep = current < scenes.length ? scenes[current] : personalPrompt;

  const handleChange = (value) => {
    const next = [...responses];
    next[current] = value;
    setResponses(next);
  };

  const handleContinue = async () => {
    if (current < scenes.length && scenes[current].analyzeSentiment) {
      const result = await analyzeSentiment(responses[current]);
      setSentiment(result);
    }

    if (current < TOTAL_STEPS - 1) {
      setCurrent(current + 1);
    } else {
      saveSession({ responses });
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="app-shell">
        <EndScreen responses={responses} sentiment={sentiment} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Scene
        key={activeStep.id}
        scene={activeStep}
        value={responses[current]}
        onChange={handleChange}
        onContinue={handleContinue}
        isLast={current === TOTAL_STEPS - 1}
      />
    </div>
  );
}
