import express from "express";
import { createOrUpdateOrder,getAllRuningOrders,updateOrderStatus,getCompletedOrders,getActiveOrderForApp} from "../Controllers/OrderController.js";

const router = express.Router();

router.post("/order/submit",createOrUpdateOrder)
router.get("/get/all/orders",getAllRuningOrders)
router.put("/update/order/status/:id",updateOrderStatus)
router.get("/get/completed/orders",getCompletedOrders)
router.get("/get/order/in/mobile/:id",getActiveOrderForApp)

export default router;