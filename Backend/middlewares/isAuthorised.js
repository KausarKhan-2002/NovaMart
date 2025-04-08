const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * Middleware to check if user is authenticated using JWT (from cookies or Authorization header).
 */
const isAuthorised = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies or Authorization header
    let token = req.cookies?.jwt;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ If token is missing, deny access
    if (!token) {
      const err = new Error("Access denied. No token provided.");
      err.statusCode = 401;
      throw err;
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SIGN);

    // 4️⃣ Find user by ID (excluding password)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      const err = new Error("Unauthorized. User not found.");
      err.statusCode = 401;
      throw err;
    }

    // 5️⃣ Attach user to request
    req.user = user;

    // 6️⃣ Proceed
    next();
  } catch (error) {
    console.error("Authorization Error:", error.message);

    // 7️⃣ JWT Specific Errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    // 8️⃣ Custom status or fallback
    const status = error.statusCode || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Authorization failed.",
    });
  }
};

module.exports = { isAuthorised };