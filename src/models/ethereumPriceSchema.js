const mongoose = require("mongoose");

const EthereumPriceSchema = new mongoose.Schema({
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const Ethereum = new mongoose.model("price", EthereumPriceSchema);
module.exports = Ethereum;
