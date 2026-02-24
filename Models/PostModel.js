import mongoose from "mongoose";

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
export default mongoose.model("Post", postSchema);