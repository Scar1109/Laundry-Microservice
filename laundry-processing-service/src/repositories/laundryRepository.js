const Laundry = require('../models/Laundry');

class LaundryRepository {
  async create(data) {
    const laundry = new Laundry(data);
    return await laundry.save();
  }

  async findAll() {
    return await Laundry.find({});
  }

  async findById(id) {
    return await Laundry.findById(id);
  }

  async updateStatus(id, processStatus) {
    const updateData = { processStatus };
    
    // Auto-set timestamps based on status
    if (processStatus === 'received' || processStatus === 'washing') {
      // Just check if it wasn't started yet, but to be simple we can just set startedAt if not set, or let the service handle it
      // Let's just update the status and let the service handle dates
    }
    
    return await Laundry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  // Generic update if needed
  async update(id, updateData) {
    return await Laundry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Laundry.findByIdAndDelete(id);
  }
}

module.exports = new LaundryRepository();
