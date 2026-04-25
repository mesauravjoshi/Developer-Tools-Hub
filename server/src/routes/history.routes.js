import express from "express";
import { historyRequest } from "#controllers/history.controller.js";
import { protect } from "#middlewares/auth.middleware.js";
 
const router = express.Router();
 
router.get("/history", protect, historyRequest);
 
export default router;
 