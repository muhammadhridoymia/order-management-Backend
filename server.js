import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Import Routes
import addFoodRoutes from "./Routes/AddFood.js";
import categoryRoutes from "./Routes/categories.js";
import StatusRoutes from "./Routes/Status.js";
import bannerRoutes from "./Routes/BannerRoute.js";
import users from "./Routes/Users.js";



const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ⭐ REQUIRED


// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api", addFoodRoutes);
app.use("/api", categoryRoutes);
app.use("/api", StatusRoutes);
app.use("/api", bannerRoutes);
app.use("/api", users);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

