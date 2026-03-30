# pickup-delivery-service

## Purpose
Handles pickup and delivery operations for the Laundry Delivery System MVP, including:
- pickup scheduling
- delivery scheduling
- rider assignment
- delivery status updates

## Port
3003

## Database
laundry_deliveries

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

## Delivery Fields
- `orderId`
- `customerId`
- `pickupAddress`
- `deliveryAddress`
- `assignedRider`
- `pickupSlot`
- `deliverySlot`
- `currentStatus`
- `notes`

## Allowed Status Values
- `scheduled`
- `pickup_pending`
- `picked_up`
- `in_transit`
- `out_for_delivery`
- `delivered`
- `cancelled`

## Available Endpoints
- GET /
- GET /health
- GET /api/deliveries
- GET /api/deliveries/:id
- POST /api/deliveries
- PATCH /api/deliveries/:id/status
- PATCH /api/deliveries/:id/assign-rider
- DELETE /api/deliveries/:id
- GET /api/deliveries/health
- GET /api-docs

## API Gateway Compatibility
This service is gateway-ready through:
- `/api/deliveries` -> `pickup-delivery-service`

## Swagger URL
http://localhost:3003/api-docs

## Environment Variables
Copy `.env.example` to `.env` and configure:
- `PORT=3003`
- `SERVICE_NAME=pickup-delivery-service`
- `MONGODB_URI=mongodb://127.0.0.1:27017/laundry_deliveries`
- `NODE_ENV=development`
- `DB_RETRY_INTERVAL_MS=15000`

## How To Run
1. Install dependencies:
`npm install`
2. Start in development mode:
`npm run dev`
3. Start in production mode:
`npm start`
