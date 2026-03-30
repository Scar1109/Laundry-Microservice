const express = require('express');
const {
  getRoot,
  getHealth,
  getDomainRoot,
  getDomainHealth
} = require('../controllers/healthController');

const router = express.Router();
const BASE_PATH = '/api/laundry';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Service root endpoint
 *     tags: [Laundry]
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: laundry-processing-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: laundry-processing-service is running.
 */
router.get('/', getRoot);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Service health endpoint
 *     tags: [Laundry]
 *     responses:
 *       200:
 *         description: Service health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: laundry-processing-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: laundry-processing-service is healthy.
 */
router.get('/health', getHealth);

/**
 * @swagger
 * /api/laundry:
 *   get:
 *     summary: Domain base endpoint
 *     tags: [Laundry]
 *     responses:
 *       200:
 *         description: Domain API base route info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: laundry-processing-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Laundry API base route is active.
 */
router.get(BASE_PATH, getDomainRoot);

/**
 * @swagger
 * /api/laundry/health:
 *   get:
 *     summary: Domain health endpoint
 *     tags: [Laundry]
 *     responses:
 *       200:
 *         description: Domain API health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardResponse'
 *             example:
 *               service: laundry-processing-service
 *               status: OK
 *               timestamp: '2026-01-01T00:00:00Z'
 *               message: Laundry API health check passed.
 */
router.get(BASE_PATH + '/health', getDomainHealth);

router.use(BASE_PATH, require('./laundryRoutes'));

module.exports = router;
