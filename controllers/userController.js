exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const normalizedEmail = email.toLowerCase();

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, normalizedEmail, password],
    (err) => {
      if (err) {
        console.error("REGISTER ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "User registered successfully" });
    }
  );
};
