const socketio = require("socket.io");

const registerChatHandler = require("./handlers/chatHandler");
const registerRoomHandler = require("./handlers/roomHandler");
const registerGameHandler = require("./handlers/gameHandler");
const { authorizeUser, registerUserHandler } = require("./handlers/userHandler");

exports.initSocketServer = function (server) {
  //allow socket.io to mount to http server
  const io = new socketio.Server(server, {
    cors: {
      origin: ["http://localhost:4000", "http://localhost:5173", "http://localhost:3000"],
    },
  });

  //1. A middleware function is a function that gets executed for every incoming connection.
  io.use(authorizeUser); //MIDDLEWARE IS EXTREMELY IMPORTANT

  //2. connection handler bundled
  const onConnection = (socket) => {
    //register all event handlers
    console.log("New socket.io Connection: ", socket.id, socket.handshake.auth.username, socket.handshake.auth.userID, new Date());
    socket.join("lobby");
    console.log(io.sockets.adapter.rooms);
    registerUserHandler(socket, io);
    registerChatHandler(socket, io);
    registerRoomHandler(socket, io);
    registerGameHandler(socket, io);
  };

  io.on("connection", onConnection);
};
