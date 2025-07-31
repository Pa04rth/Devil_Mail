const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config");

export default function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }
      const newUser = new User({ username, email, password });
      return bcrypt.hash(newUser.password, 10);
    })
    .then((hashedPassword) => {
      newUser.password = hashedPassword;
      return newUser.save();
    })
    .then((user) => {
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Server error", error: err.message })
    );
}
