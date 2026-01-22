import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    phone: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String, required: true },
    block: { type: Boolean, default: false },
} , { timestamps: true });

export default mongoose.model("OrderUser", userSchema);