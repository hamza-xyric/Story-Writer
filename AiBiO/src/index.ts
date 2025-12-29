import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import authRouter from './routes/auth.js';
import draftsRouter from './routes/drafts.js';
import captureRouter from './routes/capture.js';
import profileRouter from './routes/profile.js';
import biographerRouter from './routes/biographer.js';
import leadsRouter from './routes/leads.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logging
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/drafts', draftsRouter);
app.use('/api/capture', captureRouter);
app.use('/api/profile', profileRouter);
app.use('/api/biographer', biographerRouter);
app.use('/api/leads', leadsRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const port = parseInt(env.PORT);
app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════════╗
║           AiBiO API Server                 ║
╠════════════════════════════════════════════╣
║  Status:  Running                          ║
║  Port:    ${port.toString().padEnd(33)}║
║  Mode:    ${env.NODE_ENV.padEnd(33)}║
║  Claude:  ${env.CLAUDE_MODEL.slice(0, 30).padEnd(33)}║
╚════════════════════════════════════════════╝
  `);
});

export default app;
