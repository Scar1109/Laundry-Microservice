const notFound = (req, res, next) => {
  res.status(404).json({
    service: process.env.SERVICE_NAME || 'laundry-processing-service',
    status: 'error',
    timestamp: new Date().toISOString(),
    message: 'Route not found.'
  });
};

module.exports = notFound;
