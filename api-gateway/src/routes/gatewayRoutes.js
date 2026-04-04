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

const createSwaggerUiProxy = (target) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path) => {
      if (path === '/' || path === '') {
        return '/api-docs/';
      }
      return '/api-docs' + path;
    }
  });
};

const createSwaggerJsonProxy = (target) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: () => '/api-docs.json'
  });
};

const serviceProxyConfigs = [
  {
    gatewayBasePath: '/api/customers',
    target: process.env.CUSTOMER_SERVICE_URL
  },
  {
    gatewayBasePath: '/api/orders',
    target: process.env.ORDER_SERVICE_URL
  },
  {
    gatewayBasePath: '/api/deliveries',
    target: process.env.DELIVERY_SERVICE_URL
  },
  {
    gatewayBasePath: '/api/payments',
    target: process.env.PAYMENT_SERVICE_URL
  },
  {
    gatewayBasePath: '/api/laundry',
    target: process.env.LAUNDRY_SERVICE_URL
  }
];

serviceProxyConfigs.forEach(({ gatewayBasePath, target }) => {
  router.use(gatewayBasePath + '/api-docs.json', createSwaggerJsonProxy(target));
  router.use(gatewayBasePath + '/api-docs', createSwaggerUiProxy(target));
  router.use(gatewayBasePath, createServiceProxy(target, gatewayBasePath));
});

module.exports = router;
