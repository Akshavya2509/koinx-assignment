const Transaction = require("../models/TransactionSchema");
require("dotenv").config();

async function getUserTransactions(req, res, next) {
  try {
    const address = process.env.ADDRESS;
    const apiKey = process.env.API_KEY; // Your Etherscan API key

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

async function getUserBalance(req, res, next) {
  try {
    const fromUser = await Transaction.find({ from: address });
    const toUser = await Transaction.find({ to: address });
    console.log(fromUser);
    const moneyToUser = toUser.reduce((sum, transaction) => {
      console.log(transaction);
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

module.exports = {
  getUserBalance,
  getUserTransactions,
};
