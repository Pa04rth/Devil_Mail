const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // 1. Get the token from the request header
  const authHeader = req.headers.authorization;

  // 2. Check if the token exists and is in the correct format ('Bearer TOKEN')
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authentication required. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from 'Bearer TOKEN'

  try {
    // 3. Verify the token using your JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Find the user from the token's payload and attach it to the request object
    // This makes the full user object available in subsequent route handlers.
    req.user = await User.findById(decoded.id).select("-password");

    // If no user is found with that ID (e.g., deleted user), deny access
    if (!req.user) {
      return res.status(401).json({ message: "User not found." });
    }

    // 5. If everything is okay, call next() to proceed to the actual route
    next();
  } catch (error) {
    // This will catch errors from jwt.verify (e.g., expired token, invalid signature)
    return res
      .status(403)
      .json({ message: "Forbidden. Invalid or expired token." });
  }
};

module.exports = authMiddleware;
