import { useState } from 'react';

function CaregiverRegistrationForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/caregivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          passwordHash: formData.password, // In production, hash this properly
          subscriptionStatus: 'active',
          childProfiles: []
        })
      });
      
      const data = await response.json();
      localStorage.setItem('caregiverId', data._id);
      onComplete(data);
    } catch (error) {
      console.error('Error registering caregiver:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Caregiver Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            className="form-input"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="form-input"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            className="form-input"
            placeholder="Create a secure password"
          />
        </div>

        <button type="submit" className="form-button">
          Register Account
        </button>
      </form>
    </div>
  );
}

export default CaregiverRegistrationForm;
