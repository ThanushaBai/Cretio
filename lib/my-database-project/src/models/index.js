// src/models/index.js
import mongoose from 'mongoose';

// Define a sample schema for a User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Export the User model
const User = mongoose.model('User', userSchema);

export { User };