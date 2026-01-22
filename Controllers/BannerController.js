import { v2 as cloudinary } from "cloudinary";
import Banner from "../Models/Banner.js";

export const CreateBanner = async (req, res) => {
  try {
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
    const newBanner = {
      img: result.secure_url,
    };
    const bannerItem = new Banner(newBanner);
    await bannerItem.save();
    res.status(201).json({ success: true, message: "Banner created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Get All Banners
export const GetBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    if (banners.length === 0) {
      return res.status(404).json({ message: "No banners found" });
    }
    res.status(200).json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete Banner
export const DeleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
  const BannerItem = await Banner.findByIdAndDelete(id);
    if (!BannerItem) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({ success: true, message: "Banner deleted successfully" });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Banner Active Status
export const UpdateBannerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Banner ID for status update:", id);
    
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    banner.active = !banner.active;
    await banner.save();

    res.status(200).json({ success: true, message: "Banner status updated successfully", banner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};