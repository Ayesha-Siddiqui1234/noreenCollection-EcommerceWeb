const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes - only logged-in users can create or view orders
router.post("/", authMiddleware, createOrder);          // Create an order
router.get("/:userId", authMiddleware, getOrders);      // Get all orders for a user
router.get("/single/:orderId", authMiddleware, getOrderById); // Get single order by ID
router.get("/", authMiddleware, (req, res) => {
    res.json({ message: "Order list route is working!" });
});
module.exports = router;
