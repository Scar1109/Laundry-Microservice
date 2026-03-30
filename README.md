# laundry-delivery-system

## Project Overview
laundry-delivery-system is an intermediate-level microservices backend scaffold for a Laundry Delivery MVP.
It provides a clean, modular starting point for a multi-member team to implement domain features in parallel.

## Architecture Summary
- API Gateway receives client requests and proxies them to domain services.
- Domain Microservices are independently deployable services with isolated MongoDB databases.
- Each microservice includes:
  - Express app bootstrap
  - MongoDB connection setup via Mongoose
  - Health/root endpoints
  - Swagger docs at /api-docs
  - Centralized notFound and errorHandler middlewares

## Services
- api-gateway
- customer-service
- order-service
- pickup-delivery-service
- payment-service
- laundry-processing-service

## Ports
- api-gateway -> 3000
- customer-service -> 3001
- order-service -> 3002
- pickup-delivery-service -> 3003
- payment-service -> 3004
- laundry-processing-service -> 3005

## Database Names
- customer-service -> laundry_customers
- order-service -> laundry_orders
- pickup-delivery-service -> laundry_deliveries
- payment-service -> laundry_payments
- laundry-processing-service -> laundry_processing

## Startup Order
1. Start MongoDB locally.
2. Start all domain microservices (customer, order, pickup-delivery, payment, laundry-processing).
3. Start api-gateway.

## Example URLs
### Direct Service Access
- Customer: http://localhost:3001/health
- Order: http://localhost:3002/health
- Pickup & Delivery: http://localhost:3003/health
- Payment: http://localhost:3004/health
- Laundry Processing: http://localhost:3005/health
- Customer Swagger UI: http://localhost:3001/api-docs
- Order Swagger UI: http://localhost:3002/api-docs
- Pickup & Delivery Swagger UI: http://localhost:3003/api-docs
- Payment Swagger UI: http://localhost:3004/api-docs
- Laundry Processing Swagger UI: http://localhost:3005/api-docs

### Gateway Access
- Gateway health: http://localhost:3000/health
- Customer health via gateway: http://localhost:3000/api/customers/health
- Order health via gateway: http://localhost:3000/api/orders/health
- Delivery health via gateway: http://localhost:3000/api/deliveries/health
- Payment health via gateway: http://localhost:3000/api/payments/health
- Laundry health via gateway: http://localhost:3000/api/laundry/health
- Customer Swagger UI via gateway: http://localhost:3000/api/customers/api-docs
- Order Swagger UI via gateway: http://localhost:3000/api/orders/api-docs
- Delivery Swagger UI via gateway: http://localhost:3000/api/deliveries/api-docs
- Payment Swagger UI via gateway: http://localhost:3000/api/payments/api-docs
- Laundry Swagger UI via gateway: http://localhost:3000/api/laundry/api-docs
- Customer Swagger JSON via gateway: http://localhost:3000/api/customers/api-docs.json
- Order Swagger JSON via gateway: http://localhost:3000/api/orders/api-docs.json
- Delivery Swagger JSON via gateway: http://localhost:3000/api/deliveries/api-docs.json
- Payment Swagger JSON via gateway: http://localhost:3000/api/payments/api-docs.json
- Laundry Swagger JSON via gateway: http://localhost:3000/api/laundry/api-docs.json
