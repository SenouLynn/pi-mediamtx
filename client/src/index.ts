import express, { NextFunction, Request, Response } from 'express';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3050', 10);
const HOST: string = process.env.HOST || 'localhost';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic logging middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Types for our API responses
interface HealthResponse {
  status: string;
  service: string;
  uptime: number;
  timestamp: string;
}

interface WelcomeResponse {
  message: string;
  timestamp: string;
  version: string;
}

interface TestServerResponse {
  message: string;
  serverUrl: string;
  note: string;
}

interface ErrorResponse {
  error: string;
  message: string;
}

// Routes
app.get('/', (req: Request, res: Response<WelcomeResponse>): void => {
  res.json({
    message: 'Welcome to Pi MediaMTX Client!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (req: Request, res: Response<HealthResponse>): void => {
  res.json({
    status: 'healthy',
    service: 'pi-mediamtx-client',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Test route to communicate with the Go server
app.get('/test-server', async (req: Request, res: Response<TestServerResponse | ErrorResponse>): Promise<void> => {
  try {
    const serverUrl: string = process.env.SERVER_URL || 'http://localhost:8080';
    
    // For now, just return the URL we would connect to
    // In a real scenario, you'd use fetch or axios to make the request
    res.json({
      message: 'Server connection test',
      serverUrl,
      note: 'This would normally make a request to the Go server'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      error: 'Failed to connect to server',
      message: errorMessage
    });
  }
});

// 404 handler
app.use((req: Request, res: Response<ErrorResponse>): void => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, HOST, (): void => {
  console.log(`🚀 Pi MediaMTX Client server running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Process ID: ${process.pid}`);
});