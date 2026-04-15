import mongoose, { Mongoose } from "mongoose";

const historySchema = new mongoose.Schema({
  apiUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  method: {
    type: String,
    enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    required: true,
  },
  testedAt: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model("History", historySchema);

export default History;
