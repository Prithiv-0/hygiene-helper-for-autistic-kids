import { Schema, model } from 'mongodb';

const caregiverSchema = {
  email: String,
  passwordHash: String,
  name: String,
  subscriptionStatus: String,
  childProfiles: Array, // Array of Child IDs
  createdAt: Date
};

export default caregiverSchema;
