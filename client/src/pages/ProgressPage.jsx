function ProgressPage({ stars, completedRoutines, totalRoutines, routines }) {
  const completionPercentage = (completedRoutines.length / totalRoutines) * 100;
  const completedRoutinesList = routines.filter(r => completedRoutines.includes(r.id));

  return (
    <div className="page-content progress-page">
      <div className="progress-header">
        <h2>Your Achievements</h2>
        <p className="header-subtitle">Track your wellness journey</p>
      </div>

      <div className="main-stat-card">
        <div className="main-stat-content">
          <div className="main-stat-number">{Math.round(completionPercentage)}%</div>
          <div className="main-stat-label">Overall Progress</div>
        </div>
        <div className="main-stat-visual">
          <svg viewBox="0 0 100 100" className="progress-ring">
            <circle cx="50" cy="50" r="40" className="progress-ring-circle-bg" />
            <circle
              cx="50"
              cy="50"
              r="40"
              className="progress-ring-circle"
              style={{
                strokeDashoffset: `${251.2 * (1 - completionPercentage / 100)}`
              }}
            />
          </svg>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stars}</div>
          <div className="stat-label">Total Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedRoutines.length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalRoutines - completedRoutines.length}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>

      <div className="achievements-section">
        <div className="section-header">
          <h3>Routines Completed</h3>
          <span className="count-badge">{completedRoutines.length}</span>
        </div>
        <div className="achievements-list">
          {completedRoutinesList.length > 0 ? (
            completedRoutinesList.map((routine, idx) => (
              <div key={routine.id} className="achievement-item" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="achievement-icon">{routine.emoji}</div>
                <div className="achievement-details">
                  <div className="achievement-name">{routine.name}</div>
                  <div className="achievement-status">Completed</div>
                </div>
                <div className="achievement-check"></div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Complete routines to build your achievement collection</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
