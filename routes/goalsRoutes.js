const express = require("express");
const { addGoal, getGoals, deleteGoal } = require("../controllers/goalsController");


const router = express.Router();

// Add a new financial goal
router.post("/add", addGoal);

// Get all goals for a user
router.get("/:user_id", getGoals);

router.delete("/delete/:id", deleteGoal);

module.exports = router;
