const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * Middleware to check if user is authenticated using JWT stored in cookies.
 */
const isAuthorised = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies?.jwt;

    // 2️. If token is missing, deny access
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // 3️. Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SIGN);

    // 4️. Extract userId from decoded token
    const user = await User.findById(decoded.userId).select("-password");

    // 5️. If user is not found in database
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found.",
      });
    }

    // 6️. Attach found user to the request object (excluding password)
    req.user = user;

    // 7️. Proceed to next middleware or route
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);

    // 8️. Handle specific JWT errors
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

    // 9️. General server error
    return res.status(500).json({
      success: false,
      message: "Internal server error during authorization.",
    });
  }
};


module.exports = {isAuthorised};