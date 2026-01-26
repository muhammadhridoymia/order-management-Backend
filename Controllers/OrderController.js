import Order from "../Models/OrderSchema.js";
import DailySale from "../Models/DailySale.js";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
};



export const createOrUpdateOrder = async (req, res) => {
  try {
    const { userId, name, items } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    // 1️⃣ Check if there is an active order
    let order = await Order.findOne({
      userId,
      isCompleted: false,
      canceled: false,
    });

    // 2️⃣ If active order exists → add items
    if (order) {
      items.forEach((newItem) => {
        // Always treat new items as a **new batch**
        order.items.push({
          foodId: newItem.foodId,
          quantity: newItem.quantity,
          received: false, // NEW batch, not received
        });
      });

      await order.save();

      return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order,
      });
    }

    // 3️⃣ No active order → create new order
    const newOrder = new Order({
      userId,
      name,
      items: items.map((item) => ({
        foodId: item.foodId,
        quantity: item.quantity,
      })),
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "New order created successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getAllRuningOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isCompleted: false })
      .populate("items.foodId") 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId })
      .populate("items.foodId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const order = await Order.findById(id).populate("items.foodId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    let updateData = { status };

    if (status === "COMPLETED" && !order.isCompleted) {
      updateData.isCompleted = true;

      const orderTotal = order.items.reduce(
        (sum, item) => sum + item.foodId.price * item.quantity,
        0
      );

      const today = getTodayDate();

      await DailySale.findOneAndUpdate(
        { date: today },
        {
          $inc: {
            totalSales: orderTotal,
            totalOrders: 1,
          },
        },
        { upsert: true, new: true }
      );
    }

    if (status === "CANCELLED") {
      updateData.canceled = true;
    }

    await Order.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getCompletedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isCompleted: true }) 
      .populate("items.foodId")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch completed orders",
      error: error.message,
    });
  }
};


export const getActiveOrderForApp = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("mobile userId:", id);

    const order = await Order.findOne({
      userId: id,
      isCompleted: false,
      canceled: false
    })
      .populate("items.foodId", "name price")
      .sort({ createdAt: -1 });

    if (!order) {
      return res.status(200).json({
        success: true,
        order: null
      });
    }

    const response = {
      _id: order._id,
      status: order.status,
      orderedAt: order.orderedAt,
      message:order.message,
      items: order.items.map(item => ({
        name: item.foodId.name,
        price: item.foodId.price,
        quantity: item.quantity,
        received: item.received,
      }))
    };

    console.log("Order Data:", response);

    res.status(200).json({
      success: true,
      order: response
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
