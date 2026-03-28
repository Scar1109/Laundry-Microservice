require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('[' + (process.env.SERVICE_NAME || 'api-gateway') + '] listening on port ' + port);
});
