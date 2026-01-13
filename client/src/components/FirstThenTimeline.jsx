import { useState, useEffect } from 'react';
import VisualTimer from './VisualTimer';

function FirstThenTimeline({ routine, onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentStep = routine.steps[currentStepIndex];
  const nextStep = routine.steps[currentStepIndex + 1];
  const progress = ((currentStepIndex + 1) / routine.steps.length) * 100;

  useEffect(() => {
    if (currentStep && currentStep.type === 'timed') {
      setIsTimerActive(true);
    }
  }, [currentStepIndex]);

  const handleStepComplete = () => {
    if (currentStepIndex < routine.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setIsTimerActive(false);
    } else {
      onComplete();
    }
  };

  const handleTimerComplete = () => {
    handleStepComplete();
  };

  if (!currentStep) return null;

  return (
    <div className="timeline-container">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Main Timeline View */}
      <div className="first-then-layout">
        {/* FIRST Card (Current Task) */}
        <div className="task-card first-card">
          <div className="card-header">FIRST</div>
          <div className="card-content">
            <div className="task-icon">{getIconForTask(currentStep.iconId)}</div>
            <h2 className="task-label">{currentStep.label}</h2>
            
            {currentStep.type === 'timed' && isTimerActive ? (
              <VisualTimer 
                duration={currentStep.duration} 
                onComplete={handleTimerComplete}
                style="bubble"
              />
            ) : (
              <button className="done-button pulse" onClick={handleStepComplete}>
                Done ✓
              </button>
            )}
          </div>
        </div>

        {/* THEN Card (Next Task) */}
        {nextStep && (
          <div className="task-card then-card">
            <div className="card-header">THEN</div>
            <div className="card-content">
              <div className="task-icon small">{getIconForTask(nextStep.iconId)}</div>
              <h3 className="task-label small">{nextStep.label}</h3>
            </div>
          </div>
        )}
      </div>

      {/* Step Counter */}
      <div className="step-counter">
        Step {currentStepIndex + 1} of {routine.steps.length}
      </div>
    </div>
  );
}

// Helper function to map icon IDs to SVG elements
function getIconForTask(iconId) {
  const icons = {
    hand: '🖐️',
    water: '💧',
    soap: '🧼',
    towel: '🧺',
    brush: '🪥',
    face: '😊',
    default: '✋'
  };
  return icons[iconId] || icons.default;
}

export default FirstThenTimeline;
