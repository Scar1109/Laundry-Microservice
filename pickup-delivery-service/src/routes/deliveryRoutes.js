const express = require('express');
const deliveryController = require('../controllers/deliveryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: Pickup and delivery management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       required:
 *         - orderId
 *         - customerId
 *         - pickupAddress
 *         - deliveryAddress
 *         - pickupSlot
 *         - deliverySlot
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated delivery ID
 *         orderId:
 *           type: string
 *         customerId:
 *           type: string
 *         pickupAddress:
 *           type: string
 *         deliveryAddress:
 *           type: string
 *         assignedRider:
 *           type: string
 *           nullable: true
 *         pickupSlot:
 *           type: string
 *           format: date-time
 *         deliverySlot:
 *           type: string
 *           format: date-time
 *         currentStatus:
 *           type: string
 *           enum:
 *             - scheduled
 *             - pickup_pending
 *             - picked_up
 *             - in_transit
 *             - out_for_delivery
 *             - delivered
 *             - cancelled
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Get all deliveries
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: Delivery list
 */
router.get('/', deliveryController.getAllDeliveries);

/**
 * @swagger
 * /api/deliveries/{id}:
 *   get:
 *     summary: Get delivery by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery details
 *       404:
 *         description: Delivery not found
 */
router.get('/:id', deliveryController.getDeliveryById);

/**
 * @swagger
 * /api/deliveries:
 *   post:
 *     summary: Create a delivery record
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - customerId
 *               - pickupAddress
 *               - deliveryAddress
 *               - pickupSlot
 *               - deliverySlot
 *             properties:
 *               orderId:
 *                 type: string
 *               customerId:
 *                 type: string
 *               pickupAddress:
 *                 type: string
 *               deliveryAddress:
 *                 type: string
 *               assignedRider:
 *                 type: string
 *               pickupSlot:
 *                 type: string
 *                 format: date-time
 *               deliverySlot:
 *                 type: string
 *                 format: date-time
 *               currentStatus:
 *                 type: string
 *                 enum:
 *                   - scheduled
 *                   - pickup_pending
 *                   - picked_up
 *                   - in_transit
 *                   - out_for_delivery
 *                   - delivered
 *                   - cancelled
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Delivery created
 *       400:
 *         description: Invalid request
 */
router.post('/', deliveryController.createDelivery);

/**
 * @swagger
 * /api/deliveries/{id}/status:
 *   patch:
 *     summary: Update delivery status
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentStatus
 *             properties:
 *               currentStatus:
 *                 type: string
 *                 enum:
 *                   - scheduled
 *                   - pickup_pending
 *                   - picked_up
 *                   - in_transit
 *                   - out_for_delivery
 *                   - delivered
 *                   - cancelled
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Delivery not found
 */
router.patch('/:id/status', deliveryController.updateDeliveryStatus);

/**
 * @swagger
 * /api/deliveries/{id}/assign-rider:
 *   patch:
 *     summary: Assign rider to delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignedRider
 *             properties:
 *               assignedRider:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rider assigned
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Delivery not found
 */
router.patch('/:id/assign-rider', deliveryController.assignRider);

/**
 * @swagger
 * /api/deliveries/{id}:
 *   delete:
 *     summary: Delete a delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery deleted
 *       404:
 *         description: Delivery not found
 */
router.delete('/:id', deliveryController.deleteDelivery);

module.exports = router;
