module.exports = (socket, io) => {
  socket.on("chat:message", (messageData) => {
    // console.log(socket.rooms);
    io.to(messageData.room).emit("chat:message", messageData); //send to everyone
  });

  socket.broadcast.to("lobby").emit("chat:status", {
    //everyone except the guy
    message: `${socket.handshake.auth.username} has connected`,
    date: new Date(),
  });

  //on disconnect set session to inactive and broadcast status message
  socket.on("disconnect", () => {
    socket.broadcast.to("lobby").emit("chat:status", {
      message: `${socket.handshake.auth.username} has disconnected`,
      date: new Date(),
    });
  });
};
