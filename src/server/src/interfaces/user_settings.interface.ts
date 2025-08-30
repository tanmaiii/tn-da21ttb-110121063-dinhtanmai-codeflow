export interface UserSettings {
  id: string;
  userId: string;
  receiveEmail: boolean; // Nhận email
  receivePush: boolean; // Nhận push
  securityAlerts: boolean; // Nhận warning security
  projectUpdates: boolean; // Nhận update project
  onlineStatus: boolean; // Hiển thị online status
  warningLogin: boolean; // Nhận warning login
}
