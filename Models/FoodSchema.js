import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    display: { type: Boolean, default: true },
    popular: { type: Boolean, default: false },
} , { timestamps: true });

export default mongoose.model("Food", foodSchema);
