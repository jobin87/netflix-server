import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

// Swagger Options
 const swaggerOptions: swaggerJsDoc.Options = {
  swaggerDefinition: {
    openapi:"3.0.0",
    info: {
      title: 'Admin API',
      version: '1.0.0',
      description: 'Admin API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:5003',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Point to the TypeScript route files
  
};

// Serve Swagger UI
const swaggerDocs = swaggerJsDoc(swaggerOptions);

/**
 * Function to setup Swagger in the app
 * @param app Express application instance
 */
export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Swagger documentation is available at http://localhost:5003/api-docs');
};

