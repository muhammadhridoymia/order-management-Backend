import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },  
    name: { type: String, required: true },    

    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        received: { type: Boolean, default: true }, 
        receivedAt: { type: Date },                 
      },
    ],

    message: { type: String, default: "We Recived Your Order ,Sir Please Wait 10 minits" }, 
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    isCompleted: { type: Boolean, default: false },
    canceled: { type: Boolean, default: false },

    orderedAt: { type: Date, default: Date.now }, 
    received: { type: Boolean, default: false },  
    receivedAt: { type: Date },                  
  },
  { timestamps: true }
);

export default mongoose.model("FoodOrder", orderSchema);