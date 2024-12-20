import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import connectDB from './config/db';
import { setupSwagger } from './swagger/swaggerdoc';
import movieroutes from './routes/contentRouter';

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
setupSwagger(app)

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1',movieroutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
