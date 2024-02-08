const socketio = require("socket.io");

const registerChatHandler = require("./handlers/chatHandler");
const registerRoomHandler = require("./handlers/roomHandler");
const {
  // registerSessionHandler,
  authorizeUser,
  registerPlayerHandler,
} = require("./handlers/playerHandler");

//allow socket.io to mount to http server
exports.initSocketServer = function (server) {
  const io = new socketio.Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  //A middleware function is a function that gets executed for every incoming connection.
  io.use(authorizeUser);

  //connection handler bundled
  const onConnection = (socket) => {
    //register all event handlers
    registerPlayerHandler(socket, io);
    registerChatHandler(socket, io);
    registerRoomHandler(socket, io);
  };
  io.on("connection", onConnection);
};
