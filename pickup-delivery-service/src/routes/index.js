const express = require('express');
const {
  getRoot,
  getHealth,
  getDomainRoot,
  getDomainHealth
} = require('../controllers/healthController');

const router = express.Router();
const BASE_PATH = '/api/deliveries';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Service root endpoint
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: pickup-delivery-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: pickup-delivery-service is running.
 */
router.get('/', getRoot);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Service health endpoint
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: Service health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: pickup-delivery-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: pickup-delivery-service is healthy.
 */
router.get('/health', getHealth);

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Domain base endpoint
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: Domain API base route info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: pickup-delivery-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Deliveries API base route is active.
 */
router.get(BASE_PATH, getDomainRoot);

/**
 * @swagger
 * /api/deliveries/health:
 *   get:
 *     summary: Domain health endpoint
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: Domain API health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: pickup-delivery-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Deliveries API health check passed.
 */
router.get(BASE_PATH + '/health', getDomainHealth);

module.exports = router;
