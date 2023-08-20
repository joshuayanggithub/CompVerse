const socketio = require("socket.io");

exports.initSocketServer = function (server) {
  const io = new socketio.Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  io.on("connection", (socket) => {
    console.log(`User has connected`);
    console.log(`Users Online: ${io.engine.clientsCount}`);

    io.emit("player:countChanged", io.engine.clientsCount);

    socket.on("chat message", (msgData) => {
      console.log(msgData);
      io.emit("chat message", msgData); //send to everyone
    });

    socket.on("game:create", (gameData) => {
      console.log(gameData);
      io.emit("game:readNew", gameData); //send to everyone
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      io.emit("player:countChanged", io.engine.clientsCount);
    });
  });
};
