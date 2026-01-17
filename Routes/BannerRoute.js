import express from "express";
import upload from  "../Middleware/Cloudinary.js";
import { CreateBanner,GetBanners,DeleteBanner ,UpdateBannerStatus} from "../Controllers/BannerController.js";
const router = express.Router();

router.post("/create/banner", upload.single("img"), CreateBanner);
router.get("/get/banners", GetBanners);
router.delete("/banner/delete/:id", DeleteBanner);
router.put("/banner/active/update/:id", UpdateBannerStatus);
export default router;