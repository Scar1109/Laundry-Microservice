const Order = require('../models/Order');

class OrderRepository {
  async create(orderData) {
    const order = new Order(orderData);
    return await order.save();
  }

  async findAll() {
    return await Order.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Order.findById(id);
  }

  async updateById(id, updates) {
    return await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(id) {
    return await Order.findByIdAndDelete(id);
  }
}

module.exports = new OrderRepository();
