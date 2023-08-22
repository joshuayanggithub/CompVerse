module.exports = (socket, io) => {
  const createGame = (gameData) => {
    socket.join(gameData.roomID);
  };

  socket.on("game:create", createGame);
  // socket.on("game:join", joinGame);
};
