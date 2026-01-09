const Order = require("../models/Order");

// Get all orders for a user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;
    const order = await Order.create({ userId, items, totalPrice });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order" });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
