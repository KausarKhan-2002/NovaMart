const express = require("express");
const Product = require("../models/productModel");
const { catchError } = require("../helper/catchError");
const { isAuthorised } = require("../middlewares/isAuthorised");
const router = express.Router();

// Route to get categories for top landing page
router.get("/categories", async (req, res) => {
  try {
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: "$category", // stage: 1 Grouped by category (this becomes the group _id)
          product: { $first: "$$ROOT" }, // stage: 2 Retain the full document of the first product in each category
        },
      },
    ]);

    if (productCategories.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No category found",
      });
    }

    // Set cache for 1 hour
    res.set("Cache-Control", "public, max-age=3600");

    res.status(200).json({
      success: true,
      message: "Extract all categories successfully",
      categories: productCategories,
    });
  } catch (err) {
    catchError(err, res);
  }
});


// Route to get a collection category
router.get("/collection/:productCategory", async (req, res) => {
  try {
    const { productCategory } = req.params;

    // 1. If category is not sent from client
    if (!productCategory) {
      throw new Error("No product category found");
    }

    // 2. Fetch all the products that match the given category
    const products = await Product.find({ category: productCategory });

    // 3. If no products match, return a message
    if (products.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No product found for this category: ${productCategory}`,
        products: [],
      });
    }

    res.status(200).json({
      success: true,
      message: `${products.length} products found for category: ${productCategory}`,
      products: products,
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { categoryRoute: router };