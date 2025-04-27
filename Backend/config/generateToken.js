const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SIGN, {
    expiresIn: "1d",
  });

  const isProd = process.env.NODE_ENV == "production";

  res.cookie("jwt", token, {
    httpOnly: process.env.COOKIE_HTTPONLY === "true",
    secure: isProd, // ✅ Production me HTTPS ke liye true hona chahiye
    sameSite: isProd ? "None" : "Lax", // ✅ Cross-origin cookies ke liye None hona chahiye
    maxAge: 24 * 60 * 60 * 1000, // ✅ 1 day in milliseconds
  });
};

module.exports = { generateToken };
