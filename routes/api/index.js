const router = require("express").Router();
const expenseRoutes = require("./expenses");

// Expense routes
router.use("/expenses", expenseRoutes);

module.exports = router;
