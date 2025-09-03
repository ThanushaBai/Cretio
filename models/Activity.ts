import mongoose from "mongoose"

const activitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ["view", "create", "update", "delete", "login", "logout"],
  },
  resource: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  metadata: {
    userAgent: String,
    ip: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
}, {
  timestamps: true,
})

// Add indexes for better query performance
activitySchema.index({ "metadata.timestamp": -1 })
activitySchema.index({ action: 1, resource: 1 })

export const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema)