const routineSchema = {
  routineName: String,
  childId: String,
  steps: Array, // Array of step objects: { iconId, label, type, duration }
  createdBy: String, // Caregiver ID
  createdAt: Date,
  lastModified: Date
};

// Step object structure:
// {
//   iconId: String,
//   label: String,
//   type: 'manual' or 'timed',
//   duration: Number (seconds, if timed),
//   animationId: String
// }

export default routineSchema;
