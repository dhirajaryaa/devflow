import mongoose from "mongoose";

const timelogSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Collection.objectId,
      ref: "Task",
    },
    user: {
      type: mongoose.Collection.objectId,
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

export default TimeLog = mongoose.model("TimeLog", timelogSchema);
