import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Using the correct database name
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017/url-shortener?authSource=admin';

// Connect to MongoDB
export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB database: url-shortener');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};