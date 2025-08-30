import { NotificationController } from '@/controllers/notification.controller';
import { CreateNotificationDto, GetAllNotificationsDto } from '@/dtos/notification.dto';
import { AuthMiddleware, isAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class NotificationRoute implements Routes {
  public path = '/notifications';
  public router = Router();
  public notificationController = new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, AuthMiddleware);
    this.router.get(`${this.path}`, isAdmin, this.notificationController.getNotifications);
    this.router.get(`${this.path}/user`, ValidationMiddleware(GetAllNotificationsDto, 'query'), this.notificationController.getNotificationsByUserId);
    this.router.put(`${this.path}/read`, this.notificationController.readAllNotifications);
    this.router.put(`${this.path}/:id/read`, this.notificationController.readNotification);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateNotificationDto), this.notificationController.createNotification);
    this.router.delete(`${this.path}/:id`, this.notificationController.deleteNotification);
  }
}
