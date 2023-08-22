const { sessionStore } = require("./sessionHandler");
module.exports = (socket, io) => {
  const onMessage = (msgData) => {
    msgData.username = sessionStore.findSession(msgData.sessionID).username;
    msgData.sessionID = null;
    io.emit("chat:message", msgData); //send to everyone
  };

  socket.on("chat:message", onMessage);
};
