import { useState, useEffect } from 'react';

function RewardConfigForm({ childId, onComplete }) {
  const [currentStarCount, setCurrentStarCount] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState({
    rewardName: '',
    starCost: 5,
    imageUrl: '',
    isActive: true
  });

  useEffect(() => {
    loadRewards();
  }, [childId]);

  const loadRewards = async () => {
    try {
      const response = await fetch(`/api/rewards/child/${childId}`);
      const data = await response.json();
      setCurrentStarCount(data.currentStarCount || 0);
      setRewards(data.rewards || []);
    } catch (error) {
      console.error('Error loading rewards:', error);
    }
  };

  const addReward = () => {
    if (newReward.rewardName.trim()) {
      setRewards([...rewards, { ...newReward, rewardId: Date.now().toString() }]);
      setNewReward({
        rewardName: '',
        starCost: 5,
        imageUrl: '',
        isActive: true
      });
    }
  };

  const removeReward = (rewardId) => {
    setRewards(rewards.filter(r => r.rewardId !== rewardId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/rewards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId,
          currentStarCount,
          totalStarsEarned: currentStarCount,
          rewards,
          rewardHistory: []
        })
      });
      
      const data = await response.json();
      onComplete(data);
    } catch (error) {
      console.error('Error saving rewards:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Reward System Configuration</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Current Star Count</label>
          <input
            type="number"
            value={currentStarCount}
            onChange={(e) => setCurrentStarCount(parseInt(e.target.value) || 0)}
            className="form-input"
            min="0"
          />
        </div>

        <div className="rewards-builder">
          <h3 className="section-title">Available Rewards</h3>
          
          <div className="reward-input-group">
            <input
              type="text"
              value={newReward.rewardName}
              onChange={(e) => setNewReward({...newReward, rewardName: e.target.value})}
              className="form-input"
              placeholder="Reward name (e.g., iPad Time)"
            />
            
            <input
              type="number"
              value={newReward.starCost}
              onChange={(e) => setNewReward({...newReward, starCost: parseInt(e.target.value)})}
              className="form-input small"
              placeholder="Star cost"
              min="1"
            />

            <button type="button" onClick={addReward} className="add-button">
              + Add Reward
            </button>
          </div>

          <div className="rewards-list">
            {rewards.map((reward) => (
              <div key={reward.rewardId} className="reward-item">
                <span className="reward-name">{reward.rewardName}</span>
                <span className="reward-cost">⭐ {reward.starCost}</span>
                <button type="button" onClick={() => removeReward(reward.rewardId)} className="remove-button">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="form-button">
          Save Reward System
        </button>
      </form>
    </div>
  );
}

export default RewardConfigForm;
