const express = require("express");
const Product = require("../models/productModel"); // Assuming your product schema is in 'models/Product.js'
const { catchError } = require("../helper/catchError");
const { isAuthorised } = require("../middlewares/isAuthorised");
const router = express.Router();


router.post("/upload-product", isAuthorised, async (req, res) => {
  // Extract all product details from client request body
  const {
    name,
    description,
    price,
    brand,
    category,
    stock,
    images,
    ratings,
    reviews,
    selling,
    discount,
    shippingDetails,
    tags,
  } = req.body;

  try {
    // Optional: Validate required fields
    if (!name || !price || !category || !images?.length) {
      throw new Error(
        "Name, price, category, and at least one image are required."
      );
    }

    // 2. Create a new product by takig all the product details
    const newProduct = new Product({
      name,
      description,
      price,
      brand,
      category,
      stock,
      images, // Array of images with url and public_id
      ratings,
      reviews, // Array of reviews
      selling,
      discount,
      shippingDetails,
      tags,
      productOwner: req.user._id,
    });

    // 3. Save product to store in database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: savedProduct,
    });
  } catch (err) {
    catchError(err, res);
  }
});

router.get("/view", isAuthorised, async (req, res) => {
  try {
    // 1. Extract user ID from the authorised request
    const userId = req.user._id;

    // 2. Find all products uploaded by the user
    const foundProducts = await Product.find({ productOwner: userId });

    // 3. If no products are found
    if (!foundProducts.length) {
      return res.status(200).json({
        success: true,
        message: "No products found.",
        products: [],
      });
    }

    // 4. If products are found
    res.status(200).json({
      success: true,
      message: "Retrieved all products successfully.",
      products: foundProducts,
    });
  } catch (err) {
    catchError(err, res); // Assuming catchError is a custom error handler
  }
});

module.exports = { productRoute: router };