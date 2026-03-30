const mongoose = require('mongoose');
const orderRepository = require('../repositories/orderRepository');

const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'picked_up',
  'processing',
  'out_for_delivery',
  'delivered',
  'cancelled'
];

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError('Invalid order ID.');
  }
};

const ensureRequiredString = (value, fieldName) => {
  if (!value || !String(value).trim()) {
    throw createError(fieldName + ' is required.');
  }

  return String(value).trim();
};

const ensureDate = (value, fieldName) => {
  const parsedDate = new Date(value);

  if (!value || Number.isNaN(parsedDate.getTime())) {
    throw createError(fieldName + ' must be a valid date/time value.');
  }

  return parsedDate;
};

const ensureTotalAmount = (value) => {
  const amount = Number(value);

  if (Number.isNaN(amount) || amount < 0) {
    throw createError('totalAmount must be a valid non-negative number.');
  }

  return amount;
};

const ensureItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw createError('items must be a non-empty array.');
  }

  return items.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw createError('items[' + index + '] must be an object.');
    }

    const itemName = ensureRequiredString(item.itemName, 'items[' + index + '].itemName');
    const quantity = Number(item.quantity);

    if (Number.isNaN(quantity) || quantity < 1) {
      throw createError('items[' + index + '].quantity must be a number greater than or equal to 1.');
    }

    return {
      itemName,
      quantity,
      notes: item.notes ? String(item.notes).trim() : ''
    };
  });
};

class OrderService {
  async getAllOrders() {
    return await orderRepository.findAll();
  }

  async getOrderById(id) {
    ensureObjectId(id);
    return await orderRepository.findById(id);
  }

  async createOrder(data) {
    const customerId = ensureRequiredString(data.customerId, 'customerId');
    const items = ensureItems(data.items);
    const serviceType = ensureRequiredString(data.serviceType, 'serviceType');
    const pickupDate = ensureDate(data.pickupDate, 'pickupDate');
    const deliveryDate = ensureDate(data.deliveryDate, 'deliveryDate');
    const totalAmount = ensureTotalAmount(data.totalAmount);
    const status = data.status || 'pending';

    if (!ORDER_STATUSES.includes(status)) {
      throw createError('Invalid status. Allowed values: ' + ORDER_STATUSES.join(', '));
    }

    if (deliveryDate < pickupDate) {
      throw createError('deliveryDate must be greater than or equal to pickupDate.');
    }

    const orderData = {
      customerId,
      items,
      serviceType,
      pickupDate,
      deliveryDate,
      status,
      totalAmount,
      notes: data.notes ? String(data.notes).trim() : ''
    };

    return await orderRepository.create(orderData);
  }

  async updateOrderStatus(id, nextStatus) {
    ensureObjectId(id);
    const status = ensureRequiredString(nextStatus, 'status');

    if (!ORDER_STATUSES.includes(status)) {
      throw createError('Invalid status. Allowed values: ' + ORDER_STATUSES.join(', '));
    }

    return await orderRepository.updateById(id, { status });
  }

  async deleteOrder(id) {
    ensureObjectId(id);
    return await orderRepository.deleteById(id);
  }
}

module.exports = new OrderService();
