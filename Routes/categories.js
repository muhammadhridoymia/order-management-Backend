import express from "express";
import upload from "../Middleware/Cloudinary.js";
import { FoodCategories,getCategories, getCategoriesFoods,ChangeImg,DeleteCategory} from "../Controllers/Categories.js";

const router = express.Router();
router.post("/create/categories", upload.single("img"), FoodCategories);
router.get("/get/categories", getCategories);
router.get("/get/categoryfoods/:id", getCategoriesFoods);
router.post("/change/category/img", upload.single("img"), ChangeImg);
router.delete("/category/delete/:id", DeleteCategory);
export default router;