const sessionLogSchema = {
  childId: String,
  routineId: String,
  routineName: String,
  timestamp: Date,
  completionStatus: String, // 'finished' or 'abandoned'
  moodRating: Number, // 1-5
  parentNotes: String,
  stepsCompleted: Number,
  totalSteps: Number
};

export default sessionLogSchema;
