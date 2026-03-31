const customerRepository = require('../repositories/customerRepository');
const crypto = require('crypto');

class CustomerService {
  async registerCustomer(data) {
    // Check if email exists
    const existingEmail = await customerRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error('Email already registered');
    }

    // Generate unique customerId
    const customerId = 'CUST-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const newCustomer = {
      ...data,
      customerId
    };

    return await customerRepository.create(newCustomer);
  }

  async loginCustomer(email, password) {
    const customer = await customerRepository.findByEmail(email);
    if (!customer) {
      throw new Error('Invalid email or password');
    }

    // For MVP, simple text matching. 
    if (customer.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Return the customer details except password
    const customerObj = customer.toObject();
    delete customerObj.password;
    delete customerObj._id;
    delete customerObj.__v;

    return customerObj;
  }

  async getCustomerById(customerId) {
    const customer = await customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    const customerObj = customer.toObject();
    delete customerObj.password;
    delete customerObj._id;
    delete customerObj.__v;
    return customerObj;
  }

  async updateCustomerProfile(customerId, updateData) {
    // Don't allow password or customerId update through regular profile update
    const safeData = { ...updateData };
    delete safeData.password;
    delete safeData.customerId;

    const updatedCustomer = await customerRepository.updateById(customerId, safeData);
    if (!updatedCustomer) {
      throw new Error('Customer not found');
    }

    const customerObj = updatedCustomer.toObject();
    delete customerObj.password;
    delete customerObj._id;
    delete customerObj.__v;
    return customerObj;
  }

  async deleteCustomer(customerId) {
    const deletedCustomer = await customerRepository.deleteById(customerId);
    if (!deletedCustomer) {
      throw new Error('Customer not found');
    }
    return true;
  }
}

module.exports = new CustomerService();
