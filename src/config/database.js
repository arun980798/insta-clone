const mongoose = require("mongoose");



async function connecttodb () {
  await  mongoose.connect(process.env.MONGO_URI);
  console.log("connc to db ")
}


module.exports = connecttodb




