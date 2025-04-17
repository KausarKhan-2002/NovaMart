// To set default profile if not available
export const DEFAULT_PROFILE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0_XPfyUZJugz5lXkm0DUtAkpjRw367tcFig&s";

// BASE_URL for backend
const origin = true;
export const BASE_URL = origin
  ? "https://novamart-mygy.onrender.com"
  : "http://localhost:8080";

// BASE_URL for frontend
const isDomain = false;
export const CLIENT_DOMAIN = isDomain
  ? "https://novamart-client.onrender.com"
  : "http://localhost:5173/";

// Product Tags
export const TAGS = {
  NON_FEATURED_TAGS: [
    "normal",
    "regular",
    "standard",
    "basic",
    "economy",
    "classic",
    "popular",
    "discounted",
  ],
  FEATURED_TAGS: [
    "featured",
    "sale",
    "trending",
    "new",
    "top-rated",
    "bestseller",
    "limited-stock",
    "flash-deal",
    "exclusive",
  ],
};

// Landing routes with BASE_URL
const routes = ["/product/categories", "/product/banner", "/product/top-discount"];
export const LANDING_ROUTES = routes.map((route) => BASE_URL + route);
console.log(LANDING_ROUTES);


// Random urgency messages
export const URGENCY_MSG = [
  "HURRY UP!",
  "ONLY FEW LEFT!",
  "DON’T MISS OUT!",
  "FLASH DEAL!",
  "GRAB IT NOW!",
  "LIMITED TIME!",
  "SELLING FAST!",
  "LAST CHANCE!",
  "HOT DEAL!",
  "RUNNING OUT!",
];
