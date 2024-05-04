const express = require("express");
const axios = require("axios");
const Ethereum = require("../models/ethereumPriceSchema");
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

module.exports = fetchAndStoreEthereumPrice;
