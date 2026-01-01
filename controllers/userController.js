const db = require("../db");

// REGISTER
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  // 1️⃣ Check if user already exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email.toLowerCase()],
    (err, result) => {
      if (err) {
        console.error("CHECK USER ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // 2️⃣ Insert new user
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email.toLowerCase(), password],
        (err) => {
          if (err) {
            console.error("REGISTER ERROR:", err);
            return res.status(500).json({ message: "Database error" });
          }

          res.status(201).json({
            success: true,
            message: "User registered successfully",
          });
        }
      );
    }
  );
};


// LOGIN
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email.toLowerCase()],
    (err, result) => {
      if (err) {
        console.error("LOGIN ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result[0];

      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      res.status(200).json({
  success: true,
  token: "dummy-token-for-now",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
});

    }
  );
};

// ✅ EXPORT ONCE, AT BOTTOM
module.exports = {
  registerUser,
  loginUser,
};
