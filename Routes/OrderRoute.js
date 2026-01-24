import express from "express";
import { createOrder } from "../Controllers/OrderController.js";

const router = express.Router();

router.post("/order/submit",createOrder)

export default router;