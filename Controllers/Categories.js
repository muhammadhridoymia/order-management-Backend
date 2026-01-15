import { v2 as cloudinary } from "cloudinary";
import foodCategories from "../Models/categories.js";

export const FoodCategories = async (req, res) => {
  try {
    const { name, foodIds } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    let foods = [];

    if (foodIds) {
      if (typeof foodIds === "string") {
        foods = JSON.parse(foodIds);
      } else if (Array.isArray(foodIds)) {
        foods = foodIds;
      }
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "order" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      stream.end(req.file.buffer);
    });

    const category = new foodCategories({
      name,
      img: result.secure_url,
      foods,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "Successfully created category",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await foodCategories.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Get foods by category ID

export const getCategoriesFoods = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Category ID:", id);

    // Validate ObjectId
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    // Find category and populate foods
    const category = await foodCategories
      .findById(id)
      .populate("foods");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Send only foods list
    res.status(200).json({success: true, foods: category.foods,});

  } catch (error) {
    console.error("getCategoriesFoods error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
