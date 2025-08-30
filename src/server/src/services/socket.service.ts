import { Notification } from '@/interfaces/notification.interface';
import { logger } from '@/utils/logger';
import { Server, Socket } from 'socket.io';
import { Service } from 'typedi';

@Service()
export class SocketService {
  private io: Server;
  private userSockets: Map<string, Socket[]> = new Map();
  private onlineUsers: Set<string> = new Set();

  public initialize(io: Server) {
    this.io = io;
    this.setupSocketHandlers();
  }

  private setupSocketHandlers() {
    this.io.on('connection', (socket: Socket) => {
      logger.info(`[🚀SOCKET🚀] Client connected: ${socket.id}`);

      // Handle user authentication and store socket
      socket.on('authenticate', (userId: string) => {
        this.addUserSocket(userId, socket);
        logger.info(`[🚀SOCKET🚀] User ${userId} authenticated with socket ${socket.id}`);

        // Emit online status update to all clients
        this.broadcastOnlineUsers();
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        const userId = this.removeUserSocket(socket);
        logger.info(`[🚀SOCKET🚀] Client disconnected: ${socket.id}`);

        // Nếu user đã disconnect thì gửi danh sách người dùng đang online đến tất cả client
        if (userId) {
          this.broadcastOnlineUsers();
        }
      });
    });
  }

  // Thêm user vào danh sách người dùng đang online
  private addUserSocket(userId: string, socket: Socket) {
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, []);
    }
    this.userSockets.get(userId)?.push(socket);

    // Add user to online users set
    this.onlineUsers.add(userId);
  }

  // Xóa user khỏi danh sách người dùng đang online
  private removeUserSocket(socket: Socket): string | null {
    for (const [userId, sockets] of this.userSockets.entries()) {
      const index = sockets.findIndex(s => s.id === socket.id);
      if (index !== -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          this.userSockets.delete(userId);
          this.onlineUsers.delete(userId);
          return userId; // Return userId when user is completely disconnected
        }
        return null; // User still has other connections
      }
    }
    return null;
  }

  public emitNotification(userId: string, notification: Notification) {
    logger.info(`[🚀SOCKET🚀] ${userId}`);
    const userSockets = this.userSockets.get(userId);
    if (userSockets) {
      userSockets.forEach(socket => {
        logger.info(`[🚀SOCKET🚀] Emitting notification to user ${userId} with socket ${socket.id}`);
        socket.emit('new_notification', notification);
      });
    }
  }

  public emitNotificationToAll(notification: Notification) {
    logger.info(`[🚀SOCKET🚀] Emitting notification to all users`);
    this.io.emit('new_notification', notification);
  }

  // Lấy danh sách người dùng đang online
  public getOnlineUsers(): string[] {
    return Array.from(this.onlineUsers);
  }

  // Kiểm tra user có online không
  public isUserOnline(userId: string): boolean {
    return this.onlineUsers.has(userId);
  }

  // Gửi danh sách người dùng đang online đến tất cả client
  private broadcastOnlineUsers() {
    const onlineUsersList = this.getOnlineUsers();
    logger.info(`[🚀SOCKET🚀] Broadcasting online users: ${onlineUsersList.length} users online`);
    this.io.emit('online_users_updated', onlineUsersList);
  }

  // Gửi trạng thái online/offline của user đến tất cả client
  public emitUserOnlineStatus(userId: string, isOnline: boolean) {
    logger.info(`[🚀SOCKET🚀] User ${userId} is now ${isOnline ? 'online' : 'offline'}`);
    this.io.emit('user_status_changed', { userId, isOnline });
  }
}
