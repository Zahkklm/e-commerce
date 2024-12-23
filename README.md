# E-Commerce Platform

Full-stack microservices e-commerce application with React frontend and Node.js backend services.

## Architecture

```
graph TD
    A[Frontend] --> B[Backend API]
    B --> C[MongoDB]
    B --> D[Payment Service]
    B --> E[Invoice Service]
    D --> F[Kafka]
    F --> E
```


```
ecommerce/
├── frontend/
├── backend/
├── microservices/
│   ├── payment-service/
│   └── invoice-service/
└── docker-compose.yml
```

Docker file:

```
version: '3'
services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    
  backend:
    build: ./backend
    ports:
      - "5000:5000"
      
  payment:
    build: ./microservices/payment-service
    ports:
      - "3001:3001"
      
  invoice:
    build: ./microservices/invoice-service
    ports:
      - "3002:3002"
      
  kafka:
    image: wurstmeister/kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: localhost
      
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
      
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
```