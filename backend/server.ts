// Express Server - NOT RUNNING, NOT CONNECTED TO FRONTEND
// This is a template for when GTE mainnet launches

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './api/routes';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// ========================================
// MIDDLEWARE
// ========================================

// Security headers
app.use(helmet());

// CORS - Allow frontend to connect
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ========================================
// ROUTES
// ========================================

app.use('/api', routes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'GTE Insight Backend',
    version: '1.0.0',
    status: 'ready',
    message: 'Backend ready but NOT connected to frontend. Waiting for GTE mainnet.',
    endpoints: {
      health: '/api/health',
      metrics: {
        kpi: '/api/metrics/kpi',
        charts: '/api/metrics/charts',
        realtime: '/api/metrics/realtime'
      },
      events: {
        all: '/api/events',
        launchpad: '/api/events/launchpad',
        trades: '/api/events/trades',
        swaps: '/api/events/swaps'
      }
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    timestamp: new Date()
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    timestamp: new Date()
  });
});

// ========================================
// START SERVER (COMMENTED OUT)
// ========================================

// Uncomment when ready to connect to frontend
/*
app.listen(PORT, () => {
  console.log(`🚀 GTE Insight Backend running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`⚠️  Currently NOT connected to frontend`);
  console.log(`⏳ Waiting for GTE mainnet launch...`);
});
*/

console.log('⚠️  Backend server is NOT running');
console.log('📝 Backend code is ready but not started');
console.log('🔗 Frontend still uses mock data');
console.log('⏳ Will connect when GTE mainnet launches');

export default app;


