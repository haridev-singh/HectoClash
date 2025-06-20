import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import gameRoutes from './routes/game.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/game', gameRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🎮 HectoClash backend is live. You can use /api/game/check or /api/game/giveup');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server started on port ${PORT}`));
