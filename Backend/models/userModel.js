const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      minlength: [4, "Username must be at least 4 characters"],
      maxlength: [30, "Username must be at most 30 characters"],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Email address is invalid",
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      trim: true,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other"],
    },
    DOB: {
      type: Date,
      default: Date.now(),
      trim: true,
      required: true,
      validat(dob) {
        const isValidDOB = validator.isDate(dob);
        if (!isValidDOB) throw new Error("Invalid date of birth");
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
