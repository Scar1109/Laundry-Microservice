const mongoose = require('mongoose');

const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'picked_up',
  'processing',
  'out_for_delivery',
  'delivered',
  'cancelled'
];

const orderItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    _id: false
  }
);

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: 'At least one item is required.'
      },
      required: true
    },
    serviceType: {
      type: String,
      required: true,
      trim: true
    },
    pickupDate: {
      type: Date,
      required: true
    },
    deliveryDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'pending',
      index: true
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
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

module.exports = mongoose.model('Order', orderSchema);
