const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SIGN, {
    expiresIn: "2h",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents access via JavaScript
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict", // CSRF protection
    maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
  });
};

module.exports = { generateToken };
