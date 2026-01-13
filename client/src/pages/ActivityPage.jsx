import { useState, useEffect, useCallback } from 'react';

function ActivityPage({ routine, onComplete, onBack }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentStep = routine.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / routine.steps.length) * 100;

  // Initialize timer when step changes
  useEffect(() => {
    if (currentStep.duration > 0) {
      setTimeLeft(currentStep.duration);
      setIsTimerActive(true);
    } else {
      setIsTimerActive(false);
    }
  }, [currentStepIndex, currentStep.duration]);

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      setIsTimerActive(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // Auto-advance when timer completes
  useEffect(() => {
    if (timeLeft === 0 && currentStep.duration > 0 && !isTimerActive) {
      const delay = setTimeout(() => {
        handleNext();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [timeLeft, isTimerActive, currentStep.duration]);

  const handleNext = useCallback(() => {
    if (currentStepIndex < routine.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete(1);
    }
  }, [currentStepIndex, routine.steps.length, onComplete]);

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className="page-content activity-page">
      <div className="activity-header">
        <button className="back-btn" onClick={onBack}>Back</button>
        <div className="header-title">{routine.name}</div>
        <div className="step-counter">{currentStepIndex + 1}/{routine.steps.length}</div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="activity-main">
        <div className="step-display">
          <div className="step-emoji">{currentStep.emoji}</div>
          <div className="step-text">{currentStep.text}</div>

          {currentStep.duration > 0 ? (
            <div className="timer-container">
              <svg viewBox="0 0 200 200" className="timer-ring">
                <circle cx="100" cy="100" r="90" className="timer-ring-bg" />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  className="timer-ring-progress"
                  style={{
                    strokeDashoffset: `${565.48 * (1 - timeLeft / currentStep.duration)}`
                  }}
                />
              </svg>
              <div className="timer-number">{timeLeft}s</div>
            </div>
          ) : (
            <button className="primary-button" onClick={handleNext}>
              Done
            </button>
          )}
        </div>

        <div className="step-controls">
          {currentStep.duration > 0 && isTimerActive && (
            <button className="secondary-button" onClick={handleSkip}>Skip Step</button>
          )}
        </div>

        {currentStepIndex < routine.steps.length - 1 && (
          <div className="next-step-preview">
            <div className="preview-label">Next Step</div>
            <div className="preview-item">
              <div className="preview-emoji">{routine.steps[currentStepIndex + 1].emoji}</div>
              <div className="preview-text">{routine.steps[currentStepIndex + 1].text}</div>
            </div>
          </div>
        )}

        {currentStepIndex === routine.steps.length - 1 && (
          <div className="completion-hint">
            {currentStep.duration > 0 && isTimerActive ? 'Timer will finish this step...' : 'Complete this step and you\'re done!'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityPage;
