import mongoose from "mongoose";

const Banner = new mongoose.Schema({
    img: { type: String, required: true },
    active: { type: Boolean, default: false },
} , { timestamps: true });

export default mongoose.model("OrderBanner", Banner);