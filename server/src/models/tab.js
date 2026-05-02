import mongoose from "mongoose";

const TabSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      required: true,
      trim: true,
    },
    sidebar: {
      type: String,
      required: true,
      trim: true,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
      // required: true,
      index: true,
    },
  }
);

const Tab = mongoose.model("Tab", TabSchema);

export default Tab;
