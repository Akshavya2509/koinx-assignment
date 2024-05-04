const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  hash: String,
  from: String,
  to: String,
  value: String,
  timeStamp: String,
});

const Transaction = new mongoose.model("users", TransactionSchema);
module.exports = Transaction;
