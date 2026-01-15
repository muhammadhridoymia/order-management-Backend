import express from "express";
import upload from "../Middleware/Cloudinary.js";
import { FoodCategories,getCategories, getCategoriesFoods} from "../Controllers/Categories.js";

const router = express.Router();
router.post("/create/categories", upload.single("img"), FoodCategories);
router.get("/get/categories", getCategories);
router.get("/get/categoryfoods/:id", getCategoriesFoods);
export default router;