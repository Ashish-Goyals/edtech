import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    throw new Error('Please add your MONGO_URI to .env.local');
  }

  // Check if already connected
  if (mongoose.connection.readyState === 1) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      throw error;
    } else {
      console.error('Unknown error', error);
      throw new Error('Unknown error connecting to MongoDB');
    }
  }
};

export default connectDB;
