module.exports = class ErrorResponse extends Error {
  constructor(status, message, path = '') {
    super();
    this.status = status;
    this.message = message;
    this.path = path;
    Error.captureStackTrace(this, this.constructor);
  }
};
