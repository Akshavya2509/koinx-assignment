const Transaction = require("../models/TransactionSchema");
require("dotenv").config();
const axios = require("axios");

class TransactionController {
  static async getUserTransactions(req, res) {
    try {
      const address = process.env.ADDRESS;
      const apiKey = process.env.API_KEY;
      console.log(address + " " + apiKey);
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${apiKey}`
      );
      const transactions = response.data.result;
      console.log(transactions);
      // Store transactions in MongoDB
      await Transaction.insertMany(transactions);
      console.log(Transaction);

      return res.json(transactions);
    } catch (error) {
      next(error);
    }
  }

  static async getUserBalance(req, res, next) {
    const address = req.query.address;
    try {
      console.log(Transaction);
      const fromUser = await Transaction.find({ from: address });
      const toUser = await Transaction.find({ to: address });
      console.log(fromUser + " " + toUser);
      const moneyToUser = toUser.reduce((sum, transaction) => {
        return sum + parseFloat(transaction.value) / 1e18;
      }, 0);

      const moneySentByUser = fromUser.reduce((sum, transaction) => {
        return sum + parseFloat(transaction.value) / 1e18;
      }, 0);
      console.log(moneySentByUser + " " + moneyToUser);
      let balance = parseFloat(
        parseFloat(moneyToUser) - parseFloat(moneySentByUser)
      );

      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
      );
      const ethereumPriceInINR = response.data.ethereum.inr;

      return res.json({ balance, ethereumPriceInINR });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
