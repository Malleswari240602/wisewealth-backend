require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes"); // ✅ ADD THIS

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ ROUTES
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes); // ✅ ADD THIS

// health check
app.get("/", (req, res) => {
  res.send("WiseWealth Backend Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
