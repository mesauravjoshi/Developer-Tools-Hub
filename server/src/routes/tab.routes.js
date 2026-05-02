import express from "express";
import { getTabRequest, addTabRequest, tabDelete } from "#controllers/tab.controller.js";
import { protect } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.get("/tabs", protect, getTabRequest);
router.post("/tabs", protect, addTabRequest);
router.delete("/tabs/:id", protect, tabDelete);

export default router;
