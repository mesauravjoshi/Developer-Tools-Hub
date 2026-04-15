import express from "express";
import { sendRequest } from "../controllers/request.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/request", protect, sendRequest);

export default router;
