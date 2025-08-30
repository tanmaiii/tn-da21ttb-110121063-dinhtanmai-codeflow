import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { Notification } from '@/interfaces/notification.interface';
import { NotificationModel } from '@/models/notification.model';
import { Service } from 'typedi';
import { EmailService } from './email.service';
import { SocketService } from './socket.service';
import { UserService } from './users.service';
@Service()
export class NotificationService {
  constructor(private socketService: SocketService, private emailService: EmailService, private userService: UserService) {}

  public async findAll(): Promise<NotificationModel[]> {
    const allNotifications: NotificationModel[] = await DB.Notifications.findAll();
    return allNotifications;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: Notification[] }> {
    const { count, rows }: { count: number; rows: Notification[] } = await DB.Notifications.findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findAndCountAllWithPaginationByUserId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    userId: string,
    isRead?: boolean,
  ): Promise<{ count: number; rows: Notification[] }> {
    const { count, rows }: { count: number; rows: Notification[] } = await DB.Notifications.findAndCountAll({
      where: {
        userId,
        ...(isRead !== undefined ? { isRead } : {}),
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'notifications.id',
    });
    return { count, rows };
  }

  public async findNotificationById(notificationId: string): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    return findNotification;
  }

  public async findNotificationsByUserId(userId: string): Promise<Notification[]> {
    const findNotifications: Notification[] = await DB.Notifications.findAll({ where: { userId } });
    return findNotifications;
  }

  public async readAllNotifications(userId: string): Promise<Notification[]> {
    const findNotifications: Notification[] = await DB.Notifications.findAll({ where: { userId, isRead: false } });
    await DB.Notifications.update({ isRead: true }, { where: { userId, isRead: false } });
    return findNotifications;
  }

  public async readNotification(notificationId: string, isRead: boolean): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    await DB.Notifications.update({ isRead }, { where: { id: notificationId } });
    return findNotification;
  }

  public async createNotification(notificationData: Partial<Notification>): Promise<Notification> {
    if (notificationData.type === ENUM_TYPE_NOTIFICATION.LIKE_POST) {
      const post = await DB.Notifications.findOne({ where: { postId: notificationData.postId, authorId: notificationData.authorId } });
      if (post) return;
    }
    const user = await this.userService.findUserById(notificationData.userId);

    const createNotificationData: Notification = await DB.Notifications.create(notificationData);

    // Gửi notification đến người dùng cụ thể nếu có userId
    if (notificationData.userId) {
      this.socketService.emitNotification(notificationData.userId, createNotificationData);
    } else {
      // Nếu không có userId thì gửi đến tất cả người dùng
      this.socketService.emitNotificationToAll(createNotificationData);
    }

    user.email && this.emailService.sendNotificationEmail(user.email, createNotificationData);

    return createNotificationData;
  }

  public async updateNotification(notificationId: string, notificationData: Partial<Notification>): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    await DB.Notifications.update(notificationData, { where: { id: notificationId } });

    const updateNotification: Notification = await DB.Notifications.findByPk(notificationId);
    return updateNotification;
  }

  public async deleteNotification(notificationId: string): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    await DB.Notifications.destroy({ where: { id: notificationId } });

    const softDeletedNotification: Notification = await DB.Notifications.findByPk(notificationId);
    return softDeletedNotification;
  }

  public async destroyNotification(notificationId: string): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId, { paranoid: false });
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    await DB.Notifications.destroy({ force: true, where: { id: notificationId } });

    return findNotification;
  }
}
