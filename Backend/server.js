const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const { authRoute } = require("./routes/userRoute");
const { profileRoute } = require("./routes/profileRoute");
const { adminRoute } = require("./routes/adminRoute");
const { productRoute } = require("./routes/productRoute");
const { categoryRoute } = require("./routes/categoryRoute");
const { publicProductRoute } = require("./routes/publicProductRoute");

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://novamart-client.onrender.com"], // to test locally also
    credentials: true, // if using cookies
  })
);
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
app.use("/product", productRoute, publicProductRoute, categoryRoute);
