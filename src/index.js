const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { connectDB, getMessagesFromDB, saveMessageToDB } = require("./model/repository");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.SERVER_API_KEY || "";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(keyCheck);

connectDB();

app.get("/", (_, res) => {
  res.send({
    message: "messaging service active",
  });
});

app.get("/messages", async (_, res) => {
  try {
    const messages = await getMessagesFromDB();
    res.status(200).send(messages);
  } catch(err) {
    res.status(500).send({
      message: "unable to fetch messages"
    })
  }
})

const httpServer = createServer(app);
const server = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

server.on("connection", (socket) => {
  socket.on("send-message", async (message) => {
    try {
      await saveMessageToDB(message);
      server.emit("receive-message", message);
    } catch (err) {
      console.log(err);
    }
  });
});

function keyCheck(req, res, next) {
  const REQ_API_KEY = req.headers["x-api-key"];
  if(API_KEY === REQ_API_KEY) {
    next();
  } else {
    res.status(403).send({
      message: "access denied"
    })
  }
}
