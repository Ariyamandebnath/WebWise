import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { logActivityRoute } from './routes/logActivity';
import { fetchActivitiesRoute } from './routes/fetchActivities'; // Import the fetch route

import cors from 'cors';

dotenv.config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}))
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI as string,).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/log-activity', logActivityRoute);
app.use('/fetch-activities', fetchActivitiesRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
