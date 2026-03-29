const Payment = require('../models/Payment');

class PaymentRepository {
  async create(paymentData) {
    const payment = new Payment(paymentData);
    return await payment.save();
  }

  async findByPaymentId(paymentId) {
    return await Payment.findOne({ paymentId });
  }

  async findByOrderId(orderId) {
    return await Payment.findOne({ orderId });
  }

  async updateStatus(paymentId, status) {
    return await Payment.findOneAndUpdate(
      { paymentId },
      { paymentStatus: status },
      { new: true, runValidators: true }
    );
  }
}

module.exports = new PaymentRepository();
