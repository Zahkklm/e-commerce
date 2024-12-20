const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'Automatically generated API documentation',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./app.js']; 

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./app.js'); 
});
