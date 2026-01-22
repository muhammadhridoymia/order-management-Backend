import mongoose from "mongoose";

const OrderList = new mongoose.Schema({
    foodId:[],
    userId:{String, required:true},
    message: { type: String,},
    display: { type: Boolean, default: true },
} , { timestamps: true });

export default mongoose.model("Orderlist", OrderList);