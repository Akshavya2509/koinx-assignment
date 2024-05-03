const express = require("express");
const app = express();
const axios = require("axios");
const Transaction = require("./config");
const PORT = process.env.PORT || 3000;
const Ethereum = require("./config");
const cron = require("node-cron");
// Define route to fetch transactions

async function fetchAndStoreEthereumPrice() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const ethereumPriceInINR = response.data.ethereum.inr;

    const ethereumPriceEntry = new EthereumPrice({ price: ethereumPriceInINR });
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

    res.json(transactions);

    cron.schedule("*/10 * * * *", fetchAndStoreEthereumPrice);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
