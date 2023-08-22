const socketio = require("socket.io");

const registerChatHandler = require("./handlers/chatHandler");
const registerRoomHandler = require("./handlers/roomHandler");
const {
  registerSessionHandler,
  initializeSession,
} = require("./handlers/sessionHandler");

//allow socket.io to mount to http server
exports.initSocketServer = function (server) {
  const io = new socketio.Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  //register middleware for session handling prior to connection
  io.use(initializeSession);

  //connection handler bundled
  const onConnection = (socket) => {
    //register all event handlers
    registerSessionHandler(socket, io);
    registerChatHandler(socket, io);
    registerRoomHandler(socket, io);
  };
  io.on("connection", onConnection);
};
