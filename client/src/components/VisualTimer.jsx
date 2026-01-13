import { useState, useEffect } from 'react';

function VisualTimer({ duration, onComplete, style = 'bubble' }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const percentage = (timeLeft / duration) * 100;

  if (style === 'bubble') {
    return (
      <div className="timer-container">
        <svg width="200" height="200" viewBox="0 0 200 200" className="bubble-timer">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#4A90E2"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 80}`}
            strokeDashoffset={`${2 * Math.PI * 80 * (1 - percentage / 100)}`}
            transform="rotate(-90 100 100)"
            className="progress-circle"
          />
          {/* Bubble effect */}
          <circle
            cx="100"
            cy="100"
            r={60 * (percentage / 100)}
            fill="#4A90E2"
            opacity="0.3"
            className="bubble-fill"
          />
        </svg>
        <div className="timer-text">{timeLeft}s</div>
      </div>
    );
  }

  // Bar style
  return (
    <div className="timer-bar-container">
      <div className="timer-bar-track">
        <div 
          className="timer-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="timer-text">{timeLeft} seconds</div>
    </div>
  );
}

export default VisualTimer;
