require('dotenv').config();

const app = require('./app');
const { connectDB, scheduleDbReconnect } = require('./config/db');

const serviceName = process.env.SERVICE_NAME || 'order-service';
const port = process.env.PORT || 3002;
const retryInterval = Number(process.env.DB_RETRY_INTERVAL_MS) || 15000;

const startServer = async () => {
  const dbConnected = await connectDB();

  if (!dbConnected) {
    console.warn('[' + serviceName + '] Starting without database connection. Background retries every ' + retryInterval + 'ms.');
  }

  app.listen(port, () => {
    console.log('[' + serviceName + '] listening on port ' + port);
  });

  scheduleDbReconnect(retryInterval);
};

startServer();
