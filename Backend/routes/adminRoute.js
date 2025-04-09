const express = require("express");
const { isAuthorised } = require("../middlewares/isAuthorised");
const User = require("../models/userModel");
const { catchError } = require("../helper/catchError");
const route = express.Router();

route.patch("/role", isAuthorised, async (req, res) => {
  try {
    const { role, id } = req.body;
    console.log(role);

    const user = req.user;

    // 1. Check if User is loggedin or not
    if (!user) {
      throw new Error("You are not authorised for this");
    }

    // 2. If role is not as expected
    if (!["Admin", "General"].includes(role)) {
      throw new Error("Invalid role credential");
    }

    // 5. Update role based on user id
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: role },
      { new: true }
    ).select("-password");

    // 5.If not a valid id
    if (!updatedUser) {
      throw new Error("You are not authorised for this");
    }

    res
      .status(200)
      .json({ success: true, message: "Role is updated", user: updatedUser });
  } catch (err) {
    catchError(err, res);
  }
});

route.get("/users", isAuthorised, async (req, res) => {
  try {
    // 1. Fetch all users
    const users = await User.find().select("-password"); // exclude password field

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { adminRoute: route };
