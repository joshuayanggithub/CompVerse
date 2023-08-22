const { InMemorySessionStore } = require("../../store/sessionStore");
const sessionStore = new InMemorySessionStore();

exports.registerSessionHandler = (socket, io) => {
  //save session object in-memory
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  //broadcast status messages to chat
  socket.broadcast.emit("chat:status", {
    message: `${socket.username} has connected`,
    date: new Date(),
  });

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
    username: socket.username,
  });
  socket.emit("player:countChanged", sessionStore.getActiveSessions());

  socket.on("player:usernameChange", (data) => {
    sessionStore.newUsername(data.sessionID, data.username);
  });

  //on disconnect set session to inactive and broadcast status message
  socket.on("disconnect", () => {
    sessionStore.saveSession(socket.sessionID, {
      userID: socket.userID,
      username: socket.username,
      connected: false, //set connection to false
    });
    socket.broadcast.emit("chat:status", {
      message: `${socket.username} has disconnected`,
      date: new Date(),
    });
    socket.emit("player:countChanged", sessionStore.getActiveSessions());
  });
};

exports.initializeSession = (socket, next) => {
  //register session before connection
  const sessionID = socket.handshake.auth.sessionID; //client would send session id if set in localStorage
  if (sessionID) {
    if (sessionStore.checkSessionExists(sessionID)) {
      const session = sessionStore.findSession(sessionID);
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  console.log("here");
  socket.sessionID = sessionStore.randomSessionID();
  socket.userID = sessionStore.randomUserID();
  socket.username = sessionStore.randomUsername();
  // console.log(socket);
  next();
};

exports.sessionStore = sessionStore;
