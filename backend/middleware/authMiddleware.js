// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
//     req.user = decoded; // attach user info to request
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };



// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1]; // Get the token part

//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret"); // same secret as login
//     req.user = { id: decoded.id }; // attach user id to req object
//     next(); // allow access
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = auth;


// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  // Here you would normally verify the token
  // For testing, just call next()
  next();
};

module.exports = authMiddleware;
