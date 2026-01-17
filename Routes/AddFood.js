// routes/fileUploadRoutes.js
import express from "express";
import upload from "../Middleware/Cloudinary.js";
import { AddFood, getAllFoods,ChangeImg,DeleteFood,getPopularFoods,getUnDisplayedFoods} from "../Controllers/AddFood.js";

const router = express.Router();

// router.post("/foods", upload.single("img"), AddFood);
router.post("/foods", upload.single("img"), AddFood);
router.get("/get/foods", getAllFoods);
router.post("/change/food/img", upload.single("img"), ChangeImg);
router.delete("/food/delete/:id", DeleteFood);
router.get("/get/popular/foods", getPopularFoods);
router.get("/get/undisplayed/foods", getUnDisplayedFoods);
export default router;
