function SettingsPage({ soundEnabled, animationEnabled, darkMode, onSoundToggle, onAnimationToggle, onDarkModeToggle }) {
  return (
    <div className="page-content settings-page">
      <div className="settings-header">
        <h2>Preferences</h2>
        <p className="header-subtitle">Customize your experience</p>
      </div>

      <div className="settings-list">
        <div className="settings-item">
          <div className="settings-item-content">
            <h4>Sound Effects</h4>
            <div className="settings-item-description">Get audio feedback when you complete actions</div>
          </div>
          <button 
            className={`toggle-switch ${soundEnabled ? 'active' : ''}`}
            onClick={onSoundToggle}
            role="switch"
            aria-checked={soundEnabled}
          />
        </div>

        <div className="settings-item">
          <div className="settings-item-content">
            <h4>Motion Effects</h4>
            <div className="settings-item-description">Enable smooth animations and transitions</div>
          </div>
          <button 
            className={`toggle-switch ${animationEnabled ? 'active' : ''}`}
            onClick={onAnimationToggle}
            role="switch"
            aria-checked={animationEnabled}
          />
        </div>

        <div className="settings-item">
          <div className="settings-item-content">
            <h4>Dark Mode</h4>
            <div className="settings-item-description">Use dark theme for comfortable viewing</div>
          </div>
          <button 
            className={`toggle-switch ${darkMode ? 'active' : ''}`}
            onClick={onDarkModeToggle}
            role="switch"
            aria-checked={darkMode}
          />
        </div>
      </div>

      <div className="info-section">
        <h4>About Daily Wellness</h4>
        <div className="info-section-content">
          <div className="info-item">Build positive daily habits with guided routines and positive reinforcement. Track your progress and earn rewards as you complete each routine.</div>
        </div>
      </div>

      <div className="info-section">
        <h4>Getting Started</h4>
        <div className="info-section-content">
          <div className="info-item">Select a routine from the home screen to get started. Follow each step carefully and use the timer to stay on track. Complete routines daily to earn points!</div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
