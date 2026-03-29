const express = require('express');
const {
  getRoot,
  getHealth,
  getDomainRoot,
  getDomainHealth
} = require('../controllers/healthController');

const router = express.Router();
const BASE_PATH = '/api/payments';
const paymentRoutes = require('./paymentRoutes');

// Mount domain routes
router.use(BASE_PATH, paymentRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Service root endpoint
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: payment-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: payment-service is running.
 */
router.get('/', getRoot);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Service health endpoint
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Service health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: payment-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: payment-service is healthy.
 */
router.get('/health', getHealth);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Domain base endpoint
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Domain API base route info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: payment-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Payments API base route is active.
 */
router.get(BASE_PATH, getDomainRoot);

/**
 * @swagger
 * /api/payments/health:
 *   get:
 *     summary: Domain health endpoint
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Domain API health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: payment-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Payments API health check passed.
 */
router.get(BASE_PATH + '/health', getDomainHealth);

module.exports = router;
