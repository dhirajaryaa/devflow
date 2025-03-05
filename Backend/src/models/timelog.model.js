import mongoose from "mongoose";

const timelogSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    duration: {
      // in minutes
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const TimeLog = mongoose.model("TimeLog", timelogSchema);
