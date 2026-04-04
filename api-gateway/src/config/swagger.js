const swaggerUi = require('swagger-ui-express');

const serviceDocs = [
  { url: '/api/customers/api-docs.json', name: 'Customer Service' },
  { url: '/api/orders/api-docs.json', name: 'Order Service' },
  { url: '/api/deliveries/api-docs.json', name: 'Pickup & Delivery Service' },
  { url: '/api/payments/api-docs.json', name: 'Payment Service' },
  { url: '/api/laundry/api-docs.json', name: 'Laundry Processing Service' }
];

const setupGatewaySwagger = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(null, {
      explorer: true,
      swaggerOptions: {
        urls: serviceDocs
      },
      customSiteTitle: 'Laundry Delivery API Gateway Docs'
    })
  );
};

module.exports = setupGatewaySwagger;
