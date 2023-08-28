const mongoose = require("mongoose");

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.log("error on mongoConfig", err);
  }
}
module.exports = connectMongo;
