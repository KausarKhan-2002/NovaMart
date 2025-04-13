const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const { authRoute } = require("./routes/userRoute");
const { profileRoute } = require("./routes/profileRoute");
const { adminRoute } = require("./routes/adminRoute");
const { productRoute } = require("./routes/productRoute");

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173", // Local development (for now)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request from allowed origins
    } else {
      callback(new Error("Not allowed by CORS")); // Reject other origins
    }
  },
  credentials: true // Allow cookies to be sent along with requests
}));
app.use(cookieParser());



const connectionDB = async () => {
  try {
    if (mongoose.connection === 1) {
      console.log("Database is already connected");
      app.listen(PORT, () =>
        console.log(`Server is listening on ${PORT} PORT...`)
      );
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Database is connected successfully ✔️");
    app.listen(PORT, () =>
      console.log(`Server is listening on ${PORT} PORT...`)
    );
  } catch (err) {
    console.log("DB Error:", err.message);
  }
};

connectionDB();

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/credential", adminRoute);
app.use("/product", productRoute);