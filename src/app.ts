// src/app.ts (no changes needed)
import express, { Application } from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import urlRoutes from './routes/urlRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', urlRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});