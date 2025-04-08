const express = require("express");
const bcrypt = require("bcrypt");
const { catchError } = require("../helper/catchError");
const route = express.Router();
const User = require("../models/userModel");
const validator = require("validator");
const { generateToken } = require("../config/generateToken");
const { isAuthorised } = require("../middlewares/isAuthorised");

route.post("/signup", async (req, res) => {
  const { username, email, password, gender, DOB, cloudinaryImage } = req.body;

  try {
    // 1. Validate input
    if (!username || !email || !password || !gender || !DOB) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // 2. validations on password
    const isValidPassword = validator.isStrongPassword(password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // 3. Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email or username already in use" });
    }

    // 4. Validate if Url exists
    if (cloudinaryImage) {
      const isValidUrl = validator.isURL(cloudinaryImage);
      if (!isValidUrl) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid image url" });
      }
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create new user
    const newUser = await User.insertOne({
      username,
      email,
      password: hashedPassword,
      gender,
      DOB,
      cloudinaryImage: cloudinaryImage || ""
    });

    // 7. Exclude password before sending the response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      success: true,
      message: "User signup successful",
      user: userWithoutPassword,
    });
  } catch (err) {
    catchError(err, res);
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if fields are missing
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    // 2. Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // 3. Find user by email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "No account found with this email. Please sign up first.",
      });
    }

    // 4. Compare password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // 5. Generate token and set cookie
    generateToken(foundUser._id, res);

    // 6. Remove password before sending response
    const { password: _, ...userWithoutPassword } = foundUser.toObject();

    res.status(200).json({
      success: true,
      message: "Login successful. Welcome back!",
      user: userWithoutPassword,
    });
  } catch (err) {
    catchError(err, res);
  }
});

route.post("/logout", isAuthorised, async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // true in production
      expires: new Date(0), // Expire immediately
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { authRoute: route };
