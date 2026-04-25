import express from "express";
import { historyRequest, historyDelete } from "#controllers/history.controller.js";
import { protect } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.get("/history", protect, historyRequest);
router.delete("/history/:id", protect, historyDelete);

export default router;
