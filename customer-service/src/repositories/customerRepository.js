const Customer = require('../models/customerModel');

class CustomerRepository {
  async create(customerData) {
    const customer = new Customer(customerData);
    return await customer.save();
  }

  async findById(customerId) {
    return await Customer.findOne({ customerId });
  }

  async findByEmail(email) {
    return await Customer.findOne({ email });
  }

  async updateById(customerId, updateData) {
    return await Customer.findOneAndUpdate({ customerId }, updateData, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(customerId) {
    return await Customer.findOneAndDelete({ customerId });
  }
}

module.exports = new CustomerRepository();
