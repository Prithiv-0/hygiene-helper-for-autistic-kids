function HomeScreen({ routines, onSelectRoutine, stars }) {
  return (
    <div className="home-screen">
      <div className="home-header">
        <h1>Hygiene Heroes</h1>
        <div className="star-display">
          <span className="star-icon">⭐</span>
          <span>{stars} Stars</span>
        </div>
      </div>

      <div className="routines-grid">
        {routines.map((routine) => (
          <button
            key={routine.id}
            className="routine-card"
            onClick={() => onSelectRoutine(routine)}
          >
            <span className="routine-emoji">{routine.emoji}</span>
            <h3 className="routine-name">{routine.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
