import { useState } from 'react';

function Beat({ beat }) {
  switch (beat.type) {
    case 'quote':
      return (
        <div className={`beat-quote ${beat.speaker.startsWith('Aarav') ? 'is-aarav' : 'is-friend'}`}>
          <p className="beat-speaker">{beat.speaker}</p>
          <p className="beat-quote-text">{beat.text}</p>
        </div>
      );
    case 'thought':
      return <p className="beat-thought">{beat.text}</p>;
    case 'draft':
      return <p className="beat-draft">{beat.text}</p>;
    case 'emphasis':
      return <p className="beat-emphasis">{beat.text}</p>;
    default:
      return <p className="beat-line">{beat.text}</p>;
  }
}

export default function Scene({ scene, value, onChange, onContinue, isLast }) {
  // how many beats are shown so far; starts at 1, climbs on click
  // until the prompt block appears
  const [revealed, setRevealed] = useState(1);
  const allBeatsShown = revealed >= scene.beats.length;

  const handleStageClick = () => {
    if (!allBeatsShown) {
      setRevealed((r) => Math.min(r + 1, scene.beats.length));
    }
  };

  return (
    <div className="scene">
      <div className="scene-header">
        <span className="scene-title">{scene.title}</span>
        <span className="scene-subtitle">{scene.subtitle}</span>
      </div>

      <div
        className={`stage ${allBeatsShown ? 'stage-done' : 'stage-active'}`}
        onClick={handleStageClick}
      >
        <div className="stage-beats">
          {scene.beats.slice(0, revealed).map((beat, i) => (
            <Beat beat={beat} key={i} />
          ))}
        </div>
        {!allBeatsShown && (
          <div className="advance-hint">
            <span>tap to continue</span>
            <span className="advance-arrow">&#9656;</span>
          </div>
        )}
      </div>

      {allBeatsShown && (
        <div className="prompt-block">
          <p className="prompt-label">{scene.promptLabel}</p>
          <p className="prompt-text">{scene.prompt}</p>
          <textarea
            className="response-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={scene.placeholder}
            rows={4}
            autoFocus
          />
          <div className="continue-row">
            <button
              className="continue-btn"
              onClick={onContinue}
              disabled={!scene.optional && !value.trim()}
            >
              {isLast ? 'Finish' : 'Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
