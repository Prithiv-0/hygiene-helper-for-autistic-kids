function CelebrationScreen({ routineName, onContinue }) {
  return (
    <div className="celebration-screen">
      <div className="celebration-bg-confetti">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bg-confetti" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}>
            {['🎉', '⭐', '✨', '🌟'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="celebration-content">
        <div className="trophy-icon">🏆</div>

        <h1 className="celebration-title">Excellent Work!</h1>
        
        <div className="routine-name-celebration">You completed {routineName}</div>

        <div className="stars-earned">
          <div className="star-earned">⭐</div>
          <div className="star-earned">⭐</div>
        </div>

        <div className="celebration-message">
          Keep building healthy habits, one step at a time! 🌱
        </div>

        <div className="stats-box">
          <div className="stat">
            <span className="stat-icon">✨</span>
            <span>Great effort!</span>
          </div>
        </div>

        <button className="continue-button" onClick={onContinue}>
          Play Again →
        </button>
      </div>
    </div>
  );
}

export default CelebrationScreen;
