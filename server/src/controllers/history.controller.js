import History from "#models/history.js";

/**
 * GET /api/history
 * Get all history for logged-in user
 */
export const historyRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log('history',userId);

    const history = await History.find({ userId }).sort({ testedAt: -1 });
    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error("History fetch error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch history",
    });
  }
};
