import Post from "../Models/PostModel.js";
import { v2 as cloudinary } from "cloudinary";

// Create Post
 export const createPost = async (req, res) => {
  try {
      if (!req.file || !req.body.message) {
        return res.status(400).json({ message: "No image file uploaded or message missing" });
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
      const newPost = new Post({
        image: result.secure_url,
        message: req.body.message,
      });
      await newPost.save();
      res.status(201).json({ success: true, message: "Post created successfully", data: newPost });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

