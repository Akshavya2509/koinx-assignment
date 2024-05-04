const express = require("express");
const app = express();
const connect = require("./database/dbConnect");
const priceupdater = require("./cron/checkEthereumPrice");
const transactionRoute = require("./routes/transactionRoute");
require("dotenv").config();
const PORT = process.env.PORT;

connect();
priceupdater();

app.use(express.json());
const route = new transactionRoute();

app.use("/user", route.routes());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
