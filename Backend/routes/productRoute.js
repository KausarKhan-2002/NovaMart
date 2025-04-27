const express = require("express");
const Product = require("../models/productModel"); // Assuming your product schema is in 'models/Product.js'
const { catchError } = require("../helper/catchError");
const { isAuthorised } = require("../middlewares/isAuthorised");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const verifyRoles = require("../middlewares/verifyRoles");

// Route to upload a new product
router.post(
  "/upload-product",
  isAuthorised,
  verifyRoles("Admin", "Moderator", "Seller"),
  async (req, res) => {
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
      console.log(req.body);

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
  }
);

// Route to retrieve all the products
router.get(
  "/view",
  isAuthorised,
  verifyRoles("Admin", "Moderator", "Seller"),
  async (req, res) => {
    try {
      // 1. Extract user ID from the authorised request
      const userId = req.user._id;

      // 2. Find all products uploaded by the user

      const foundProducts = ["Admin", "Moderator"].includes(req.user.role)
        ? await Product.find()
        : await Product.find({ productOwner: userId });

      // 3. If no products are found
      if (!foundProducts.length) {
        return res.status(200).json({
          success: false,
          message: "No products found.",
          products: null,
        });
      }

      // 4. If products are found
      res.status(200).json({
        success: true,
        message: "Retrieved all products successfully.",
        products: foundProducts,
      });
    } catch (err) {
      catchError(err, res);
    }
  }
);

// Route to delete a existing product image
router.delete(
  "/:productId/image/:publicId",
  isAuthorised,
  verifyRoles("Admin", "Moderator", "Seller"),
  async (req, res) => {
    try {
      const { productId, publicId } = req.params;

      // 1. common validation
      if (!productId || !publicId) {
        throw new Error("Invalid credential please try again!");
      }
      // 2. Delete from Cloudinary
      await cloudinary.uploader.destroy(publicId);

      // 3. Remove image from DB
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $pull: { images: { public_id: publicId } } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Image deleted successfully",
        product: updatedProduct,
      });
    } catch (err) {
      catchError(err, res);
    }
  }
);

// Route to edit product
router.patch(
  "/edit/:productId",
  isAuthorised,
  verifyRoles("Admin", "Moderator", "Seller"),
  async (req, res) => {
    try {
      // 1. Extract all product details from req.body
      const {
        name,
        description,
        price,
        brand,
        category,
        stock,
        images,
        selling,
        discount,
        shippingDetails,
      } = req.body;

      // 2. Check if any required field is falsy (empty string, null, undefined, etc.)
      if (
        !name ||
        !description ||
        !price ||
        !brand ||
        !category ||
        !stock ||
        !images.length ||
        !shippingDetails
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required and cannot be empty.",
        });
      }

      // 3. Extract productId from req.params, coming from client
      const { productId } = req.params;

      // 4. Keep all product pdated details in an object
      const updateProduct = {
        name,
        description,
        price,
        brand,
        category,
        stock,
        images,
        selling,
        discount,
        shippingDetails,
      };

      // 5. Find product via productId from product collection
      const foundProduct = await Product.findByIdAndUpdate(
        productId,
        updateProduct,
        { new: true }
      );

      // 6. If productId is invalid throw an error
      if (!foundProduct)
        throw new Error(
          "Invalid product credential please refresh the page and try again!"
        );

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: foundProduct,
      });
    } catch (err) {
      catchError(err, res);
    }
  }
);

// Route to update product tags and update the isFeatured status based on tags
router.put(
  "/update/tags/:productId/feature",
  isAuthorised,
  verifyRoles("Admin", "Moderator"), // Middleware to allow only Admins or Moderators
  async (req, res) => {
    try {
      const { tags } = req.body;
      console.log("myTags", tags);
      console.log("productId", req.params.productId);

      // 1. List of tags considered as "featured"
      const featureTags = [
        "featured",
        "sale",
        "trending",
        "new",
        "top-rated",
        "bestseller",
        "limited-stock",
        "flash-deal",
        "exclusive",
        "best offer",
      ];

      // 2. Determine if any of the selected tags is a featured tag
      const isFeatured = tags.some((tag) => featureTags.includes(tag));

      // 3. Update product's tags and isFeatured status
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        { tags: tags, isFeatured: isFeatured },
        { new: true } // Option to return the updated document
      );

      // 4. If no product found with that ID, return 404
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Tags updated successfully",
        product: updatedProduct,
      });
    } catch (err) {
      catchError(err, res);
    }
  }
);

// Route to offer sponshorship for a product, If not sponshership plan
router.put(
  "/sponsorship/:productId",
  isAuthorised,
  verifyRoles("Admin", "seller"),
  async (req, res) => {
    try {
      const { productId } = req.params;

      // 1. Check if product ID is present
      if (!productId) {
        throw new Error("Product ID not provided");
      }
      console.log(productId);
      

      // 2. Get sponsorship details from body
      const { sponsorshipDetails } = req.body;
      // console.log(sponsorshipDetails);
      
      
      // 3. Validate type of sponsorship details
      if (typeof sponsorshipDetails !== "object") {
        throw new Error("Invalid sponsorship data format");
      }

      const { sponsoredBy, planType, pricePaid } = sponsorshipDetails;
      console.log("sponsoredBy:",sponsoredBy);
      console.log("planType:",planType);
      console.log("pricePaid:",pricePaid);
      

      // 4. Validate all fields
      if (!planType || typeof pricePaid !== "number") {
        throw new Error("Incomplete or invalid sponsorship details");
      }

      // 5. Duration mapping
      const planDurations = {
        "1 Month": 1,
        "3 Months": 3,
        "6 Months": 6,
        "1 Year": 12,
        "2 Years": 24,
      };

      // 6. If price won't match according to plan
      const planPrices = {
        1: 150,
        3: 250,
        6: 450,
        12: 800,
        24: 1350,
      };

      // 7. Get a number of months in Number type
      const durationInMonths = planDurations[planType];

      // 8. If invalid plan type is provided
      if (!durationInMonths) {
        throw new Error("Invalid plan type selected");
      }

      // 9. Cleaner price validation
      if (pricePaid !== planPrices[durationInMonths]) {
        throw new Error(
          "Invalid payment amount. Please ensure the price matches the selected sponsorship plan."
        );
      }

      // 10. Find product
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error("Product not found");
      }

      // 11. Check already sponsored
      if (product.isSponsored) {
        throw new Error(
          `This product is already sponsored by ${product.sponsorshipDetails.sponsoredBy} till ${product.sponsorshipDetails.expiresAt}`
        );
      }

      // 12. Calculate expiry date
      const purchasedAt = new Date();
      const expiresAt = new Date(purchasedAt);
      expiresAt.setMonth(expiresAt.getMonth() + durationInMonths);

      // 13. Update sponsorship details
      product.sponsorshipDetails = {
        sponsoredBy: sponsoredBy || "novaMart",
        planType,
        pricePaid,
        purchasedAt,
        expiresAt,
      };

      // 14. set isSponsered true to flexible UI
      product.isSponsored = true;

      // 15. Save and send response
      await product.save();

      res.status(200).json({
        success: true,
        message: `This product is successfully sponsored by ${sponsoredBy}`,
        product,
      });
    } catch (err) {
      catchError(err, res);
    }
  }
);

module.exports = { productRoute: router };
