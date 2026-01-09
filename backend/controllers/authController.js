// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // ✅ CREATE JWT TOKEN
//     const token = jwt.sign(
//       { id: user._id, email: user.email }, // payload
//       process.env.JWT_SECRET,             // secret key from .env
//       { expiresIn: "1d" }                 // expires in 1 day
//     );

//     // ✅ SEND TOKEN IN RESPONSE
//     res.json({ token }); 
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ CREATE JWT TOKEN
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET,             // secret key from .env
      { expiresIn: "1d" }                 // token valid for 1 day
    );

    // ✅ SEND TOKEN TO CLIENT
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
