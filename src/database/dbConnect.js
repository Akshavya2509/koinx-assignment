require("dotenv").config();
const mongoose = require("mongoose");

async function connect() {
  console.log("hello");
  const connect = mongoose.connect(process.env.DB_URL);
  connect
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch(() => {
      console.log("Database cannot be Connected");
    });
}
module.exports = connect;
