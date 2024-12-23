# E-Commerce Platform

Full-stack microservices e-commerce application with React frontend and Node.js backend services.

## Architecture

### Services
- Frontend (React) - Port 5173
- Backend API - Port 5000 
- Payment Service - Port 3001
- Invoice Service - Port 3002
- MongoDB - Port 27017
- Kafka - Port 9092
- Zookeeper - Port 2181

## Setup

### Prerequisites
- Node.js 18+
- MongoDB
- Docker & Docker Compose 

### Installation Steps

```bash
# Clone repository
git clone https://github.com/yourusername/ecommerce.git
cd ecommerce

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
cd ../microservices/payment-service && npm install 
cd ../invoice-service && npm install