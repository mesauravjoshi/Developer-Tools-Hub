import express from "express";
import { sendRequest } from "../controllers/request.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import History from "#models/history.js";
import axios from "axios";
// import requestRoutes from "#routes/request.routes.js";

const router = express.Router();

router.post("/request", protect, async (req, res) => {
  const { url, method, headers, data } = req.body;
  const startTime = Date.now();
  // console.log("asdfasd");
  // console.log(typeof url);

  try {
    const response = await axios({
      url,
      method,
      headers,
      data,
    });
    console.log("line 22", url, method, headers, data);

    const endTime = Date.now();

    // Save to DB
    await History.create({
      userId: req.user.id,
      apiUrl: url,
      method,
      headers,
      requestBody: data,
      responseBody: response.data,
      statusCode: response.status,
      responseTime: endTime - startTime,
    });

    res.json(response.data);
  } catch (error) {
    const endTime = Date.now();
    // console.log("ppppppppppp", error);

    await History.create({
      userId: req.user.id,
      apiUrl: url,
      method,
      headers,
      requestBody: data,
      responseBody: response.data,
      statusCode: response.status,
      responseTime: endTime - startTime,
    });

    res.status(500).json({ error: "API request failed" });
  }
});
export default router;
