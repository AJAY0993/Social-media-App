class AppError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.status = statusCode < 500 ? 'failed' : 'error';
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
