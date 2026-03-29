const paymentService = require('../services/paymentService');

const createPayment = async (req, res, next) => {
  try {
    const { orderId, amount, paymentMethod } = req.body;
    
    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({ error: 'orderId, amount, and paymentMethod are required.' });
    }

    const payment = await paymentService.createPayment({ orderId, amount, paymentMethod });
    
    return res.status(201).json({
      message: 'Payment created successfully',
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await paymentService.getPaymentById(id);
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    return res.status(200).json({ data: payment });
  } catch (error) {
    next(error);
  }
};

const getPaymentByOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const payment = await paymentService.getPaymentByOrderId(orderId);
    
    if (!payment) {
      return res.status(404).json({ error: 'No payment found for this order ID' });
    }

    return res.status(200).json({ data: payment });
  } catch (error) {
    next(error);
  }
};

const updatePaymentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updatedPayment = await paymentService.updatePaymentStatus(id, status);
    
    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    return res.status(200).json({
      message: 'Payment status updated successfully',
      data: updatedPayment
    });
  } catch (error) {
    if (error.message === 'Invalid payment status') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getPaymentByOrderId,
  updatePaymentStatus
};
