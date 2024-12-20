const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for the project',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Replace with your base URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to route files for Swagger annotations
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
