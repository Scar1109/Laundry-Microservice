const express = require('express');
const router = express.Router();
const laundryController = require('../controllers/laundryController');

/**
 * @swagger
 * tags:
 *   name: Laundry
 *   description: Laundry processing management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Laundry:
 *       type: object
 *       required:
 *         - orderId
 *         - processingType
 *         - clothCount
 *         - weight
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique laundry ID
 *         orderId:
 *           type: string
 *           description: ID of the associated order
 *         processingType:
 *           type: string
 *           description: Type of laundry processing (e.g. Wash & Iron)
 *         clothCount:
 *           type: number
 *           description: Number of clothes
 *         weight:
 *           type: number
 *           description: Weight of the laundry
 *         specialInstructions:
 *           type: string
 *           description: Any special instructions for processing
 *         processStatus:
 *           type: string
 *           enum: [pending, received, washing, drying, ironing, packaging, completed, cancelled]
 *           description: Status of the processing
 *         startedAt:
 *           type: string
 *           format: date-time
 *         completedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/laundry:
 *   get:
 *     summary: Get all laundry processing records
 *     tags: [Laundry]
 *     responses:
 *       200:
 *         description: List of all laundry records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Laundry'
 */
router.get('/', laundryController.getAllLaundry);

/**
 * @swagger
 * /api/laundry/{id}:
 *   get:
 *     summary: Get laundry record by ID
 *     tags: [Laundry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The laundry ID
 *     responses:
 *       200:
 *         description: Laundry processing details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Laundry'
 *       404:
 *         description: Laundry record not found
 */
router.get('/:id', laundryController.getLaundryById);

/**
 * @swagger
 * /api/laundry:
 *   post:
 *     summary: Create a new laundry processing record
 *     tags: [Laundry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - processingType
 *               - clothCount
 *               - weight
 *             properties:
 *               orderId:
 *                 type: string
 *               processingType:
 *                 type: string
 *               clothCount:
 *                 type: number
 *               weight:
 *                 type: number
 *               specialInstructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Laundry record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Laundry'
 *       400:
 *         description: Bad request
 */
router.post('/', laundryController.createLaundry);

/**
 * @swagger
 * /api/laundry/{id}/status:
 *   patch:
 *     summary: Update laundry process status
 *     tags: [Laundry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The laundry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, received, washing, drying, ironing, packaging, completed, cancelled]
 *     responses:
 *       200:
 *         description: Laundry status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Laundry'
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Laundry record not found
 */
router.patch('/:id/status', laundryController.updateLaundryStatus);

/**
 * @swagger
 * /api/laundry/{id}:
 *   delete:
 *     summary: Delete a laundry processing record
 *     tags: [Laundry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The laundry ID
 *     responses:
 *       200:
 *         description: Laundry processing record deleted successfully
 *       404:
 *         description: Laundry record not found
 */
router.delete('/:id', laundryController.deleteLaundry);

module.exports = router;
