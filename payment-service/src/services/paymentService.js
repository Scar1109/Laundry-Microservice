const crypto = require('crypto');
const paymentRepository = require('../repositories/paymentRepository');

class PaymentService {
  async createPayment(data) {
    const { orderId, amount, paymentMethod } = data;
    
    // Generate simple invoice record
    const invoiceId = `INV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const invoiceRecord = {
      invoiceId,
      issuedAt: new Date()
    };

    const paymentId = crypto.randomUUID();

    const paymentData = {
      paymentId,
      orderId,
      amount,
      paymentMethod,
      paymentStatus: 'PENDING',
      invoiceRecord
    };

    const payment = await paymentRepository.create(paymentData);
    
    // As per requirement, this simulates payment processing
    // In a real scenario, we'd interact with Stripe, PayPal, etc.
    // For now, if payment method is not Cash, let's randomly succeed or fail.
    // We'll leave it simple for the controller to trigger explicitly via updatePaymentStatus endpoint
    
    return payment;
  }

  async getPaymentById(paymentId) {
    return await paymentRepository.findByPaymentId(paymentId);
  }

  async getPaymentByOrderId(orderId) {
    return await paymentRepository.findByOrderId(orderId);
  }

  async updatePaymentStatus(paymentId, status) {
    const allowedStatuses = ['PENDING', 'SUCCESS', 'FAILED'];
    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid payment status');
    }
    return await paymentRepository.updateStatus(paymentId, status);
  }
}

module.exports = new PaymentService();
