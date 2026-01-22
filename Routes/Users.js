import express from "express";
import upload from "../Middleware/Cloudinary.js"
import { AddUser,getAllUsers,blockUser,deleteUser,changeUserImage,loginUser } from "../Controllers/UserController.js";

const router = express.Router();
router.post("/add/user", upload.single("img"), AddUser);
router.get("/get/users", getAllUsers);
router.put("/user/block/update/:id", blockUser);
router.delete("/user/delete/:id", deleteUser);
router.post("/change/user/img", upload.single("img"), changeUserImage);
router.post("/login/user", loginUser);
export default router;