const express = require("express");
const { addBudget, getBudget } = require("../controllers/budgetController");

const router = express.Router();

// Add income, expenses, savings
router.post("/add", addBudget);

// Get all budget data for a user
router.get("/:user_id", getBudget);

module.exports = router;
