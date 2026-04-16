import { executeApiRequest } from "#services/request.service.js";

/**
 * POST /api/request
 * Forwards an API request on behalf of the user and logs the result.
 */
export const sendRequest = async (req, res) => {
  const { url, method, headers, data } = req.body;
  // console.log(url, method, headers, data);

  if (!url || !method) {
    return res.status(400).json({ error: "url and method are required." });
  }

  try {
    const { responseData, statusCode } = await executeApiRequest({
      userId: req.user.id,
      url,
      method,
      headers,
      data,
    });

    return res.status(statusCode).json(responseData);
  } catch (error) {
    // Structured error from service layer
    const status = error.statusCode ?? 500;
    const message = error.message ?? "An unexpected error occurred.";

    return res.status(status).json({ error: message });
  }
};
