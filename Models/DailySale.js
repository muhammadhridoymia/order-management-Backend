import mongoose from "mongoose";

const dailySalesSchema = new mongoose.Schema({
  date: {
    type: String, // "2026-01-25"
    required: true,
    unique: true,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("DailySales", dailySalesSchema);
