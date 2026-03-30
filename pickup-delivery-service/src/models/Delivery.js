const mongoose = require('mongoose');

const DELIVERY_STATUSES = [
  'scheduled',
  'pickup_pending',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'cancelled'
];

const deliverySchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    customerId: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    pickupAddress: {
      type: String,
      required: true,
      trim: true
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true
    },
    assignedRider: {
      type: String,
      trim: true,
      default: null
    },
    pickupSlot: {
      type: Date,
      required: true
    },
    deliverySlot: {
      type: Date,
      required: true
    },
    currentStatus: {
      type: String,
      enum: DELIVERY_STATUSES,
      default: 'scheduled',
      index: true
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Delivery', deliverySchema);
