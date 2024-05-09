const AppError = require('../utils/appError');

const handleValidationError = (err) => {
  const message = Object.values(err.errors)
    .map((x) => x.message)
    .join(', ');
  const error = new AppError(400, message);
  return error;
};

const handleInvalidObjectId = () => {
  const error = new AppError(400, 'Please provide valid id');
  return error;
};
const handleDuplicateFieldError = (err) => {};

// eslint-disable-next-line arrow-body-style
const jwtError = () => {
  // eslint-disable-next-line no-new
  return new AppError(400, 'Invalid token. Please log in again!');
};

// eslint-disable-next-line arrow-body-style
const jwtExpiryError = () => {
  // eslint-disable-next-line no-new
  return new AppError(400, 'Token expired. Please log in again!');
};

const sendProductionError = (error, res) => {
  if (error.isOperational === true) {
    return res.status(error.statusCode).json({
      status: 'failed',
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'some thing went wrong',
  });
};

const sendDevlopmentError = (error, res) => {
  res.status(error.statusCode || 500).json({
    status: error.status || 'error',
    message: error.message,
    error,
    stack: error.stack,
  });
};

const globalErrorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendDevlopmentError(error, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let err = { ...error };
    err.message = error.message;
    if (error.name === 'ValidationError') {
      err = handleValidationError(error);
    }

    if (error.kind === 'ObjectId') {
      err = handleInvalidObjectId();
    }

    if (error.name === 'CastError') {
      err = handleInvalidObjectId();
    }

    if (error.name === 'TokenExpiredError') {
      err = jwtExpiryError();
    }

    if (error.name === 'JsonWebTokenError') {
      err = jwtError();
    }
    sendProductionError(err, res);
  }
};

module.exports = globalErrorHandler;
