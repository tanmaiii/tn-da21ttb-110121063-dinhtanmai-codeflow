import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { CreateNotificationDto } from '@/dtos/notification.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { NotificationService } from '@/services/notification.service';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';

export class NotificationController {
  public notification = Container.get(NotificationService);

  public getNotifications = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const notifications = await this.notification.findAndCountAllWithPagination(10, 0);
      res.status(200).json({ data: notifications, message: 'getNotifications' });
    } catch (error) {
      next(error);
    }
  };

  public getNotificationsByUserId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', isRead } = req.query;
      const { rows, count } = await this.notification.findAndCountAllWithPaginationByUserId(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        userId,
        isRead !== undefined ? (isRead === 'true' ? true : false) : undefined,
      );
      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public readAllNotifications = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const notifications = await this.notification.readAllNotifications(userId);
      res.status(200).json({ data: notifications, message: 'readAllNotifications' });
    } catch (error) {
      next(error);
    }
  };

  public readNotification = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notificationId = req.params.id;
      const isRead = req.body.isRead;
      const notification = await this.notification.readNotification(notificationId, isRead);
      res.status(200).json({ data: notification, message: 'readNotification' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNotification = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notificationId = req.params.id;

      await this.notification.deleteNotification(notificationId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public createNotification = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notificationData: CreateNotificationDto = req.body;
      const userId = req.user.id;
      const notification = await this.notification.createNotification({
        ...notificationData,
        type: notificationData.type as ENUM_TYPE_NOTIFICATION,
        userId: userId,
      });
      res.status(201).json({ data: notification, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
