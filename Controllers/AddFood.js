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