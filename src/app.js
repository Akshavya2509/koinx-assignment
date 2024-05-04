const express = require("express");
const app = express();
const connect = require("./database/dbConnect");
const priceupdater = require("./cron/checkEthereumPrice");
const transactionRoute = require("./routes/transactionRoute");
require("dotenv").config();
const PORT = process.env.PORT;

connect;
priceupdater;

app.use(express.json());
const route = new transactionRoute();

app.use("/transact", route.routes());
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Invalid route",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
