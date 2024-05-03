const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/koinx-backend");

// Check database connected or not
connect
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Database cannot be Connected");
  });
const TransactionSchema = new mongoose.Schema({
  hash: String,
  from: String,
  to: String,
  value: String,
  timeStamp: String,
});

const Transaction = new mongoose.model("users", TransactionSchema);
module.exports = Transaction;
