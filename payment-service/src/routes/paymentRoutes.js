const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - paymentId
 *         - orderId
 *         - amount
 *         - paymentMethod
 *       properties:
 *         paymentId:
 *           type: string
 *           description: Auto-generated unique payment ID
 *         orderId:
 *           type: string
 *           description: ID of the associated order
 *         amount:
 *           type: number
 *           description: Payment amount
 *         paymentMethod:
 *           type: string
 *           enum: [Cash, Card, Online]
 *           description: Method of payment
 *         paymentStatus:
 *           type: string
 *           enum: [PENDING, SUCCESS, FAILED]
 *           description: Status of the payment
 *         invoiceRecord:
 *           type: object
 *           properties:
 *             invoiceId:
 *               type: string
 *             issuedAt:
 *               type: string
 *               format: date-time
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - paymentMethod
 *             properties:
 *               orderId:
 *                 type: string
 *               amount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *                 enum: [Cash, Card, Online]
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 */
router.post('/', paymentController.createPayment);

/**
 * @swagger
 * /api/payments/order/{orderId}:
 *   get:
 *     summary: Get payment by Order ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found for this order
 */
router.get('/order/:orderId', paymentController.getPaymentByOrderId);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 */
router.get('/:id', paymentController.getPaymentById);

/**
 * @swagger
 * /api/payments/{id}/status:
 *   put:
 *     summary: Update payment status
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
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
 *                 enum: [PENDING, SUCCESS, FAILED]
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Payment not found
 */
router.put('/:id/status', paymentController.updatePaymentStatus);

module.exports = router;
