import { useEffect, useState } from 'react';
import { endScreen } from './narrative';
import { generateReflection } from './api';

export default function EndScreen({ responses, sentiment }) {
  const [synthesis, setSynthesis] = useState(null);

  useEffect(() => {
    let cancelled = false;
    generateReflection(responses, sentiment).then((text) => {
      if (!cancelled) setSynthesis(text);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scene end-screen">
      <div className="scene-header">
        <span className="scene-title">The Pause</span>
      </div>

      <div className="end-intro">
        {endScreen.intro.map((p, i) => (
          <p className="prose" key={`intro-${i}`}>{p}</p>
        ))}
      </div>

      <div className="recap-card">
        <p className="recap-label">{endScreen.reflectionsLabel}</p>
        {endScreen.responseLabels.map((label, i) => (
          <div className="recap-item" key={`recap-${i}`}>
            <p className="recap-item-label">{label}</p>
            <p className="recap-item-text">
              {responses[i] || (i === 3 ? '(left blank, and that\'s okay)' : '(no response)')}
            </p>
          </div>
        ))}
      </div>

      <div className="synthesis-block">
        <p className="synthesis-label">{endScreen.synthesisLabel}</p>
        <p className="synthesis-intro">{endScreen.synthesisIntro}</p>
        {synthesis ? (
          <p className="synthesis-text">{synthesis}</p>
        ) : (
          <div className="synthesis-loading">
            <span>Reading your reflections</span>
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}
      </div>

      {endScreen.closing.map((p, i) => (
        <p className="closing-text" key={`closing-${i}`}>{p}</p>
      ))}
      <p className="disclaimer">{endScreen.disclaimer}</p>
    </div>
  );
}
