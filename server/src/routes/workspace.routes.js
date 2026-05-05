import express from "express";
import { addWorkspace } from "#controllers/workspace.controller.js";
import { protect } from "#middlewares/auth.middleware.js";

const router = express.Router();

// router.get("/tabs", protect, getTabRequest);
router.post("/workspaces", protect, addWorkspace);

export default router;
