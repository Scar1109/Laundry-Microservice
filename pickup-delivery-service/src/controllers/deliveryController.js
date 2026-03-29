const deliveryService = require('../services/deliveryService');

const getServiceName = () => process.env.SERVICE_NAME || 'pickup-delivery-service';

const buildResponse = (message, status = 'ok', data) => {
  const response = {
    service: getServiceName(),
    status,
    timestamp: new Date().toISOString(),
    message
  };

  if (typeof data !== 'undefined') {
    response.data = data;
  }

  return response;
};

const normalizeError = (error) => {
  if (error.name === 'ValidationError') {
    error.statusCode = 400;
  }

  if (error.name === 'CastError') {
    error.statusCode = 400;
    error.message = 'Invalid delivery ID.';
  }

  return error;
};

const getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await deliveryService.getAllDeliveries();

    return res.status(200).json(
      buildResponse('Deliveries retrieved successfully.', 'ok', deliveries)
    );
  } catch (error) {
    next(normalizeError(error));
  }
};

const getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await deliveryService.getDeliveryById(req.params.id);

    if (!delivery) {
      return res
        .status(404)
        .json(buildResponse('Delivery not found.', 'error'));
    }

    return res.status(200).json(
      buildResponse('Delivery retrieved successfully.', 'ok', delivery)
    );
  } catch (error) {
    next(normalizeError(error));
  }
};

const createDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveryService.createDelivery(req.body);

    return res.status(201).json(
      buildResponse('Delivery created successfully.', 'ok', delivery)
    );
  } catch (error) {
    next(normalizeError(error));
  }
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const statusValue = req.body.currentStatus || req.body.status;

    if (!statusValue) {
      return res
        .status(400)
        .json(buildResponse('currentStatus is required.', 'error'));
    }

    const updatedDelivery = await deliveryService.updateDeliveryStatus(
      req.params.id,
      statusValue
    );

    if (!updatedDelivery) {
      return res
        .status(404)
        .json(buildResponse('Delivery not found.', 'error'));
    }

    return res.status(200).json(
      buildResponse('Delivery status updated successfully.', 'ok', updatedDelivery)
    );
  } catch (error) {
    next(normalizeError(error));
  }
};

const assignRider = async (req, res, next) => {
  try {
    if (!req.body.assignedRider) {
      return res
        .status(400)
        .json(buildResponse('assignedRider is required.', 'error'));
    }

    const updatedDelivery = await deliveryService.assignRider(
      req.params.id,
      req.body.assignedRider
    );

    if (!updatedDelivery) {
      return res
        .status(404)
        .json(buildResponse('Delivery not found.', 'error'));
    }

    return res.status(200).json(
      buildResponse('Rider assigned successfully.', 'ok', updatedDelivery)
    );
  } catch (error) {
    next(normalizeError(error));
  }
};

const deleteDelivery = async (req, res, next) => {
  try {
    const deletedDelivery = await deliveryService.deleteDelivery(req.params.id);

    if (!deletedDelivery) {
      return res
        .status(404)
        .json(buildResponse('Delivery not found.', 'error'));
    }

    return res.status(200).json(
      buildResponse('Delivery deleted successfully.', 'ok', deletedDelivery)
    );
  } catch (error) {
    next(normalizeError(error));
  }
};

module.exports = {
  getAllDeliveries,
  getDeliveryById,
  createDelivery,
  updateDeliveryStatus,
  assignRider,
  deleteDelivery
};
