import User from "../Models/UserSchema.js";
import { v2 as cloudinary } from "cloudinary";


//Add User
export const AddUser = async (req, res) => {
  try {
    const { name,phone, password } = req.body;
    console.log("User Creat data:",name ,phone,password)
    if (!name ||!phone || !password) {
      return res.status(400).json({ message: "Name ,Number and Password are required" });
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

    const newUser = {
      name,
      phone,
      password,
      img: result.secure_url,
    };
    const userItem = new User(newUser);
    await userItem.save();

    res.status(201).json({success:true,message: "User added successfully",});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Change Image of User
export const changeUserImage = async (req, res) => {
  try {
    const { id } = req.body;
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

    const user = await User.findByIdAndUpdate(
      id,
      { img: result.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User image updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Block/Unblock User
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.block = !user.block;
    await user.save();
    res.status(200).json({
      success: true,
      message: `User ${user.block ? "blocked" : "unblocked"} successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Login User
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Phone and password are required" 
      });
    }
    const user = await User.findOne({ phone }); 
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid phone or password"
      });
    }
    if (user.block) {
      return res.status(403).json({ 
        success: false, 
        message: "User is blocked" 
      });
    }
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid phone or password"
      });
    }
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        img: user.img,
      }    
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};