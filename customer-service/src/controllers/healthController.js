const getServiceName = () => process.env.SERVICE_NAME || 'customer-service';

const buildResponse = (message, status = 'ok') => ({
  service: getServiceName(),
  status,
  timestamp: new Date().toISOString(),
  message
});

const getRoot = (req, res) => {
  res.status(200).json(buildResponse('customer-service is running.'));
};

const getHealth = (req, res) => {
  res.status(200).json(buildResponse('customer-service is healthy.'));
};

const getDomainRoot = (req, res) => {
  res.status(200).json(buildResponse('Customer API base route is active.'));
};

const getDomainHealth = (req, res) => {
  res.status(200).json(buildResponse('Customer API health check passed.'));
};

module.exports = {
  getRoot,
  getHealth,
  getDomainRoot,
  getDomainHealth
};
