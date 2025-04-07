exports.catchError = (err, res) => {
  console.log("Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
};
