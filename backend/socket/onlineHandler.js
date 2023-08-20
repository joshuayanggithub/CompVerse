module.exports = (io, socket) => {
  console.log(`User has connected`);
  io.emit("player:countChanged", io.engine.clientsCount);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("player:countChanged", io.engine.clientsCount);
  });
};
