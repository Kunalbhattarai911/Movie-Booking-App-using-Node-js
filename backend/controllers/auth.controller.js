import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      age,
      gender,
      location,
      password,
      role
    } = req.body;

    // Check if the provided email already exists or not
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({
        message:
          "This Email Is Already Registered. Please Try With Next Valid Email",
        success: false,
      });
    }

    // Check if SuperAdmin role is already registered
    if (role === "SuperAdmin") {
      const findSuperAdmin = await User.findOne({ role: "SuperAdmin" });
      if (findSuperAdmin) {
        return res.status(400).json({
          message: "SuperAdmin Is Already Registered",
          success: false,
        });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const statusOfAdmin = role === "Admin" ? "Pending" : undefined;

    // Create new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      age,
      gender,
      location,
      password: hashedPassword,
      role,
      statusOfAdmin
    });

    await newUser.save();

    const { password: pass, ...rest } = newUser.toObject();

    // Return except password
    return res.status(201).json({
      message: "User Registered Successfully",
      success: true,
      ...rest,
    });
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message: "An Error Occurred While Signup",
      Error: error.message,
      success: false,
    });
  }
};

