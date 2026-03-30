const laundryService = require('../services/laundryService');

const createLaundry = async (req, res, next) => {
  try {
    const { orderId, processingType, clothCount, weight, specialInstructions } = req.body;
    
    if (!orderId || !processingType || !clothCount || typeof weight !== 'number') {
      return res.status(400).json({ error: 'orderId, processingType, clothCount, and weight are required.' });
    }

    const laundry = await laundryService.createLaundry({ 
      orderId, processingType, clothCount, weight, specialInstructions 
    });
    
    return res.status(201).json({
      message: 'Laundry processing record created successfully',
      data: laundry
    });
  } catch (error) {
    next(error);
  }
};

const getAllLaundry = async (req, res, next) => {
  try {
    const records = await laundryService.getAllLaundry();
    return res.status(200).json({ data: records });
  } catch (error) {
    next(error);
  }
};

const getLaundryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const laundry = await laundryService.getLaundryById(id);
    
    if (!laundry) {
      return res.status(404).json({ error: 'Laundry processing record not found' });
    }

    return res.status(200).json({ data: laundry });
  } catch (error) {
    next(error);
  }
};

const updateLaundryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updatedLaundry = await laundryService.updateLaundryStatus(id, status);
    
    if (!updatedLaundry) {
      return res.status(404).json({ error: 'Laundry processing record not found' });
    }

    return res.status(200).json({
      message: 'Laundry process status updated successfully',
      data: updatedLaundry
    });
  } catch (error) {
    if (error.message === 'Invalid process status') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

const deleteLaundry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await laundryService.deleteLaundry(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Laundry processing record not found' });
    }

    return res.status(200).json({ message: 'Laundry processing record deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLaundry,
  getAllLaundry,
  getLaundryById,
  updateLaundryStatus,
  deleteLaundry
};
