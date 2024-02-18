module.exports = (socket, io) => {
  const createGame = ({ competition, gameLength, gameName }) => {
    rooms.newRoom(new Room(competition, gameLength, gameName));
  };

  socket.on("game:create", createGame);
  // socket.on("game:join", joinGame);
};
