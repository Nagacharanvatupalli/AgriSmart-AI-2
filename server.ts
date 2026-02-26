import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import authRoutes from './server/routes/auth';
import diagnosisRoutes from './server/routes/diagnosis';
import adminRoutes from './server/routes/admin';
import marketRoutes from './server/routes/market';
import os from 'os';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrismart';
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

  app.use('/api/auth', authRoutes);
  app.use('/api/diagnosis', diagnosisRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/market', marketRoutes);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: true },
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
    const networkInterfaces = os.networkInterfaces();
    let localIP = 'localhost';
    for (const iface of Object.values(networkInterfaces)) {
      for (const alias of iface || []) {
        if (alias.family === 'IPv4' && !alias.internal) {
          localIP = alias.address;
          break;
        }
      }
      if (localIP !== 'localhost') break;
    }
    console.log(`  Local:   http://localhost:${PORT}`);
    console.log(`  Network: http://${localIP}:${PORT}`);
  });
}

startServer();
