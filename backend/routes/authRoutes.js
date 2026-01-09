// const express = require("express");
// const router = express.Router();

// const authController = require("../controllers/authController");

// // Register
// router.post("/register", authController.register);

// // Login
// router.post("/login", authController.login);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;
