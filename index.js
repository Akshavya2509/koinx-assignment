const express = require("express");
const app = express();
const axios = require("axios");
const Transaction = require("./config").default;
const PORT = process.env.PORT || 3000;

// Define a MongoDB schema and model for transactions
const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${ethereumAddress}&tag=latest&apikey=${apiKey}`;
// Define route to fetch transactions
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
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
