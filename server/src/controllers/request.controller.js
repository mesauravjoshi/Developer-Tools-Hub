import * as requestService from "../services/request.service.js";

export const sendRequest = async (req, res) => {
  try {
    const { url, method, headers, data } = req.body;
    console.log("testing....");

    const result = await requestService.request({
      userId: req.user.id,
      url,
      method,
      headers,
      data,
    });
    console.log("result", result);
    return res.status(200).json(result);
  } catch (err) {
    console.error("err controler", err.message);
    console.log("err controler", err);
    return res.status(err.status || 500).json({
      error: err.message || "Server error",
    });
  }
};
