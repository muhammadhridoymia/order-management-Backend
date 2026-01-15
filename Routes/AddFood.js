// routes/fileUploadRoutes.js
import express from "express";
import upload from "../Middleware/Cloudinary.js";
import { AddFood, getAllFoods} from "../Controllers/AddFood.js";

const router = express.Router();

// router.post("/foods", upload.single("img"), AddFood);
router.post("/foods", upload.single("img"), AddFood);
router.get("/get/foods", getAllFoods);
export default router;
