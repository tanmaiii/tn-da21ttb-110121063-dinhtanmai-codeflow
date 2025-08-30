import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;
  private notificationHandlers: ((notification: Notification) => void)[] = [];
  private onlineUsersHandlers: ((userIds: string[]) => void)[] = [];
  private userStatusHandlers: ((data: { userId: string; isOnline: boolean }) => void)[] = [];

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(userId: string) {
    if (this.socket?.connected) return;

    this.socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', {
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      // Xác thực user sau khi kết nối thành công
      this.socket?.emit('authenticate', userId);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Lắng nghe thông báo mới
    this.socket.on('new_notification', (notification: Notification) => {
      console.log('New notification received:', notification);
      this.notificationHandlers.forEach(handler => handler(notification));
    });

    // Lắng nghe cập nhật danh sách users online
    this.socket.on('online_users_updated', (userIds: string[]) => {
      console.log('Online users updated:', userIds);
      this.onlineUsersHandlers.forEach(handler => handler(userIds));
    });

    // Lắng nghe thay đổi status của user cụ thể
    this.socket.on('user_status_changed', (data: { userId: string; isOnline: boolean }) => {
      console.log('User status changed:', data);
      this.userStatusHandlers.forEach(handler => handler(data));
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public onNotification(handler: (notification: Notification) => void) {
    this.notificationHandlers.push(handler);
    return () => {
      this.notificationHandlers = this.notificationHandlers.filter(h => h !== handler);
    };
  }

  public onOnlineUsersUpdate(handler: (userIds: string[]) => void) {
    this.onlineUsersHandlers.push(handler);
    return () => {
      this.onlineUsersHandlers = this.onlineUsersHandlers.filter(h => h !== handler);
    };
  }

  public onUserStatusChange(handler: (data: { userId: string; isOnline: boolean }) => void) {
    this.userStatusHandlers.push(handler);
    return () => {
      this.userStatusHandlers = this.userStatusHandlers.filter(h => h !== handler);
    };
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default SocketService.getInstance(); 