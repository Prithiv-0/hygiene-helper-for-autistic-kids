function HomePage({ routines, onSelectRoutine, stars, completedToday }) {
  const completionRate = Math.round((completedToday.length / routines.length) * 100);
  const streak = completedToday.length > 0 ? Math.floor(completedToday.length / 2) : 0;

  return (
    <div className="page-content home-page">
      <div className="daily-tip">
        <div className="daily-tip-title">Daily Tip</div>
        <div className="daily-tip-text">Consistency is key. Try completing one routine at the same time each day to build stronger habits.</div>
      </div>

      <div className="home-header">
        <div>
          <h1>Daily Wellness</h1>
          <p className="header-subtitle">Build positive habits today</p>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-mini">
          <div className="stat-mini-value">{stars}</div>
          <div className="stat-mini-label">Points</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-value">{streak}</div>
          <div className="stat-mini-label">Day Streak</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-value">{completionRate}%</div>
          <div className="stat-mini-label">Today's Progress</div>
        </div>
      </div>

      <div className="routines-grid">
        {routines.map((routine) => {
          const isCompleted = completedToday.includes(routine.id);
          return (
            <button
              key={routine.id}
              className={`routine-card ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectRoutine(routine)}
            >
              <span className="routine-emoji">{routine.emoji}</span>
              <div className="routine-name">{routine.name}</div>
              {isCompleted && <div className="completed-badge"></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
