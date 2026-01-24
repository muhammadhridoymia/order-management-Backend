import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { initSocket } from "./Socket.js";
import http from "http"
dotenv.config();

// Import Routes
import addFoodRoutes from "./Routes/AddFood.js";
import categoryRoutes from "./Routes/categories.js";
import StatusRoutes from "./Routes/Status.js";
import bannerRoutes from "./Routes/BannerRoute.js";
import users from "./Routes/Users.js";
import OrderRoute from "./Routes/OrderRoute.js"

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ⭐ REQUIRED

const server = http.createServer(app);
initSocket(server)


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
app.use("/api",OrderRoute)

server.listen(5000, () => {
    console.log("Server running on port 5000");
});

