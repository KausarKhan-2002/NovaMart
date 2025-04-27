const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }, // Product name
    description: {
      type: String,
      required: true,
    }, // Product full description
    price: {
      type: Number,
      required: true,
    }, // MRP or actual price
    brand: {
      type: String,
      required: true,
    }, // Brand name (e.g., Nike, Apple)
    category: {
      type: String,
      required: true,
    }, // Electronics, Fashion, etc.
    stock: {
      type: Number,
      required: true,
      default: 0,
    }, // Available quantity
    images: [
      {
        url: { type: String, required: true }, // Cloudinary URL
        public_id: { type: String, required: true }, // Cloudinary public_id
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    }, // Average rating
    reviews: {
      type: [reviewSchema],
      default: [], // Optional, initially empty array
    }, // Nested user reviews
    selling: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    }, // % Discount on price

    shippingDetails: {
      weight: { type: String }, // e.g. "1.5kg"
      dimensions: { type: String }, // e.g. "10x8x4 cm"
      shippingFrom: { type: String }, // City or warehouse
      //   estimatedDelivery: { type: String, default: null }, // e.g. "3-5 business days"
      shippingCost: { type: Number }, // Additional shipping fee
    },
    isFeatured: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },

    totalReviews: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Invalid totalReviews: must be 0 or greater",
      },
    },

    isBestOffer: {
      type: Boolean,
    },

    isSponsored: {
      type: Boolean,
    },

    isPremium: {
      type: Boolean,
    },

    banner: {
      type: String,
    },

    sponsorshipDetails: {
      sponsoredBy: { type: String, default: null },
      planType: {
        type: String,
        enum: ["1 Month", "3 Months", "6 Months", "1 Year", "2 Year"],
        default: null,
      },
      pricePaid: { type: Number, default: 0 },
      purchasedAt: { type: Date, default: Date.now },
      expiresAt: { type: Date, default: null },
    },

    orderCount: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String],
      enum: [
        // Featured Tags
        "featured", // Homepage or top highlight section
        "sale", // Discounted product
        "trending", // High performing or most viewed product
        "new", // Newly added products
        "top-rated", // High rated products by users
        "bestseller", // Most ordered or best-selling product
        "limited-stock", // Scarce stock to create urgency
        "flash-deal", // Time-limited sale or special discount
        "exclusive", // Product available only to certain customers
        "best offer",

        // Non-featured Tags
        "normal", // recently upload product
        "regular", // Regular products
        "standard", // Standard products
        "basic", // Basic or low-cost products
        "economy", // Economy or budget-friendly products
        "classic", // Classic, well-known products
        "popular", // Popular products in the category
        "discounted", // Products with discount
      ],
      default: ["normal"],
    },

    productOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);