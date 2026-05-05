import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    versionKey: false,
  }
);

// Prevent duplicate collection names inside same workspace
collectionSchema.index(
  { workspaceId: 1, name: 1 },
  { unique: true }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;