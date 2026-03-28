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

## How To Run
1. Install dependencies: npm install
2. Start in development mode: npm run dev
3. Start in production mode: npm start
