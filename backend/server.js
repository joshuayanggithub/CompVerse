const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const http = require("http");

const server = http.createServer(app);

const { Server } = require("socket.io"); //mounted on http server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msgData) => {
    console.log(msgData);
    io.emit("chat message", msgData); //send to everyone
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
