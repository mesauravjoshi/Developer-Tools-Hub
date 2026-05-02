import Tab from "#models/tab.js";

/**
 * GET /api/tabs
 * Get all tabs for logged-in user
 */

export const addTabRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    //  id: 1, name: "New Tab", sidebar: "request", method: 'GET'
    // You can adjust fields based on your Tab schema
    const { name, method, sidebar } = req.body;

    if (!method || !name) {
      return res.status(400).json({
        success: false,
        message: "Method and name are required",
      });
    }

    const newTab = await Tab.create({
      userId,
      name,
      method,
      sidebar,
    });

    return res.status(201).json({
      success: true,
      message: "Tab created successfully",
      data: newTab,
    });

  } catch (error) {
    console.error("Tab create error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create tab",
    });
  }
};

export const getTabRequest = async (req, res) => {
  console.log('Testing for add tabs ');

  try {
    const userId = req.user.id;

    const tabs = await Tab.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: tabs.length,
      data: tabs,
    });
  } catch (error) {
    console.error("Tab fetch error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch tabs",
    });
  }
};

export const tabDelete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedTab = await Tab.findOneAndDelete({
      _id: id,
      userId, // ensures user can only delete own tab
    });

    if (!deletedTab) {
      return res.status(404).json({
        success: false,
        message: "Tab record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tab deleted successfully",
      deletedId: id,
    });

  } catch (error) {
    console.error("Tab delete error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete tab",
    });
  }
};
