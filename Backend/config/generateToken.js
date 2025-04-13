const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SIGN, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // ✅ Production me HTTPS ke liye true hona chahiye
    sameSite: "None", // ✅ Cross-origin cookies ke liye None hona chahiye
  });
};

module.exports = { generateToken };
