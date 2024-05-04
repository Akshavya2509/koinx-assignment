const { Router } = require("express");
const TransactionController = require("../controllers/transactionController");

class TransactionRoute {
  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get(
      "/getUserTransactions",
      TransactionController.getUserTransactions
    );
    this.router.get("/getUserBalance", TransactionController.getUserBalance);

    return this.router;
  }
}

module.exports = TransactionRoute;
