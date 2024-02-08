module.exports = (socket, io) => {
  socket.on("chat:message", (messageData) => {
    io.emit("chat:message", messageData); //send to everyone
  });

  socket.broadcast.emit("chat:status", {
    message: `${socket.username} has connected`,
    date: new Date(),
  });

  //on disconnect set session to inactive and broadcast status message
  socket.on("disconnect", () => {
    socket.broadcast.emit("chat:status", {
      message: `${socket.username} has disconnected`,
      date: new Date(),
    });
  });
};
