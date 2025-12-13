import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error ('Please add your MONGO_URI to .env.local');
  }

  if (mongoose.connection.readyState === 1) return;

  try {
    const conn = await mongoose.connect (process.env.MONGO_URI);
    console.log (`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error (`Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
