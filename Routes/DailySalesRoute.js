import express from "express";
import { getDailySales } from "../Controllers/DailySalesController.js";

const router = express.Router();

router.get("/get/daily/sales",getDailySales)

export default router;