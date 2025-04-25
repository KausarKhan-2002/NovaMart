const express = require("express");
const Product = require("../models/productModel"); // Assuming your product schema is in 'models/Product.js'
const { catchError } = require("../helper/catchError");
const router = express.Router();

// Route to fetch banner products
router.get("/banner", async (req, res) => {
  try {
    // 1. Priority tag list to identify featured/highlighted products
    const priorityTags = [
      "featured",
      "bestseller",
      "top-rated",
      "flash-deal",
      "exclusive",
    ];

    // 2. Fetch all products from DB
    const allProducts = await Product.find();

    // 3. Helper function to shuffle array
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    // 4. Identify Premium Sponsored Products (6 months or more)
    const premiumProducts = shuffle(
      allProducts.filter(
        (p) =>
          p.isSponsored &&
          p.sponsorshipDetails?.pricePaid >= 450 &&
          ["6 Months", "1 Year", "2 Years"].includes(
            p.sponsorshipDetails?.planType
          )
      )
    );

    // 5. Return 5 premium products if 5 or more available
    if (premiumProducts.length >= 5) {
      return res.status(200).json({
        success: true,
        message: "Banner: 5 Premium Sponsored Products",
        products: premiumProducts.slice(0, 5),
      });
    }

    // 6. Get featured products based on priority tags
    const featuredProducts = shuffle(
      allProducts.filter((p) => priorityTags.includes(p.tags))
    );

    // 7. Calculate how many more products needed to make total 5
    const remainingSlots = 5 - premiumProducts.length;

    // 8. Select featured products to fill remaining slots
    const featuredToAdd = featuredProducts.slice(0, remainingSlots);

    // 9. Combine premium and featured if together they make 5
    if (premiumProducts.length + featuredToAdd.length === 5) {
      return res.status(200).json({
        success: true,
        message: "Banner: Premium + Featured Products",
        products: [...premiumProducts, ...featuredToAdd],
      });
    }

    // 10. If featured products are not enough, fallback to sponsored-only (3 months plan)
    const extraSponsored = shuffle(
      allProducts.filter(
        (p) =>
          p.isSponsored &&
          p.sponsorshipDetails?.pricePaid <= 250
      )
    ).slice(0, remainingSlots - featuredToAdd.length);

    const totalCombined = [
      ...premiumProducts,
      ...featuredToAdd,
      ...extraSponsored,
    ];

    // 11. If premium + featured + 3-month sponsored make up to 5, return those
    if (totalCombined.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Banner: Combined Premium + Featured + Sponsored",
        products: totalCombined.slice(0, 5),
      });
    }

    // 12. Fallback to regular products (random 5) if no premium/featured available
    const fallbackProducts = shuffle(allProducts);
    return res.status(200).json({
      success: true,
      message: "Banner: Regular Products (No Premium/Featured Available)",
      products: fallbackProducts.slice(0, 5),
    });
  } catch (err) {
    catchError(err, res);
  }
});

// Route to get top-discount product
router.get("/top-discount", async (req, res) => {
  try {
    // 1. Fetch all products
    const products = await Product.find().sort({ discount: -1 }).limit(10);

    // 2.If there is not product
    if (!products) {
      return res
        .status(200)
        .json({ success: false, message: "No products found" });
    }

    // 3.
    res.status(200).json({
      success: true,
      message: "Retrieve top discount products",
      products,
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { publicProductRoute: router };