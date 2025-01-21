import express, { Request, Response } from 'express';
import { db } from './db/config';

const app = express();
const port = 3000;

// Test database connection
db.authenticate()
  .then(async () => {
    console.log('Connected to the PostgreSQL database!');
    await db.sync({ force: false });
    console.log('All models were synchronized successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware to parse URL-encoded data with the querystring library (extended: true)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Start the server and export the server instance
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export both the app and the server for testing later
export { app, server };
