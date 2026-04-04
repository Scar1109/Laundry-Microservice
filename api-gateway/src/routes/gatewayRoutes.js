const express = require('express');
const {
  createProxyMiddleware,
  responseInterceptor,
  fixRequestBody
} = require('http-proxy-middleware');

const router = express.Router();

const validateHttpTarget = (target, envVarName) => {
  if (!target) {
    throw new Error(envVarName + ' is required and must include http:// or https://');
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(target);
  } catch (error) {
    throw new Error(envVarName + ' must be a valid URL. Received: ' + target);
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new Error(envVarName + ' must use http:// or https://. Received: ' + target);
  }

  return parsedUrl.toString().replace(/\/$/, '');
};

const createServiceProxy = (target, basePath) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    on: {
      // Ensure JSON body parsed by gateway is re-streamed to target services.
      proxyReq: fixRequestBody
    },
    pathRewrite: (path) => {
      if (path === '/' || path === '') {
        return basePath;
      }
      // Avoid double-prefixing when OpenAPI paths already include the domain base path.
      if (path === basePath || path.startsWith(basePath + '/')) {
        return path;
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

const createSwaggerJsonProxy = (target, gatewayBasePath) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: () => '/api-docs.json',
    selfHandleResponse: true,
    on: {
      proxyRes: responseInterceptor(async (responseBuffer) => {
        try {
          const spec = JSON.parse(responseBuffer.toString('utf8'));

          // Force "Try it out" requests to go through gateway paths to avoid client-side CORS/origin issues.
          spec.servers = [{ url: gatewayBasePath }];

          return JSON.stringify(spec);
        } catch (error) {
          return responseBuffer;
        }
      })
    }
  });
};

const rawServiceProxyConfigs = [
  {
    gatewayBasePath: '/api/customers',
    target: process.env.CUSTOMER_SERVICE_URL,
    envVarName: 'CUSTOMER_SERVICE_URL'
  },
  {
    gatewayBasePath: '/api/orders',
    target: process.env.ORDER_SERVICE_URL,
    envVarName: 'ORDER_SERVICE_URL'
  },
  {
    gatewayBasePath: '/api/deliveries',
    target: process.env.DELIVERY_SERVICE_URL,
    envVarName: 'DELIVERY_SERVICE_URL'
  },
  {
    gatewayBasePath: '/api/payments',
    target: process.env.PAYMENT_SERVICE_URL,
    envVarName: 'PAYMENT_SERVICE_URL'
  },
  {
    gatewayBasePath: '/api/laundry',
    target: process.env.LAUNDRY_SERVICE_URL,
    envVarName: 'LAUNDRY_SERVICE_URL'
  }
];

const serviceProxyConfigs = rawServiceProxyConfigs.map((config) => ({
  gatewayBasePath: config.gatewayBasePath,
  target: validateHttpTarget(config.target, config.envVarName)
}));

serviceProxyConfigs.forEach(({ gatewayBasePath, target }) => {
  router.use(gatewayBasePath + '/api-docs.json', createSwaggerJsonProxy(target, gatewayBasePath));
  router.use(gatewayBasePath + '/api-docs', createSwaggerUiProxy(target));
  router.use(gatewayBasePath, createServiceProxy(target, gatewayBasePath));
});

module.exports = router;
