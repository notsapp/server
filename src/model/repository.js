require("dotenv").config();
const { connect } = require("mongoose");
const { Message } = require("./schemas");

async function connectDB() {
  const DB_URI = (process.env.ENV = "DEV"
    ? process.env.DB_DEV_URI
    : process.env.DB_PROD_URI);
  try {
    await connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
}

async function saveMessageToDB(message) {
  try {
    await new Message({ ...message }).save();
  } catch (err) {
    console.log(err);
  }
}

async function getMessagesFromDB() {
    try {
        const messages = await Message.find();
        return messages;
    } catch(err) {
        console.log(err);
        return [];
    }
}

module.exports = {
  connectDB,
  saveMessageToDB,
  getMessagesFromDB,
};
