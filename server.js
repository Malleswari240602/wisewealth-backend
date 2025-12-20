require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const goalsRoutes = require("./routes/goalsRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes); // ✅ REQUIRED
app.use("/api/goals", goalsRoutes);                 // ✅ REQUIRED
app.use("/api/budget", budgetRoutes);              // ✅ REQUIRED

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
