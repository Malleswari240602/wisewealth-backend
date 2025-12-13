const db = require("../db");

// ADD TRANSACTION
exports.addTransaction = (req, res) => {
    const { user_id, title, amount, type } = req.body;

    if (!user_id || !title || amount == null || !type) {
        return res.status(400).json({ message: "All fields required" });
    }

    const query = `
        INSERT INTO transactions (user_id, title, amount, type)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [user_id, title, amount, type], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json({ message: "Transaction added successfully" });
    });
};


// GET TRANSACTIONS FOR A USER
exports.getTransactions = (req, res) => {
    const user_id = req.params.user_id;

    db.query("SELECT * FROM transactions WHERE user_id = ?", [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json(results); 
    });
};

exports.deleteTransaction = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM transactions WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json({ message: "Transaction deleted" });
    });
};
