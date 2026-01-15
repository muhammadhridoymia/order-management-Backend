import mongoose from "mongoose";

const foodCategories = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    display: { type: Boolean, default: true },
    foods:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }]
} , { timestamps: true });

export default mongoose.model("FoodCategories", foodCategories);
