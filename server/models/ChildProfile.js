const childProfileSchema = {
  childName: String,
  nickname: String,
  caregiverId: String,
  sensoryConfig: {
    soundMuted: Boolean,
    timerStyle: String, // 'bubble' or 'bar'
    highContrast: Boolean,
    theme: String // 'light' or 'dark'
  },
  avatarId: String,
  createdAt: Date
};

export default childProfileSchema;
