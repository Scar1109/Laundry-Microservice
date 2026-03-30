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
