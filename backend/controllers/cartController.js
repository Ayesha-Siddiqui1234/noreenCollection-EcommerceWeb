const Cart = require("../models/Cart");

// Get cart for a user
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: "Failed to update cart" });
  }
};


// DELETE /api/cart/:productId → Remove a product from your cart
// exports.removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) return res.status(404).json({ message: "Cart is empty" });

//     cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//     await cart.save();

//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // 1. Use userId (matching your addToCart logic)
    // Use req.user.id if your middleware provides it, otherwise use req.body.userId for testing
// Change this line in removeFromCart:
const cart = await Cart.findOne({ userId: req.body.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // 2. Use item.productId (matching your addToCart logic)
    // Also, ensure item.productId exists before calling toString()
    cart.items = cart.items.filter(item => 
      item.productId && item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error); // This lets you see the actual error in your terminal
    res.status(500).json({ message: "Server error", error: error.message });
  }
};