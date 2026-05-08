import mongoose from "mongoose";
import Collection from "../models/Collection.js";
import Request from "../models/Request.js";

export const getCollections = async (req, res) => {
  try {
    const userId = req.user.id;

    const collections = await Collection.aggregate([
      // Join workspace
      {
        $lookup: {
          from: "workspaces",
          localField: "workspaceId",
          foreignField: "_id",
          as: "workspace",
        },
      },

      // Convert workspace array to object
      {
        $unwind: "$workspace",
      },

      // Access control
      {
        $match: {
          $or: [
            {
              "workspace.ownerId": new mongoose.Types.ObjectId(userId),
            },
            {
              "workspace.members": new mongoose.Types.ObjectId(userId),
            },
            {
              createdBy: new mongoose.Types.ObjectId(userId),
            },
          ],
        },
      },

      // Populate creator details
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creator",
        },
      },

      {
        $unwind: {
          path: "$creator",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Get requests using collectionId
      {
        $lookup: {
          from: "requests", // MongoDB collection name
          localField: "_id",
          foreignField: "collectionId",
          as: "requests",
        },
      },

      // Final response shape
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,

          workspace: {
            _id: "$workspace._id",
            name: "$workspace.name",
          },

          createdBy: {
            _id: "$creator._id",
            username: "$creator.username",
            email: "$creator.email",
          },

          // Include request data
          requests: {
            $map: {
              input: "$requests",
              as: "req",
              in: {
                _id: "$$req._id",
                name: "$$req.name",
                method: "$$req.method",
                url: "$$req.url",
                headers: "$$req.headers",
                queryParams: "$$req.queryParams",
                body: "$$req.body",
                lastResponse: "$$req.lastResponse",
                createdAt: "$$req.createdAt",
                updatedAt: "$$req.updatedAt",
              },
            },
          },

          // Optional request count
          requestCount: {
            $size: "$requests",
          },
        },
      },

      // Sort collections
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: collections.length,
      collections,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch collections",
      error: error.message,
    });
  }
};

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
      userId: req.user._id,
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