import { useState } from 'react';

function RoutineBuilderForm({ childId, onComplete }) {
  const [routineName, setRoutineName] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState({
    label: '',
    type: 'manual',
    duration: 20,
    iconId: 'hand',
    animationId: 'none'
  });

  const addStep = () => {
    if (currentStep.label.trim()) {
      setSteps([...steps, { ...currentStep, order: steps.length + 1 }]);
      setCurrentStep({
        label: '',
        type: 'manual',
        duration: 20,
        iconId: 'hand',
        animationId: 'none'
      });
    }
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/routines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routineName,
          childId,
          steps,
          createdBy: localStorage.getItem('caregiverId')
        })
      });
      
      const data = await response.json();
      onComplete(data);
    } catch (error) {
      console.error('Error creating routine:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Routine Builder</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Routine Name</label>
          <input
            type="text"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            required
            className="form-input"
            placeholder="e.g., Morning Handwashing"
          />
        </div>

        <div className="steps-builder">
          <h3 className="section-title">Build Steps</h3>
          
          <div className="step-input-group">
            <input
              type="text"
              value={currentStep.label}
              onChange={(e) => setCurrentStep({...currentStep, label: e.target.value})}
              className="form-input"
              placeholder="Step description (e.g., Turn on water)"
            />
            
            <select
              value={currentStep.type}
              onChange={(e) => setCurrentStep({...currentStep, type: e.target.value})}
              className="form-select"
            >
              <option value="manual">Manual (Button)</option>
              <option value="timed">Timed (Auto)</option>
            </select>

            {currentStep.type === 'timed' && (
              <input
                type="number"
                value={currentStep.duration}
                onChange={(e) => setCurrentStep({...currentStep, duration: parseInt(e.target.value)})}
                className="form-input small"
                placeholder="Seconds"
                min="5"
                max="60"
              />
            )}

            <button type="button" onClick={addStep} className="add-button">
              + Add Step
            </button>
          </div>

          <div className="steps-list">
            {steps.map((step, index) => (
              <div key={index} className="step-item">
                <span className="step-number">{index + 1}</span>
                <span className="step-label">{step.label}</span>
                <span className="step-type">{step.type === 'timed' ? `${step.duration}s` : 'Manual'}</span>
                <button type="button" onClick={() => removeStep(index)} className="remove-button">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="form-button" disabled={steps.length === 0}>
          Save Routine
        </button>
      </form>
    </div>
  );
}

export default RoutineBuilderForm;
