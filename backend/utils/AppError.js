class AppError {
  constructor(message, protocol) {
    this.message = message;
    this.protocol = protocol;
    this.isOperational = true;
  }

  toString() {
    return `${this.protocol}: ${this.message}`;
  }
}

module.exports = AppError;
