import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    // Check if the user is an admin and whether the admin is approved
    if (user.role === "Admin" && user.statusOfAdmin !== "Approved") {
      return res.status(403).json({
        message: `Your admin status is ${user.statusOfAdmin}. You cannot log in until approved by a SuperAdmin.`,
        success: false,
      });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration (optional)
    );

    const { password: pass, ...rest } = user.toObject();
    
    // Return token along with user info
    return res.status(200).json({
      message: "Login Successful",
      success: true,
      token, // Send the token back to the client
      user: rest, // Other user info excluding password
    });
  } catch (error) {
    console.log("Error during login", error);
    return res.status(500).json({
      message: "An error occurred during login",
      success: false,
      error: error.message,
    });
  }
};