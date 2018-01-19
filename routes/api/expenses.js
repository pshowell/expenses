const router = require("express").Router();
const expensesController = require("../../controllers/expensesController");
const Expenses = require('../../models/expense.js');


module.exports = function(app) {
  app.post('/api/expenses', function(req,res) {
    const expenseData = req.body
    // console.log(req)
    console.log(req.body)
      Expenses
        .create(expenseData)
        .then(dbModel => console.log(res.json(dbModel)))
        .catch(err => console.log(err));
  }),
  app.get("/api/expenses", function(req,res) {
    Expenses
      .find({})
      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => console.log(err));
  })
}

// Matches with "/api/expenses"
// router.route("/")
//   .get(expensesController.findAll)
//   .post(expensesController.create);
//
// // Matches with "/api/expenses/:id"
// router
//   .route("/:id")
//   .get(expensesController.findById)
//   .put(expensesController.update)
//   .delete(expensesController.remove);
//
// router
//   .route('api/expenses')
//   .post()
//
// module.exports = router;
