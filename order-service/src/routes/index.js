const express = require('express');
const {
  getRoot,
  getHealth,
  getDomainRoot,
  getDomainHealth
} = require('../controllers/healthController');

const router = express.Router();
const BASE_PATH = '/api/orders';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Service root endpoint
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: order-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: order-service is running.
 */
router.get('/', getRoot);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Service health endpoint
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Service health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: order-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: order-service is healthy.
 */
router.get('/health', getHealth);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Domain base endpoint
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Domain API base route info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: order-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Orders API base route is active.
 */
router.get(BASE_PATH, getDomainRoot);

/**
 * @swagger
 * /api/orders/health:
 *   get:
 *     summary: Domain health endpoint
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Domain API health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: order-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Orders API health check passed.
 */
router.get(BASE_PATH + '/health', getDomainHealth);

module.exports = router;
