const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

const createServiceProxy = (target, basePath) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path) => {
      if (path === '/' || path === '') {
        return basePath;
      }
      return basePath + path;
    }
  });
};

router.use('/api/customers', createServiceProxy(process.env.CUSTOMER_SERVICE_URL, '/api/customers'));
router.use('/api/orders', createServiceProxy(process.env.ORDER_SERVICE_URL, '/api/orders'));
router.use('/api/deliveries', createServiceProxy(process.env.DELIVERY_SERVICE_URL, '/api/deliveries'));
router.use('/api/payments', createServiceProxy(process.env.PAYMENT_SERVICE_URL, '/api/payments'));
router.use('/api/laundry', createServiceProxy(process.env.LAUNDRY_SERVICE_URL, '/api/laundry'));

module.exports = router;
