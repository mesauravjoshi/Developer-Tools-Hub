import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    versionKey: false,
  }
);

// Optional: Prevent duplicate workspace names per owner
workspaceSchema.index(
  { ownerId: 1, name: 1 },
  { unique: true }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;