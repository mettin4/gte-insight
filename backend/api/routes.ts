// API Routes - Express.js routes for backend
// NOT CONNECTED TO FRONTEND YET

import express, { Router, Request, Response } from 'express';
import { metricsService } from '../services/metricsService';
import { eventsService } from '../services/eventsService';

const router: Router = express.Router();

// ========================================
// METRICS ENDPOINTS
// ========================================

/**
 * GET /api/metrics/kpi
 * Get current KPI metrics
 */
router.get('/metrics/kpi', async (req: Request, res: Response) => {
  try {
    const metrics = await metricsService.getKPIMetrics();
    res.json({
      success: true,
      data: metrics,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

/**
 * GET /api/metrics/charts
 * Get chart data for date range
 * Query params: start, end (ISO date strings)
 */
router.get('/metrics/charts', async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;
    const startDate = start ? new Date(start as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = end ? new Date(end as string) : new Date();
    
    const chartData = await metricsService.getChartData(startDate, endDate);
    res.json({
      success: true,
      data: chartData,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

/**
 * GET /api/metrics/realtime
 * Get real-time metrics (for WebSocket upgrade)
 */
router.get('/metrics/realtime', async (req: Request, res: Response) => {
  try {
    const metrics = await metricsService.getRealtimeMetrics();
    res.json({
      success: true,
      data: metrics,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

// ========================================
// EVENTS ENDPOINTS
// ========================================

/**
 * GET /api/events
 * Get all events with pagination
 * Query params: page, limit
 */
router.get('/events', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    
    const events = await eventsService.getAllEvents(page, limit);
    res.json(events);
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

/**
 * GET /api/events/launchpad
 * Get launchpad events only
 */
router.get('/events/launchpad', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    
    const events = await eventsService.getLaunchpadEvents(page, limit);
    res.json(events);
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

/**
 * GET /api/events/trades
 * Get trade events (long/short)
 * Query params: type (long|short), page, limit
 */
router.get('/events/trades', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const type = req.query.type as 'long' | 'short' | undefined;
    
    const events = await eventsService.getTradeEvents(type, page, limit);
    res.json(events);
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

/**
 * GET /api/events/swaps
 * Get swap events
 */
router.get('/events/swaps', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    
    const events = await eventsService.getSwapEvents(page, limit);
    res.json(events);
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

/**
 * GET /api/events/:id
 * Get specific event by ID
 */
router.get('/events/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await eventsService.getEventById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
        timestamp: new Date()
      });
    }
    
    res.json({
      success: true,
      data: event,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

/**
 * GET /api/events/token/:address
 * Get events for specific token
 */
router.get('/events/token/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    
    const events = await eventsService.getEventsByToken(address, page, limit);
    res.json(events);
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service not available - waiting for GTE mainnet',
      timestamp: new Date()
    });
  }
});

// ========================================
// HEALTH CHECK
// ========================================

router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'ready',
    message: 'Backend ready but not connected to frontend. Waiting for GTE mainnet.',
    timestamp: new Date()
  });
});

export default router;


