import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import authRoutes from './server/routes/auth';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrismart';
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

  app.use('/api/auth', authRoutes);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root: 'dist' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
