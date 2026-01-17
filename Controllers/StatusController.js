import Food from "../Models/FoodSchema.js";

export const UpdatePopular = async (req, res) => {
  try {
    const {id}= req.params;
    console.log("Category ID:", id);
    const food= await Food.findById(id);
    if(!food){
      return  res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }
    food.popular = !food.popular;
    await food.save();
    res.status(200).json({
      success: true,
      message: "Food popular status updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const UpdateDisplay = async (req, res) => {
  try {
    const {id}= req.params;
    console.log("Category ID:", id);
    const food= await Food.findById(id);
    if(!food){
      return  res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }
    food.display = !food.display;
    await food.save();
    res.status(200).json({
      success: true,
      message: "Food display status updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}