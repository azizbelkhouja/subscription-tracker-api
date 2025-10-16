import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from '../config/env.js';

if(!DB_URI) {
  throw new Error('DB_URI not defined')
}

const connectToDatabase = async () => {

  try {

    await mongoose.connect(DB_URI);

    console.log(`connected to MongoDB database`);
  } catch (error) {
    console.error(`Error connecting to MongoDB database: ${error.message}`);
  }
}

export default connectToDatabase;
