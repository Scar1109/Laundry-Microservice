# order-service

## Purpose
Handles laundry order operations for the Laundry Delivery System MVP, including:
- order creation
- order details
- service type and schedule tracking
- order status updates
- notes and billing amount tracking

## Port
3002

## Database
laundry_orders

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- CommonJS modules
- Swagger (`/api-docs`)
- `.env` based configuration

## Service Architecture
- `src/models` -> Mongoose schemas
- `src/repositories` -> DB access layer
- `src/services` -> business rules and validation
- `src/controllers` -> HTTP handlers and response formatting
- `src/routes` -> endpoint definitions and Swagger annotations
- `src/config` -> DB and Swagger setup
- `src/middlewares` -> centralized notFound and error handling

## Order Fields
- `customerId`
- `items`
- `serviceType`
- `pickupDate`
- `deliveryDate`
- `status`
- `totalAmount`
- `notes`

## Allowed Status Values
- `pending`
- `confirmed`
- `picked_up`
- `processing`
- `out_for_delivery`
- `delivered`
- `cancelled`

## Available Endpoints
- GET /
- GET /health
- GET /api/orders
- GET /api/orders/:id
- POST /api/orders
- PATCH /api/orders/:id/status
- DELETE /api/orders/:id
- GET /api/orders/health
- GET /api-docs

## API Gateway Compatibility
This service is gateway-ready through:
- `/api/orders` -> `order-service`

## Swagger URL
http://localhost:3002/api-docs

## Environment Variables
Copy `.env.example` to `.env` and configure:
- `PORT=3002`
- `SERVICE_NAME=order-service`
- `MONGODB_URI=mongodb://127.0.0.1:27017/laundry_orders`
- `NODE_ENV=development`
- `DB_RETRY_INTERVAL_MS=15000`

## How To Run
1. Install dependencies:
`npm install`
2. Start in development mode:
`npm run dev`
3. Start in production mode:
`npm start`
