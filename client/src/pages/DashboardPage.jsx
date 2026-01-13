import { useState } from 'react';

function DashboardPage({ stars, completedToday, completedRoutines, routines }) {
  const [selectedDay, setSelectedDay] = useState('today');
  
  const getStreak = () => {
    const completed = completedToday.length;
    return Math.floor(completed / 2);
  };

  const getAverageCompletion = () => {
    if (completedRoutines.length === 0) return 0;
    return Math.round((completedRoutines.length / routines.length) * 100);
  };

  const getTopRoutines = () => {
    const routineCompletionCount = {};
    routines.forEach(r => {
      routineCompletionCount[r.id] = completedRoutines.filter(id => id === r.id).length;
    });
    return Object.entries(routineCompletionCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id]) => routines.find(r => r.id === id));
  };

  return (
    <div className="page-content dashboard-page">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="header-subtitle">Your wellness overview</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card large">
          <div className="card-label">Total Stars Earned</div>
          <div className="card-value">{stars}</div>
          <div className="card-subtext">Keep building your streak!</div>
        </div>

        <div className="dashboard-card">
          <div className="card-label">Current Streak</div>
          <div className="card-value">{getStreak()}</div>
          <div className="card-subtext">days</div>
        </div>

        <div className="dashboard-card">
          <div className="card-label">Completion Rate</div>
          <div className="card-value">{getAverageCompletion()}%</div>
          <div className="card-subtext">overall</div>
        </div>

        <div className="dashboard-card">
          <div className="card-label">Routines Completed</div>
          <div className="card-value">{completedRoutines.length}</div>
          <div className="card-subtext">of {routines.length}</div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Top Routines Today</h3>
        </div>
        <div className="routine-stats-list">
          {completedToday.length > 0 ? (
            routines
              .filter(r => completedToday.includes(r.id))
              .map(routine => (
                <div key={routine.id} className="routine-stat-item">
                  <div className="routine-stat-emoji">{routine.emoji}</div>
                  <div className="routine-stat-name">{routine.name}</div>
                  <div className="routine-stat-badge">Completed</div>
                </div>
              ))
          ) : (
            <div className="empty-state">
              <p>No routines completed today yet. Start with one!</p>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Insights</h3>
        </div>
        <div className="insights-list">
          <div className="insight-item">
            <div className="insight-title">Most Consistent</div>
            {getTopRoutines().length > 0 ? (
              <div className="insight-value">{getTopRoutines()[0].name}</div>
            ) : (
              <div className="insight-value">Start completing routines</div>
            )}
          </div>
          <div className="insight-item">
            <div className="insight-title">Daily Average</div>
            <div className="insight-value">{Math.ceil(completedRoutines.length / 1)} routines</div>
          </div>
          <div className="insight-item">
            <div className="insight-title">Progress Level</div>
            <div className="insight-value">
              {completedRoutines.length < 5 ? 'Beginner' : completedRoutines.length < 15 ? 'Intermediate' : 'Advanced'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
