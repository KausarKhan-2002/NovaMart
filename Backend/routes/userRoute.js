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
    // 1️⃣ Validate input
    if (!username || !email || !password || !gender || !DOB) {
      throw new Error("All fields are required.");
    }

    // 2️⃣ Validate password strength
    const isValidPassword = validator.isStrongPassword(password);
    if (!isValidPassword) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    // 3️⃣ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email or username already in use.");
    }

    // 4️⃣ Validate image URL if provided
    if (cloudinaryImage && !validator.isURL(cloudinaryImage)) {
      throw new Error("Invalid image URL.");
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      gender,
      DOB,
      role: "User",
      cloudinaryImage: cloudinaryImage || "",
    });

    // 7️⃣ Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    // 8️⃣ Send success response
    res.status(201).json({
      success: true,
      message: "User signup successful",
      user: userWithoutPassword,
    });
  } catch (err) {
    // 9️⃣ Handle error centrally
    catchError(err, res);
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if fields are missing
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    // 2️⃣ Validate email format
    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email address.");
    }

    // 3️⃣ Find user by email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      const err = new Error(
        "No account found with this email. Please sign up first."
      );
      err.statusCode = 401;
      throw err;
    }

    // 4️⃣ Compare password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      const err = new Error("Incorrect password. Please try again.");
      err.statusCode = 401;
      throw err;
    }

    // 5️⃣ Generate token and set cookie
    generateToken(foundUser._id, res);

    // 6️⃣ Remove password before sending response
    const { password: _, ...userWithoutPassword } = foundUser.toObject();

    // 7️⃣ Final response
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
