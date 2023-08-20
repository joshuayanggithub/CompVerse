const socketio = require("socket.io");

const registerOnlineHandler = require("./onlineHandler");
const registerChatHandler = require("./chatHandler");

exports.initSocketServer = function (server) {
  const io = new socketio.Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  const onConnection = (socket) => {
    registerOnlineHandler(io, socket);
    registerChatHandler(io, socket);
  };

  io.on("connection", onConnection);
};
