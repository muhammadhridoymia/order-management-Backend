import express from "express";
import { createPost, getAllPosts, deletePost, updatePost } from "../Controllers/PostController.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", updatePost);

export default router;