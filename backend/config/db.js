import mongoose from 'mongoose';

export  const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL, 'Database connected successfully')
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
    throw error;
  }
};