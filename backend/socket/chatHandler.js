module.exports = (socket, io) => {
  const onMessage = (msgData) => {
    io.emit("chat message", msgData); //send to everyone
  };

  socket.on("chat message", onMessage);
};
