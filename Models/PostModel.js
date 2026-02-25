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
    },
    likes: {
      type: Number,
      default: 27,
    },
    comments: [
      {
        type: String,
        default: "",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Post", postSchema);