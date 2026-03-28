const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    service: process.env.SERVICE_NAME || 'api-gateway',
    status: 'error',
    timestamp: new Date().toISOString(),
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
