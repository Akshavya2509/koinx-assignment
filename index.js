const express = require("express");
const app = express();
const axios = require("axios");
const { Transaction } = require("./config");
const PORT = process.env.PORT || 3000;
const { Ethereum } = require("./config");
const cron = require("node-cron");
// Define route to fetch transactions

async function fetchAndStoreEthereumPrice() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const ethereumPriceInINR = response.data.ethereum.inr;

    const ethereumPriceEntry = new Ethereum({ price: ethereumPriceInINR });
    await ethereumPriceEntry.save();

    console.log(`Ethereum price fetched and stored: ${ethereumPriceInINR} INR`);
  } catch (error) {
    console.error("Error fetching Ethereum price:", error);
  }
}

app.get("/transactions", async (req, res) => {
  const address = "0xce94e5621a5f7068253c42558c147480f38b5e0d";
  const apiKey = "AR1VJYIGTS9H9A2PZPN847H9PMD55FN4FU"; // Your Etherscan API key

  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${apiKey}`
    );
    const transactions = response.data.result;
    console.log(transactions);
    // Store transactions in MongoDB
    await Transaction.insertMany(transactions);
    console.log(Transaction);

    res.json(transactions);
    cron.schedule("*/10 * * * *", fetchAndStoreEthereumPrice);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});
app.get("/balance", async (req, res) => {
  const address = req.query.address;
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

    res.json({ balance, ethereumPriceInINR });
  } catch {
    console.error("Error fetching Account balance", error);
    res.status(500).json({ error: "Failed to fetch Balance" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
