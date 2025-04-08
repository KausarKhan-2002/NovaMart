const express = require("express");
const { catchError } = require("../helper/catchError");
const { isAuthorised } = require("../middlewares/isAuthorised");

const route = express.Router();


route.get("/", isAuthorised, (req, res) => {
  try {
    // 1️⃣ Check if user exists on request
    if (!req.user) {
      const err = new Error("You are not authorised");
      err.statusCode = 401;
      throw err;
    }

    // 2️⃣ Respond with user data
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user: req.user,
    });

  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { profileRoute: route };