const Delivery = require('../models/Delivery');

class DeliveryRepository {
  async create(deliveryData) {
    const delivery = new Delivery(deliveryData);
    return await delivery.save();
  }

  async findAll() {
    return await Delivery.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Delivery.findById(id);
  }

  async updateById(id, updates) {
    return await Delivery.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(id) {
    return await Delivery.findByIdAndDelete(id);
  }
}

module.exports = new DeliveryRepository();
