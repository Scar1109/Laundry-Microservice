const customerService = require('../services/customerService');

class CustomerController {
  async register(req, res) {
    try {
      const customer = await customerService.registerCustomer(req.body);
      
      const response = customer.toObject();
      delete response.password;
      delete response._id;
      delete response.__v;

      res.status(201).json({
        success: true,
        message: 'Customer registered successfully',
        data: response
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      const customer = await customerService.loginCustomer(email, password);
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: customer
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  async getCustomer(req, res) {
    try {
      const { id } = req.params;
      const customer = await customerService.getCustomerById(id);
      
      res.status(200).json({
        success: true,
        data: customer
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      const updatedCustomer = await customerService.updateCustomerProfile(id, req.body);
      
      res.status(200).json({
        success: true,
        message: 'Customer profile updated successfully',
        data: updatedCustomer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteCustomer(req, res) {
    try {
      const { id } = req.params;
      await customerService.deleteCustomer(id);
      
      res.status(200).json({
        success: true,
        message: 'Customer deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new CustomerController();
