import { useState } from 'react';

function ChildProfileForm({ caregiverId, onComplete }) {
  const [formData, setFormData] = useState({
    childName: '',
    nickname: '',
    sensoryConfig: {
      soundMuted: false,
      timerStyle: 'bubble',
      highContrast: true,
      theme: 'light'
    },
    avatarId: 'default'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          caregiverId
        })
      });
      
      const data = await response.json();
      localStorage.setItem('currentChildId', data._id);
      onComplete(data);
    } catch (error) {
      console.error('Error creating child profile:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Child Profile & Sensory Settings</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Child's Name</label>
          <input
            type="text"
            value={formData.childName}
            onChange={(e) => setFormData({...formData, childName: e.target.value})}
            required
            className="form-input"
            placeholder="Enter child's name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nickname (Optional)</label>
          <input
            type="text"
            value={formData.nickname}
            onChange={(e) => setFormData({...formData, nickname: e.target.value})}
            className="form-input"
            placeholder="Preferred name"
          />
        </div>

        <div className="sensory-section">
          <h3 className="section-title">Sensory Preferences</h3>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.sensoryConfig.soundMuted}
                onChange={(e) => setFormData({
                  ...formData,
                  sensoryConfig: {...formData.sensoryConfig, soundMuted: e.target.checked}
                })}
                className="checkbox-input"
              />
              <span>Mute All Sounds</span>
            </label>
          </div>

          <div className="radio-group">
            <label className="form-label">Timer Visual Style</label>
            <div className="radio-options">
              <label className="radio-label">
                <input
                  type="radio"
                  value="bubble"
                  checked={formData.sensoryConfig.timerStyle === 'bubble'}
                  onChange={(e) => setFormData({
                    ...formData,
                    sensoryConfig: {...formData.sensoryConfig, timerStyle: e.target.value}
                  })}
                />
                <span>Bubble</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="bar"
                  checked={formData.sensoryConfig.timerStyle === 'bar'}
                  onChange={(e) => setFormData({
                    ...formData,
                    sensoryConfig: {...formData.sensoryConfig, timerStyle: e.target.value}
                  })}
                />
                <span>Progress Bar</span>
              </label>
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.sensoryConfig.highContrast}
                onChange={(e) => setFormData({
                  ...formData,
                  sensoryConfig: {...formData.sensoryConfig, highContrast: e.target.checked}
                })}
                className="checkbox-input"
              />
              <span>High Contrast Mode</span>
            </label>
          </div>
        </div>

        <button type="submit" className="form-button">
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default ChildProfileForm;
