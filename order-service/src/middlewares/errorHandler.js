const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    service: process.env.SERVICE_NAME || 'order-service',
    status: 'error',
    timestamp: new Date().toISOString(),
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
