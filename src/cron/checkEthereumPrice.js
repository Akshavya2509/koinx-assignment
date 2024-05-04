const cron = require("node-cron");

const fetchAndStoreEthereumPrice = require("../lib/implementChecker");
cron.schedule("*/10 * * * *", async () => {
  try {
    await fetchAndStoreEthereumPrice();
  } catch {
    console.error(error);
  }
});
module.exports = fetchAndStoreEthereumPrice;
