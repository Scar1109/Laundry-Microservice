const mongoose = require('mongoose');

const laundrySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    index: true
  },
  processingType: {
    type: String,
    required: true
  },
  clothCount: {
    type: Number,
    min: 1,
    required: true
  },
  weight: {
    type: Number,
    min: 0,
    required: true
  },
  specialInstructions: {
    type: String,
    default: ''
  },
  processStatus: {
    type: String,
    enum: ['pending', 'received', 'washing', 'drying', 'ironing', 'packaging', 'completed', 'cancelled'],
    default: 'pending'
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Laundry', laundrySchema);
