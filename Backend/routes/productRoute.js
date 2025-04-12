const express = require("express");
const Product = require("../models/productModel"); // Assuming your product schema is in 'models/Product.js'
const { catchError } = require("../helper/catchError");
const { isAuthorised } = require("../middlewares/isAuthorised");
const router = express.Router();

// API endpoint to upload a product
router.post("/upload-product", isAuthorised, async (req, res) => {
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
    console.log(req.body);

    const savedProduct = await newProduct.save();
    console.log(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { productRoute: router };
