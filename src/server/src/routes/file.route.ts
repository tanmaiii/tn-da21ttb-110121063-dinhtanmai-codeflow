import { FileController } from '@/controllers/file.controller';
import UploadMiddleware from '@/middlewares/upload.middlewate';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';

export class FileRoute implements Routes {
  public router = Router();
  public file = new FileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/upload', AuthMiddleware, UploadMiddleware, this.file.upload);
    this.router.get('/avatar/:name', this.file.avatar);
  }
}
