// server/src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import mongoose from 'mongoose';
import app from './app';

const PORT = Number(process.env.PORT || 5000);
const server = http.createServer(app);

async function start() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.warn('MONGO_URI not set — skipping MongoDB connection (set MONGO_URI in .env)');
    } else {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connected');
    }

    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();

// Graceful shutdown
function shutdown(signal: string) {
  console.log(`\nReceived ${signal}. Shutting down...`);
  server.close(async () => {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (e) {
      console.warn('Error disconnecting MongoDB', e);
    }
    console.log('Shutdown complete');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forcing shutdown');
    process.exit(1);
  }, 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
