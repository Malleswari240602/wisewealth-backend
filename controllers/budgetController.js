const db = require("../db");

// ADD BUDGET (income, expenses, savings)
exports.addBudget = (req, res) => {
    const { user_id, income, expenses, savings } = req.body;

    if (!user_id || income == null || expenses == null || savings == null) {
        return res.status(400).json({ message: "All fields required" });
    }

    const query = `
        INSERT INTO budget (user_id, income, expenses, savings)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [user_id, income, expenses, savings], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json({ message: "Budget added successfully" });
    });
};


// GET BUDGET DATA FOR A USER
exports.getBudget = (req, res) => {
    const user_id = req.params.user_id;

    db.query("SELECT * FROM budget WHERE user_id = ?", [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json(results);
    });
};
