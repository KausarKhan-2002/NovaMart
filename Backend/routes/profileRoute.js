const express = require("express");
const { catchError } = require("../helper/catchError");
const { isAuthorised } = require("../middlewares/isAuthorised");

const route = express.Router();

route.get("/", isAuthorised, (req, res) => {
  try {
    // 1. Not authorised if req.user does not exist
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: "You are not authorised" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "user retrieved successfully",
        user: req.user,
      });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { profileRoute: route };