import Collection from "#models/collection.js";

// Get all collections for the authenticated user
export const getCollections = async (req, res) => {
  try {
    console.log("Fetching collections for user:", req.user.id);
    const collections = await Collection.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: collections,
      count: collections.length
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch collections",
      error: error.message
    });
  }
};

// Create a new collection
export const createCollection = async (req, res) => {
  try {
    const { name, apiUrl, method } = req.body;

    // Validate required fields
    if (!name || !apiUrl || !method) {
      return res.status(400).json({
        success: false,
        message: "Name, apiUrl, and method are required"
      });
    }

    // Validate method
    const validMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
    if (!validMethods.includes(method.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid HTTP method"
      });
    }

    // Create collection
    const collection = new Collection({
      userId: req.user.id,
      name: name.trim(),
      apiUrl: apiUrl.trim(),
      method: method.toUpperCase()
    });

    const savedCollection = await collection.save();

    res.status(201).json({
      success: true,
      message: "Collection created successfully",
      data: savedCollection
    });
  } catch (error) {
    console.error("Error creating collection:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A collection with this name already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create collection",
      error: error.message
    });
  }
};

// Delete a collection
export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Collection ID is required"
      });
    }

    // Find and delete collection (only if it belongs to the user)
    const deletedCollection = await Collection.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!deletedCollection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found or you don't have permission to delete it"
      });
    }

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
      data: deletedCollection
    });
  } catch (error) {
    console.error("Error deleting collection:", error);

    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid collection ID"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete collection",
      error: error.message
    });
  }
};