module.exports = class Room {
  constructor(roomName, competition, matchLength) {
    this.roomName = this.roomName;
    this.competition = this.competition;
    this.matchLength = this.matchLength;
    this.problemNumber = 0;
    this.problemData = [];
    this.gameStarted = false;
    this.players = [];
  }

  joinRoom(player) {
    this.players.push(player);
  }

  startGame() {
    this.gameStarted = true;
  }

  endGame() {}

  nextProblem() {
    this.problemNumber++;
  }

  sendPublicInfo() {}
};
