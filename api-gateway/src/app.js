const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const gatewayRoutes = require('./routes/gatewayRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    service: process.env.SERVICE_NAME || 'api-gateway',
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'API Gateway is running.'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    service: process.env.SERVICE_NAME || 'api-gateway',
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'API Gateway is healthy.'
  });
});

app.use(gatewayRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
