import express from 'express';
import { db } from './db/config';
import helmet from 'helmet';
import cors from 'cors';
import Logger from './libs/logger';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routes/AuthRouter';

const app = express();
const port = 3000;

// Test database connection
db.authenticate()
  .then(async () => {
    Logger.info('Connected to the PostgreSQL database!');
  })
  .catch((error) => {
    Logger.error('Unable to connect to the database:', error);
  });

// Add JSON middleware to parse incoming requests
app.use(express.json());
// Use Helmet to secure Express app by setting various HTTP headers
app.use(helmet());
// Enable CORS with various options
app.use(cors());

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'API documentation for my Express application',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes configuration
app.use('/api/v1/auth', authRouter);

// Start the server and export the server instance
const server = app.listen(port, () => {
  Logger.info(`Server is running on http://localhost:${port}`);
});

// Export both the app and the server for testing later
export { app, server };
