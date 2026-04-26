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
  }
);

const Tab = mongoose.model("Tab", TabSchema);

export default Tab;
