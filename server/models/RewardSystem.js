const rewardSystemSchema = {
  childId: String,
  currentStarCount: Number,
  totalStarsEarned: Number,
  rewards: Array, // Array of reward objects
  rewardHistory: Array // History of redeemed rewards
};

// Reward object structure:
// {
//   rewardId: String,
//   rewardName: String,
//   starCost: Number,
//   imageUrl: String,
//   isActive: Boolean
// }

export default rewardSystemSchema;
