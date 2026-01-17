import express from "express";
import { UpdatePopular,UpdateDisplay } from "../Controllers/StatusController.js";

const router = express.Router();

router.put("/food/popular/update/:id", UpdatePopular);
router.put("/food/display/update/:id", UpdateDisplay);
export default router;