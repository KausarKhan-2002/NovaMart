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
    cloudinaryImage: {
      type: String, // no need to quote "String"
      trim: true,
      validate(url) {
        if (url) {
          const isValidUrl = validator.isURL(url);
          if (!isValidUrl) throw new Error("Invalid image url");
        }
      },
    },
    gender: {
      type: String,
      trim: true,
      required: [true, "Gender is required"],
      enum: ["male", "female", "others"],
    },
    DOB: {
      type: Date,
      default: Date.now(),
      trim: true,
      required: true,
      validate(dob) {
        const isValidDOB = validator.isDate(dob);
        if (!isValidDOB) throw new Error("Invalid date of birth");
      },
    },
    role: {
      type: String,
      trim: true,
      enum: ["GENERAL", "ADMIN"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
