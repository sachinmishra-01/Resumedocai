import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Configure dotenv to read variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from your environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error and exit the application if the connection fails
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;