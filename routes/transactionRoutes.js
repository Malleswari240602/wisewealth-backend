const express = require("express");
const { addTransaction, getTransactions, deleteTransaction } = require("../controllers/transactionController");

const router = express.Router();

// Add a new transaction
router.post("/add", addTransaction);

// Get all transactions for a user
router.get("/:user_id", getTransactions);

router.delete("/delete/:id", deleteTransaction);

module.exports = router;
