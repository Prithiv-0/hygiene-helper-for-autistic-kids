import { useState, useEffect } from 'react';

function GameActivity({ routine, onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentStep = routine.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / routine.steps.length) * 100;

  useEffect(() => {
    if (currentStep.duration > 0) {
      setTimeLeft(currentStep.duration);
    }
  }, [currentStepIndex]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentStep.duration > 0) {
      setTimeout(() => handleNext(), 500);
    }
  }, [timeLeft]);

  const handleNext = () => {
    if (currentStepIndex < routine.steps.length - 1) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setCurrentStepIndex(currentStepIndex + 1);
      }, 800);
    } else {
      onComplete();
    }
  };

  return (
    <div className="game-activity">
      {showConfetti && (
        <div className="confetti">
          <div className="confetti-piece">🎉</div>
          <div className="confetti-piece">⭐</div>
          <div className="confetti-piece">✨</div>
          <div className="confetti-piece">💫</div>
        </div>
      )}

      <div className="activity-header">
        <button className="back-button" onClick={() => window.location.reload()}>←</button>
        <div className="progress-container">
          <div className="progress-label">Step {currentStepIndex + 1} of {routine.steps.length}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="step-container">
        <div className="step-card">
          <div className="step-emoji">{currentStep.emoji}</div>
          <h2 className="step-text">{currentStep.text}</h2>

          {currentStep.duration > 0 ? (
            <div className="timer-section">
              <div className="timer-container">
                <svg className="timer-circle" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#4ECDC4"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - timeLeft / currentStep.duration)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                  />
                </svg>
                <div className="timer-number">{timeLeft}</div>
              </div>
              <p className="timer-message">Keep going! ⏰</p>
            </div>
          ) : (
            <button className="done-button" onClick={handleNext}>
              <span>✓ I Did It!</span>
            </button>
          )}

          {currentStepIndex < routine.steps.length - 1 && (
            <div className="next-step-preview">
              <div className="preview-label">↓ NEXT UP ↓</div>
              <div className="preview-emoji">{routine.steps[currentStepIndex + 1].emoji}</div>
              <div className="preview-text">{routine.steps[currentStepIndex + 1].text}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameActivity;
