import DailySale from "../Models/DailySale.js";


export const getDailySales = async (req, res) => {
  try {
    const sales = await DailySale.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
