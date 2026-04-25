import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "#routes/auth.routes.js";
import testRoutes from "#routes/test.routes.js";
import requestRoutes from "#routes/request.routes.js";
import historyRoutes from "#routes/history.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api", requestRoutes);
app.use("/api", historyRoutes);

export default app;
