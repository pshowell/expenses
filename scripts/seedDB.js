const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Expenses collection and inserts the expenses below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);

const expenseSeed = [
  {
    category: "Gas",
    date:  new Date(Date.now()),
    vendor: "AutoZone",
    description: "Filled the tank",
    total:"$25.00"
  },
  {
    category: "Gas",
    date:  new Date(Date.now()),
    vendor: "AutoZone",
    description: "Filled the tank",
    total:"$28.00"
  },
  {
    category: "Gas",
    date:  new Date(Date.now()),
    vendor: "AutoZone",
    description: "Filled the tank",
    total:"$26.00"
  },
  {
    category: "Gas",
    date:  new Date(Date.now()),
    vendor: "AutoZone",
    description: "Filled the tank",
    total:"$25.00"
  },
  {
    category: "Gas",
    date:  new Date(Date.now()),
    vendor: "AutoZone",
    description: "Filled the tank",
    total:"$24.00"
  }
];

db.Expense
  .remove({})
  .then(() => db.Expense.collection.insertMany(expenseSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
