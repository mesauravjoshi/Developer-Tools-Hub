import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/dev_tool', {});
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection error:', error);
    throw error;
  }
}