const socketio = require("socket.io");

const registerChatHandler = require("./handlers/chatHandler");
const registerRoomHandler = require("./handlers/roomHandler");
const {
  // registerSessionHandler,
  // authorizeUser,
  registerUserHandler,
} = require("./handlers/userHandler");

exports.initSocketServer = function (server) {
  //allow socket.io to mount to http server
  const io = new socketio.Server(server, {
    cors: {
      origin: ["http://localhost:4000", "http://localhost:5173", "http://localhost:3000"],
    },
  });

  //1. A middleware function is a function that gets executed for every incoming connection.
  // io.use(authorizeUser); //MIDDLEWRE IS EXTREMELY IMPORTANT

  //2. connection handler bundled
  const onConnection = (socket) => {
    //register all event handlers
    registerUserHandler(socket, io);
    registerChatHandler(socket, io);
    registerRoomHandler(socket, io);
  };
  io.on("connection", onConnection);
};
