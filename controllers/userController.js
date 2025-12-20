const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

// LOGIN USER
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email.toLowerCase()],
    async (err, result) => {
      if (err) {
        console.error("LOGIN ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result[0];

      // if you stored password as plain text earlier
      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }
  );
};
