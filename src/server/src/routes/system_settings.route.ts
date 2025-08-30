import { Router } from 'express';
import { SystemSettingsController } from '@/controllers/system_settings.controller';
import { CreateSystemSettingDto, UpdateSystemSettingDto, SetSettingValueDto } from '@/dtos/system_settings.dto';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class SystemSettingsRoute implements Routes {
  public path = '/system-settings';
  public router = Router();
  public systemSettings = new SystemSettingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // lấy tất cả các setting
    this.router.get(`${this.path}`, AuthMiddleware, this.systemSettings.getSettings);
    // lấy setting theo key
    this.router.get(`${this.path}/:key`, AuthMiddleware, this.systemSettings.getSettingByKey);
    // lấy value của setting theo key
    this.router.get(`${this.path}/:key/value`, AuthMiddleware, this.systemSettings.getSettingValue);
    // tạo setting
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateSystemSettingDto), this.systemSettings.createSetting);
    this.router.put(`${this.path}/:key`, AuthMiddleware, ValidationMiddleware(UpdateSystemSettingDto), this.systemSettings.updateSetting);
    this.router.put(`${this.path}/:key/value`, AuthMiddleware, ValidationMiddleware(SetSettingValueDto), this.systemSettings.setSettingValue);
    this.router.delete(`${this.path}/:key`, AuthMiddleware, this.systemSettings.deleteSetting);
  }
}
