class User {
  constructor() {
    this.user = new user();
  }
}

class Room {
  constructor() {
    this.users = new Map();
  }

  joinUser(userID) {}
}

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

  createRoom(_id) {
    //room object
    if (this.rooms.get(room._id)) return;

    this.rooms.set(room._id, new Room());
  }

  getRoom(_id) {
    this.rooms.get(room._id);
  }

  get getRooms() {
    return rooms;
  }
}

const rooms = new InMemoryRoomsStore();

module.exports = {
  InMemoryRoomsStore,
  RoomsStore,
  rooms,
};
