# api-gateway

## Purpose
Routes external client requests to internal domain microservices for the Laundry Delivery System MVP.

## Port
3000

## Database
N/A

## Available Endpoints
- GET /
- GET /health
- Proxied:
  - /api/customers -> customer-service
  - /api/orders -> order-service
  - /api/deliveries -> pickup-delivery-service
  - /api/payments -> payment-service
  - /api/laundry -> laundry-processing-service
- Swagger UI via Gateway:
  - /api-docs -> aggregated Swagger UI for all services
  - /api/customers/api-docs -> customer-service /api-docs
  - /api/orders/api-docs -> order-service /api-docs
  - /api/deliveries/api-docs -> pickup-delivery-service /api-docs
  - /api/payments/api-docs -> payment-service /api-docs
  - /api/laundry/api-docs -> laundry-processing-service /api-docs
- Swagger JSON via Gateway:
  - /api/customers/api-docs.json -> customer-service /api-docs.json
  - /api/orders/api-docs.json -> order-service /api-docs.json
  - /api/deliveries/api-docs.json -> pickup-delivery-service /api-docs.json
  - /api/payments/api-docs.json -> payment-service /api-docs.json
  - /api/laundry/api-docs.json -> laundry-processing-service /api-docs.json

## How To Run
1. Install dependencies: npm install
2. Start in development mode: npm run dev
3. Start in production mode: npm start

## Troubleshooting: Swagger "Failed to fetch"
- Ensure all gateway target URLs in `.env` include a valid scheme:
  - `CUSTOMER_SERVICE_URL=http://localhost:3001`
  - `ORDER_SERVICE_URL=http://localhost:3002`
  - `DELIVERY_SERVICE_URL=http://localhost:3003`
  - `PAYMENT_SERVICE_URL=http://localhost:3004`
  - `LAUNDRY_SERVICE_URL=http://localhost:3005`
- If a URL is missing `http://` or `https://`, gateway startup will now fail fast with a clear error message.
- Gateway Swagger JSON is rewritten to use gateway-relative server URLs, so "Try it out" routes through the gateway and avoids browser CORS/origin issues.
