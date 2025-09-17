// server/src/app.ts
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// routes
app.use('/api', studentRoutes);

// health
app.get('/', (req, res) => res.json({ ok: true, msg: 'API running' }));

// basic error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err?.status || 500).json({ message: err?.message || 'Server error' });
});

export default app;
