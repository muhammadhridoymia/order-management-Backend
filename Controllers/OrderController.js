import Order from "../Models/OrderSchema.js";

export const createOrder = async (req, res) => {
  try {
    const { name, items, userId } = req.body;

    if (!name || !items || items.length === 0 || !userId) {
      return res.status(400).json({ message: "Invalid order data" });
    }
    const order = new Order({
      name,
      items,
      userId,
    });
    console.log("order data:",order)
    res.status(200).json({
      success: true,
      message: "Order Submit Successfull",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
