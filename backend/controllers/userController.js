// const User = require("../models/User");
// const bcrypt = require("bcryptjs");

// // Register user
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });
//     res.status(201).json({
//       message: "User registered successfully",
//       user: { name: user.name, email: user.email }
//     });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to register user" });
//   }
// };

// // Login user
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     res.json({ message: "User logged in successfully", email: user.email });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // 1. Import JWT

// Register user (Keep as is...)
exports.registerUser = async (req, res) => { /* ... your existing code ... */ };

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // 2. Generate the Token
    // Replace 'your_jwt_secret' with a long random string or use process.env.JWT_SECRET
    const token = jwt.sign(
      { id: user._id }, 
      "your_jwt_secret", 
      { expiresIn: "1d" }
    );

    // 3. Send the token back to Postman
    res.json({ 
      message: "User logged in successfully", 
      email: user.email,
      token: token // This is what you were missing!
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};