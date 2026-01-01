const express = require("express");
const {
  addBudget,
  getBudgets,
} = require("../controllers/budgetController");

const router = express.Router();

router.post("/add", addBudget);
router.get("/:user_id", getBudgets);

module.exports = router;
