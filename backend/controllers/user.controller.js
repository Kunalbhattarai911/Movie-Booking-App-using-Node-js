import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    return res.status(200).json({
      message: "Users Fetch Successful",
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching users",
      success: false,
      error: error.message,
    });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User Fetch Successful",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching user",
      success: false,
      error: error.message,
    });
  }
};

export const getUserByRole = async (req, res) => {
  try {
    const { role } = req.params;

    //validate role
    if (!["User", "Admin", "SuperAdmin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role provided",
        success: false,
      });
    }

    const users = await User.find({ role }, "-password");

    if (users.length === 0) {
      return res.status(404).json({
        message: `No users found with role: ${role}`,
        success: false,
      });
    }

    return res.status(200).json({
      message: `Users with role: ${role} fetched successfully`,
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching users by role",
      success: false,
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

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
    } = req.body;

    let updateUser = await User.findById(id);
    if (!updateUser) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    const useremail = await User.findOne({ email });
    if (useremail) {
      return res.status(400).json({
        message: "This Email is already registered.",
        success: false,
      });
    }

    //update data
    if (firstName) updateUser.firstName = firstName;
    if (middleName) updateUser.middleName = middleName;
    if (lastName) updateUser.lastName = lastName;
    if (email) updateUser.email = email;
    if (location) updateUser.location = location;
    if (age) updateUser.age = age;
    if (gender) updateUser.gender = gender;
    if (phoneNumber) updateUser.phoneNumber = phoneNumber;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateUser.password = hashedPassword;
    }

    const saveData = await updateUser.save();

    const { password: pass, ...rest } = saveData.toObject();

    return res.status(201).json({
      message: "User Data Updated Successfully",
      success: true,
      ...rest,
    });
  } catch (error) {
    console.log("Error Details", error);
    return res.status(500).json({
      message: "An Error Occured While Updating The User Data",
      Error: error.message,
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUserData = await User.findByIdAndDelete(id);
    if (!deleteUserData) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message: "An Error Occured While Deleting The User",
      success: false,
      Error: error.message,
    });
  }
};
