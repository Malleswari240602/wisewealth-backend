const db = require("../db");

// ADD BUDGET
const db = require("../db");

// ADD BUDGET (AUTO-CALCULATED SPENT)
const addBudget = (req, res) => {
  const { user_id, category, planned } = req.body;

  if (!user_id || !category || planned === undefined) {
    return res.status(400).json({ message: "All fields required" });
  }

  // 🔹 STEP 1: Calculate spent from transactions table
  const spentQuery = `
    SELECT SUM(amount) AS spent
    FROM transactions
    WHERE user_id = ?
      AND type = 'expense'
      AND title = ?
  `;

  db.query(spentQuery, [user_id, category], (err, result) => {
    if (err) {
      console.error("SPENT CALCULATION ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const spent = result[0].spent || 0;

    // 🔹 STEP 2: Insert budget with calculated spent
    const insertQuery = `
      INSERT INTO budget (user_id, category, planned, spent)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [user_id, category, planned, spent],
      (err2) => {
        if (err2) {
          console.error("BUDGET INSERT ERROR:", err2);
          return res.status(500).json({ message: "Database error" });
        }

        return res
          .status(201)
          .json({ message: "Budget added successfully with auto-calculated spent" });
      }
    );
  });
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
