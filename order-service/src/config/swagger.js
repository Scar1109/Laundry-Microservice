const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const DEFAULT_SERVICE_NAME = 'order-service';
const DEFAULT_PORT = '3002';
const SERVICE_TAG = 'Orders';

const buildSwaggerSpec = () => {
  const serviceName = process.env.SERVICE_NAME || DEFAULT_SERVICE_NAME;
  const port = process.env.PORT || DEFAULT_PORT;

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: serviceName + ' API',
        version: '1.0.0',
        description: 'OpenAPI documentation for ' + serviceName
      },
      servers: [
        {
          url: 'http://localhost:' + port
        }
      ],
      tags: [
        {
          name: SERVICE_TAG,
          description: SERVICE_TAG + ' service health and base endpoints'
        }
      ],
      components: {
        schemas: {
          StandardResponse: {
            type: 'object',
            properties: {
              service: {
                type: 'string',
                description: 'Service identifier'
              },
              status: {
                type: 'string',
                description: 'Request status'
              },
              timestamp: {
                type: 'string',
                format: 'date-time',
                description: 'Server timestamp'
              },
              message: {
                type: 'string',
                description: 'Response message'
              }
            },
            required: ['service', 'status', 'timestamp', 'message'],
            example: {
              service: serviceName,
              status: 'OK',
              timestamp: '2026-01-01T00:00:00Z',
              message: 'Service is running'
            }
          }
        }
      }
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  };

  return swaggerJsdoc(options);
};

const setupSwagger = (app) => {
  const specs = buildSwaggerSpec();

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(specs);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
};

module.exports = setupSwagger;
