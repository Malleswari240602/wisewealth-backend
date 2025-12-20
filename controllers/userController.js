const db = require("../db");

// REGISTER USER
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email.toLowerCase(), password],
    (err) => {
      if (err) {
        console.error("REGISTER ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "User registered successfully" });
    }
  );
};

// LOGIN USER
exports.loginUser = (req, res) => {
  res.json({ message: "Login placeholder" });
};
