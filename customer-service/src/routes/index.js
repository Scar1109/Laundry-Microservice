const express = require('express');
const {
  getRoot,
  getHealth,
  getDomainRoot,
  getDomainHealth
} = require('../controllers/healthController');

const router = express.Router();
const BASE_PATH = '/api/customers';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Service root endpoint
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: customer-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: customer-service is running.
 */
router.get('/', getRoot);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Service health endpoint
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Service health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: customer-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: customer-service is healthy.
 */
router.get('/health', getHealth);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Domain base endpoint
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Domain API base route info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: customer-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Customers API base route is active.
 */
router.get(BASE_PATH, getDomainRoot);

/**
 * @swagger
 * /api/customers/health:
 *   get:
 *     summary: Domain health endpoint
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Domain API health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: customer-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Customers API health check passed.
 */
router.get(BASE_PATH + '/health', getDomainHealth);

module.exports = router;
