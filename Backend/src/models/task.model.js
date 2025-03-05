import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      // Todo, In Progress, Done
      type: String,
      enum: ["todo", "progress", "Done"],
      default: "todo",
    },
    priority: {
      // Low, Medium, High
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    dueDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
      },
    ],
    subtasks: [
      {
        title: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    timelog: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeLog" }],
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
