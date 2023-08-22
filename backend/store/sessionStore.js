const { v4: uuidv4 } = require("uuid");
const usernameGenerator = require("unique-username-generator");

class SessionStore {
  findSession(id) {}
  saveSession(id, session) {}
  findAllSessions() {}
}

class InMemorySessionStore extends SessionStore {
  constructor() {
    super();
    this.sessions = new Map();
    this.activeSessions = new Set();
  }

  findSession(sessionID) {
    return this.sessions.get(sessionID);
  }

  checkSessionExists(sessionID) {
    if (this.findSession(sessionID)) {
      return true;
    }
    return false;
  }

  saveSession(sessionID, session) {
    if ((session.connected = true)) {
      this.activeSessions.add(sessionID);
    } else {
      this.activeSessions.delete(sessionID);
    }
    this.sessions.set(sessionID, session);
  }

  getActiveSessions() {
    return this.activeSessions.size;
  }

  findAllSessions() {
    return [...this.sessions.values()]; //conversion to array
  }

  newUsername(sessionID, username) {
    this.findSession(sessionID).username = username;
  }

  checkUsernameExists(username) {}

  randomUsername() {
    const username = usernameGenerator.generateUsername();
    return username;
  }

  randomUserID() {
    return uuidv4();
  }

  randomSessionID() {
    return uuidv4();
  }
}

module.exports = {
  InMemorySessionStore,
};
