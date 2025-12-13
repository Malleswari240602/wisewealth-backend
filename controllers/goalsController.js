const db = require("../db");

// ADD GOAL
exports.addGoal = (req, res) => {
    const { user_id, goal_name, target_amount, saved_amount, deadline } = req.body;

    if (!user_id || !goal_name || target_amount == null || !deadline) {
        return res.status(400).json({ message: "All fields required" });
    }

    const query = `
        INSERT INTO goals (user_id, goal_name, target_amount, saved_amount, deadline)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [user_id, goal_name, target_amount, saved_amount || 0, deadline], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json({ message: "Goal added successfully" });
    });
};


// GET GOALS FOR A USER
exports.getGoals = (req, res) => {
    const user_id = req.params.user_id;

    db.query("SELECT * FROM goals WHERE user_id = ?", [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json(results);
    });
};

exports.deleteGoal = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM goals WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.status(200).json({ message: "Goal deleted successfully" });
    });
};
