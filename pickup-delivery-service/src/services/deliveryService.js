const mongoose = require('mongoose');
const deliveryRepository = require('../repositories/deliveryRepository');

const DELIVERY_STATUSES = [
  'scheduled',
  'pickup_pending',
  'picked_up',
  'in_transit',
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
    throw createError('Invalid delivery ID.');
  }
};

const ensureDate = (value, fieldName) => {
  const parsedDate = new Date(value);

  if (!value || Number.isNaN(parsedDate.getTime())) {
    throw createError(fieldName + ' must be a valid date/time value.');
  }

  return parsedDate;
};

const ensureRequiredString = (value, fieldName) => {
  if (!value || !String(value).trim()) {
    throw createError(fieldName + ' is required.');
  }

  return String(value).trim();
};

class DeliveryService {
  async getAllDeliveries() {
    return await deliveryRepository.findAll();
  }

  async getDeliveryById(id) {
    ensureObjectId(id);
    return await deliveryRepository.findById(id);
  }

  async createDelivery(data) {
    const orderId = ensureRequiredString(data.orderId, 'orderId');
    const customerId = ensureRequiredString(data.customerId, 'customerId');
    const pickupAddress = ensureRequiredString(data.pickupAddress, 'pickupAddress');
    const deliveryAddress = ensureRequiredString(data.deliveryAddress, 'deliveryAddress');
    const pickupSlot = ensureDate(data.pickupSlot, 'pickupSlot');
    const deliverySlot = ensureDate(data.deliverySlot, 'deliverySlot');

    const currentStatus = data.currentStatus || 'scheduled';

    if (!DELIVERY_STATUSES.includes(currentStatus)) {
      throw createError(
        'Invalid currentStatus. Allowed values: ' + DELIVERY_STATUSES.join(', ')
      );
    }

    const deliveryData = {
      orderId,
      customerId,
      pickupAddress,
      deliveryAddress,
      pickupSlot,
      deliverySlot,
      currentStatus,
      assignedRider: data.assignedRider ? String(data.assignedRider).trim() : null,
      notes: data.notes ? String(data.notes).trim() : ''
    };

    return await deliveryRepository.create(deliveryData);
  }

  async updateDeliveryStatus(id, status) {
    ensureObjectId(id);
    const nextStatus = ensureRequiredString(status, 'currentStatus');

    if (!DELIVERY_STATUSES.includes(nextStatus)) {
      throw createError(
        'Invalid currentStatus. Allowed values: ' + DELIVERY_STATUSES.join(', ')
      );
    }

    return await deliveryRepository.updateById(id, { currentStatus: nextStatus });
  }

  async assignRider(id, rider) {
    ensureObjectId(id);
    const assignedRider = ensureRequiredString(rider, 'assignedRider');

    return await deliveryRepository.updateById(id, { assignedRider });
  }

  async deleteDelivery(id) {
    ensureObjectId(id);
    return await deliveryRepository.deleteById(id);
  }
}

module.exports = new DeliveryService();
