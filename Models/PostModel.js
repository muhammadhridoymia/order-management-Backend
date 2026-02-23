const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "hidden"],
      default: "active",
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("OrderSystemPost", postSchema);