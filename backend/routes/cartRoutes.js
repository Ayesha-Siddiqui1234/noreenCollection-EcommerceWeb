const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart  } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/", authMiddleware, addToCart);
router.get("/:userId", authMiddleware, getCart);
// Remove product from cart
router.delete("/:productId", authMiddleware, removeFromCart);
// Inside routes/cartRoutes.js
router.get("/", authMiddleware, (req, res) => {
    res.json({ message: "Cart data fetched" });
});
module.exports = router;
