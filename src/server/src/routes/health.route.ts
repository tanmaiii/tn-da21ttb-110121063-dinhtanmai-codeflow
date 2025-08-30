import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

export class HealthRoute implements Routes {
  public path = '/health';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.checkHealth);
  }

  private checkHealth = (req, res) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      message: 'Service is healthy'
    });
  };
}
