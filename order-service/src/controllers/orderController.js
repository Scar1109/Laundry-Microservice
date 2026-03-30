const orderService = require('../services/orderService');

const getServiceName = () => process.env.SERVICE_NAME || 'order-service';

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
    error.message = 'Invalid order ID.';
  }

  return error;
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();

    return res
      .status(200)
      .json(buildResponse('Orders retrieved successfully.', 'ok', orders));
  } catch (error) {
    next(normalizeError(error));
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json(buildResponse('Order not found.', 'error'));
    }

    return res
      .status(200)
      .json(buildResponse('Order retrieved successfully.', 'ok', order));
  } catch (error) {
    next(normalizeError(error));
  }
};

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);

    return res
      .status(201)
      .json(buildResponse('Order created successfully.', 'ok', order));
  } catch (error) {
    next(normalizeError(error));
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const statusValue = req.body.status;

    if (!statusValue) {
      return res.status(400).json(buildResponse('status is required.', 'error'));
    }

    const updatedOrder = await orderService.updateOrderStatus(
      req.params.id,
      statusValue
    );

    if (!updatedOrder) {
      return res.status(404).json(buildResponse('Order not found.', 'error'));
    }

    return res.status(200).json(
      buildResponse('Order status updated successfully.', 'ok', updatedOrder)
    );
  } catch (error) {
    next(normalizeError(error));
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await orderService.deleteOrder(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json(buildResponse('Order not found.', 'error'));
    }

    return res
      .status(200)
      .json(buildResponse('Order deleted successfully.', 'ok', deletedOrder));
  } catch (error) {
    next(normalizeError(error));
  }
};


module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
};
