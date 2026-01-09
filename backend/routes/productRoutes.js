// const express = require("express");
// const router = express.Router();
// const { addProduct, updateProduct, getProducts, getProductById } = require("../controllers/productController");
// const authMiddleware = require("../middleware/authMiddleware");

// // Protected routes - only logged-in users (or admin) can add/update products
// router.post("/", authMiddleware, addProduct);          // Add new product
// router.put("/:id", authMiddleware, updateProduct);    // Update existing product

// // Public routes - anyone can view products
// router.get("/", getProducts);                          // Get all products
// router.get("/:id", getProductById);                   // Get single product by ID

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const {
//   createProduct,
//   getProducts
// } = require("../controllers/productController");
// const authMiddleware = require("../middleware/authMiddleware");

// // Protected
// router.post("/", authMiddleware, createProduct);

// // Public
// router.get("/", getProducts);

// module.exports = router;



const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById // <--- Make sure this is exported from your controller
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected
router.post("/", authMiddleware, createProduct);

// Public
router.get("/", getProducts);

// ADD THIS LINE BELOW:
router.get("/:id", getProductById); 

module.exports = router;