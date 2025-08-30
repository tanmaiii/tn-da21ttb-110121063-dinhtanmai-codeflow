import { Router } from 'express';
import { UserSettingsController } from '@controllers/user_settings.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

// DTO classes for validation
export class CreateUserSettingsDto {
  public userId!: string;
  public receiveEmail?: boolean;
  public receivePush?: boolean;
  public securityAlerts?: boolean;
  public projectUpdates?: boolean;
  public onlineStatus?: boolean;
  public warningLogin?: boolean;
}

export class UpdateUserSettingsDto {
  public receiveEmail?: boolean;
  public receivePush?: boolean;
  public securityAlerts?: boolean;
  public projectUpdates?: boolean;
  public onlineStatus?: boolean;
  public warningLogin?: boolean;
}

export class BulkUpdateDto {
  public userIds!: string[];
  public settings!: UpdateUserSettingsDto;
}

export class UserSettingsRoute implements Routes {
  public path = '/user-settings';
  public router = Router();
  public userSettingsController = new UserSettingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // User routes - Lấy settings của user hiện tại
    this.router.get(`${this.path}/me`, AuthMiddleware, this.userSettingsController.getMyUserSettings);

    // User routes - Cập nhật settings của user hiện tại
    this.router.put(`${this.path}/me`, AuthMiddleware, ValidationMiddleware(UpdateUserSettingsDto), this.userSettingsController.updateMyUserSettings);

    // User routes - Reset settings của user hiện tại về default
    this.router.post(`${this.path}/reset`, AuthMiddleware, this.userSettingsController.resetMyUserSettings);

    // Utility routes - Kiểm tra email preference
    this.router.get(`${this.path}/check/email/:userId`, AuthMiddleware, this.userSettingsController.checkCanReceiveEmail);

    // Utility routes - Kiểm tra push notification preference
    this.router.get(`${this.path}/check/push/:userId`, AuthMiddleware, this.userSettingsController.checkCanReceivePush);

    // Admin routes - Lấy tất cả user settings (Admin only - kiểm tra trong controller)
    this.router.get(`${this.path}`, AuthMiddleware, this.userSettingsController.getAllUserSettings);

    // Admin routes - Reset settings của user khác (Admin only - kiểm tra trong controller)
    this.router.post(`${this.path}/reset/:userId`, AuthMiddleware, this.userSettingsController.resetUserSettings);

    // Admin routes - Bulk update settings cho nhiều users (Admin only - kiểm tra trong controller)
    this.router.put(`${this.path}/bulk`, AuthMiddleware, ValidationMiddleware(BulkUpdateDto), this.userSettingsController.bulkUpdateSettings);

    // Generic routes - Lấy user settings theo ID
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.userSettingsController.getUserSettingsById);

    // Generic routes - Lấy user settings theo userId
    this.router.get(`${this.path}/user/:userId`, AuthMiddleware, this.userSettingsController.getUserSettingsByUserId);

    // Generic routes - Tạo user settings mới
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateUserSettingsDto), this.userSettingsController.createUserSettings);

    // Generic routes - Cập nhật user settings theo ID
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateUserSettingsDto), this.userSettingsController.updateUserSettings);

    // Generic routes - Cập nhật user settings theo userId
    this.router.put(
      `${this.path}/user/:userId`,
      AuthMiddleware,
      ValidationMiddleware(UpdateUserSettingsDto),
      this.userSettingsController.updateUserSettingsByUserId,
    );

    // Generic routes - Xóa user settings
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.userSettingsController.deleteUserSettings);
  }
}
