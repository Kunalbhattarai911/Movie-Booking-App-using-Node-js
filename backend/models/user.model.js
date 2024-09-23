import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User",
      required: true,
    },
    statusOfAdmin: {
      type: String,
      enum: ['Pending','Approved','Rejected'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
