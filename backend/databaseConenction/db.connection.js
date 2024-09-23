import mongoose from "mongoose";

const dbConnection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully Connected To Database');
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message: "Error while connecting to database",
      Error: error.message,
      success: false,
    });
  }
};

export default dbConnection;