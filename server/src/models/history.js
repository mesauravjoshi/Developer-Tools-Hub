import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    apiUrl: {
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
    requestBody: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // ── Response ───────────────────────────────────────────────
    statusCode: {
      type: Number,
      required: true,
    },
    responseBody: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    responseTime: {
      type: Number,
      required: true,
      min: 0,
    },

    // ── Meta ───────────────────────────────────────────────────
    isError: {
      type: Boolean,
      default: false,
    },
    testedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // testedAt already serves this purpose
    versionKey: false,
  },
);

// Compound index — most common query pattern: fetch a user's history, newest first
historySchema.index({ userId: 1, testedAt: -1 });

const History = mongoose.model("History", historySchema);

export default History;
