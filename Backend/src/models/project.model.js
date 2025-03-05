import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Collection.objectId,
      ref: "User",
    },
    member: [
      {
        type: mongoose.Collection.objectId,
        ref: "User",
      },
    ],
    tasks: [
      {
        type: mongoose.Collection.objectId,
        ref: "Task",
      },
    ],
    milestone: [
      {
        title: {
          type: String,
        },
        dueData: {
          type: Date,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default Project = mongoose.model("Project", projectSchema);
