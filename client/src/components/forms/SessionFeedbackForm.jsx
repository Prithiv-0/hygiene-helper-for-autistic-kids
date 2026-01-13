import { useState } from 'react';

function SessionFeedbackForm({ childId, routineId, routineName, stepsCompleted, totalSteps, onComplete }) {
  const [formData, setFormData] = useState({
    moodRating: 3,
    parentNotes: '',
    completionStatus: stepsCompleted === totalSteps ? 'finished' : 'abandoned'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          childId,
          routineId,
          routineName,
          stepsCompleted,
          totalSteps
        })
      });
      
      const data = await response.json();
      onComplete(data);
    } catch (error) {
      console.error('Error logging session:', error);
    }
  };

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊'];

  return (
    <div className="form-container">
      <h2 className="form-title">Session Feedback</h2>
      <p className="form-subtitle">Routine: {routineName}</p>
      <p className="form-subtitle">Completed: {stepsCompleted} / {totalSteps} steps</p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">How did it go?</label>
          <div className="mood-selector">
            {moodEmojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                className={`mood-button ${formData.moodRating === index + 1 ? 'selected' : ''}`}
                onClick={() => setFormData({...formData, moodRating: index + 1})}
              >
                <span className="mood-emoji">{emoji}</span>
                <span className="mood-number">{index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Notes (Optional)</label>
          <textarea
            value={formData.parentNotes}
            onChange={(e) => setFormData({...formData, parentNotes: e.target.value})}
            className="form-textarea"
            placeholder="Any observations? Struggles or successes?"
            rows="4"
          />
        </div>

        <button type="submit" className="form-button">
          Save Feedback
        </button>
      </form>
    </div>
  );
}

export default SessionFeedbackForm;
