const db = require("../db");

// ADD BUDGET
const addBudget = (req, res) => {
  const { user_id, category, planned, spent } = req.body;

  if (!user_id || !category || planned === undefined || spent === undefined) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO budget (user_id, category, planned, spent) VALUES (?, ?, ?, ?)",
    [user_id, category, planned, spent],
    (err) => {
      if (err) {
        console.error("BUDGET INSERT ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      return res.status(201).json({ message: "Budget added successfully" });
    }
  );
};

// GET BUDGETS
const getBudgets = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID required" });
  }

  db.query(
    "SELECT * FROM budget WHERE user_id = ?",
    [user_id],
    (err, results) => {
      if (err) {
        console.error("GET BUDGET ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      return res.status(200).json(results);
    }
  );
};

module.exports = {
  addBudget,
  getBudgets,
};
