import { v2 as cloudinary } from "cloudinary";
import Food from "../Models/FoodSchema.js";

export const AddFood = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const streamUpload = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "order" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });
    };

    const result = await streamUpload(req.file);

    const newFood = {
      name,
      price: Number(price),
      img: result.secure_url,
    };
    const foodItem = new Food(newFood);
    await foodItem.save();

    res.status(201).json({message: "Food added successfully",});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    if(!foods){
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).json({
      success: true,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const ChangeImg = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Food ID for change img:", id);
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const streamUpload = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "order" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });
    };

    const result = await streamUpload(req.file);
    food.img = result.secure_url;
    await food.save();

    res.status(201).json({ success: true, message: "Food image updated successfully",});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete Food
export const DeleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Food ID for deletion:", id);
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ success: true, message: "Food deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Popular Foods
export const getPopularFoods = async (req, res) => {
  try {
    const popularFoods = await Food.find({ popular: true }).sort({ createdAt: -1 });

    if (popularFoods.length === 0) {
      return res.status(404).json({ message: "No popular foods found" });
    }
    res.status(200).json({
      success: true,
      popularFoods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get unDisplayed Foods
export const getUnDisplayedFoods = async (req, res) => {
  try {
    const unDisplayedFoods = await Food.find({ display: false }).sort({ createdAt: -1 });

    if (unDisplayedFoods.length === 0) {
      return res.status(404).json({ message: "No Undisplayed foods found" });
    }
    res.status(200).json({
      success: true,
      unDisplayedFoods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};