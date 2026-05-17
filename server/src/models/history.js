import mongoose from "mongoose";

const requestHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
      index: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      required: true,
    },
    headers: {
      type: Map,
      of: String,
      default: {},
    },
    body: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // ── Response ───────────────────────────────────────────────
    response: {
      status: Number,
      data: mongoose.Schema.Types.Mixed,
      time: Number, // in ms
    },

  },
  {
    timestamps: false, // testedAt already serves this purpose
    versionKey: false,
  },
);

// Compound index — most common query pattern: fetch a user's history, newest first
requestHistorySchema.index({ userId: 1, testedAt: -1 });

const RequestHistory = mongoose.model("RequestHistory ", requestHistorySchema);

export default RequestHistory;
