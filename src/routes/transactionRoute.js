const TransactionController = require("../controllers/transactionController");
const { Router } = require("express");

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
