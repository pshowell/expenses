import axios from "axios";

export default {
  // Gets all expenses
  getExpenses: function() {
    return axios.get("/api/expenses");
  },
  // Gets the expense with the given id
  getExpense: function(id) {
    return axios.get("/api/expenses/" + id);
  },
  // Deletes the expense with the given id
  deleteExpense: function(id) {
    return axios.delete("/api/expenses/" + id);
  },
  // Saves a expense to the database
  saveExpense: function(expenseData) {
    return axios.post("/api/expenses", expenseData);
  }
};
