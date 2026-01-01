const db = require("../db");

exports.addBudget = (req, res) => {
  const { user_id, category, planned, spent } = req.body;

  if (!user_id || !category || planned === undefined || spent === undefined) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO budget (user_id, category, planned, spent) VALUES (?, ?, ?, ?)",
    [user_id, category, planned, spent],
    (err) => {
      if (err) {
        console.error("BUDGET ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      return res.status(201).json({ message: "Budget added successfully" });
    }
  );
};
