const laundryRepository = require('../repositories/laundryRepository');

class LaundryService {
  async createLaundry(data) {
    const { orderId, processingType, clothCount, weight, specialInstructions } = data;
    
    const laundryData = {
      orderId,
      processingType,
      clothCount,
      weight,
      specialInstructions,
      processStatus: 'pending'
    };

    return await laundryRepository.create(laundryData);
  }

  async getAllLaundry() {
    return await laundryRepository.findAll();
  }

  async getLaundryById(id) {
    return await laundryRepository.findById(id);
  }

  async updateLaundryStatus(id, status) {
    const allowedStatuses = ['pending', 'received', 'washing', 'drying', 'ironing', 'packaging', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid process status');
    }
    
    const updateData = { processStatus: status };
    
    if (status === 'washing' || status === 'received') {
      updateData.startedAt = new Date();
    } else if (status === 'completed') {
      updateData.completedAt = new Date();
    }
    
    return await laundryRepository.update(id, updateData);
  }

  async deleteLaundry(id) {
    return await laundryRepository.delete(id);
  }
}

module.exports = new LaundryService();
