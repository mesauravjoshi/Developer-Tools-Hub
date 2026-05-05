import express from "express";
import { sendRequest, bulkCreateRequests } from "#controllers/request.controller.js";
import { protect } from "#middlewares/auth.middleware.js";

const router = express.Router();
 
router.post("/request", protect, sendRequest);
router.post("/request/bulk", protect, bulkCreateRequests);

export default router;