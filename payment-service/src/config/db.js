const mongoose = require('mongoose');
const dns = require('dns');

let isConnecting = false;
let dnsConfigured = false;

const getServiceName = () => process.env.SERVICE_NAME || 'payment-service';

const isSrvDnsError = (message = '') => {
  return (
    message.includes('querySrv') ||
    message.includes('ENOTFOUND') ||
    message.includes('ECONNREFUSED _mongodb._tcp')
  );
};

const configureDns = () => {
  if (dnsConfigured) {
    return;
  }

  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);

    if (typeof dns.setDefaultResultOrder === 'function') {
      dns.setDefaultResultOrder('ipv4first');
    }

    dnsConfigured = true;
    console.log('[' + getServiceName() + '] DNS configured for Atlas resolution.');
  } catch (error) {
    console.warn('[' + getServiceName() + '] DNS configuration warning:', error.message);
  }
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('[' + getServiceName() + '] MONGODB_URI is not defined.');
    return false;
  }

  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (isConnecting) {
    return false;
  }

  configureDns();
  isConnecting = true;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('[' + getServiceName() + '] MongoDB connected.');
    return true;
  } catch (error) {
    console.error('[' + getServiceName() + '] MongoDB connection error:', error.message);

    if (uri.startsWith('mongodb+srv://') && isSrvDnsError(error.message)) {
      console.error('[' + getServiceName() + '] DNS SRV lookup failed for Atlas. Check network DNS/firewall, or use a non-SRV Atlas connection string.');
    }

    return false;
  } finally {
    isConnecting = false;
  }
};

const scheduleDbReconnect = (intervalMs = 15000) => {
  setInterval(async () => {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
  }, intervalMs);
};

module.exports = {
  connectDB,
  scheduleDbReconnect
};
