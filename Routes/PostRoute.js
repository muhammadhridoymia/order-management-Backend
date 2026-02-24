import express from "express";
import upload from "../Middleware/Cloudinary.js";
import {createPost,getAllPosts,deletePost} from "../Controllers/PostController.js";

const router = express.Router();
router.post("/create/post", upload.single("image"), createPost);
router.get("/get/posts", getAllPosts);
router.delete("/delete/post/:id", deletePost);
export default router;