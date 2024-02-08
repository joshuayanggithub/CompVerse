const { v4: uuidv4 } = require("uuid");
const usernameGenerator = require("unique-username-generator");

class RoomsStore {
  findSession(id) {}
  saveSession(id, session) {}
  findAllSessions() {}
}

class InMemoryRoomsStore extends RoomsStore {
  constructor() {
    super();
    this.rooms = new Map();
  }

  newRoom(room) {
    //room object
    if (this.rooms.get(room.roomName)) return;

    this.rooms.set(room.roomName, room);
  }

  get getRooms() {
    return rooms;
  }
}

const rooms = new InMemoryRoomsStore();

module.exports = {
  InMemoryRoomsStore,
  rooms,
};
