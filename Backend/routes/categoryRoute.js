const express = require("express");
const Product = require("../models/productModel"); // Assuming your product schema is in 'models/Product.js'
const { catchError } = require("../helper/catchError");
const { isAuthorised } = require("../middlewares/isAuthorised");
const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    // 1. To get all the unique categories from Product
    const categories = await Product.distinct("category");

    // 2. If no category found, return false to control UI
    if (categories.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No category found" });
    }

    // 3. Push all the documents first match with category
    const productCategories = [];
    for (let c of categories) {
      const product = await Product.findOne({ category: c });
      if (product) {
        productCategories.push(product);
      }
    }

    res.status(200).json({
      success: true,
      message: "Extract all categories successfully",
      categories: productCategories,
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { categoryRoute: router };