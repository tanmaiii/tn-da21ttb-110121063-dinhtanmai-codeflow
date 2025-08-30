import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { SystemSettings } from '@/interfaces/system_settings.interface';
import { SystemSettingsService } from '@/services/system_settings.service';
import { CreateSystemSettingDto, UpdateSystemSettingDto, SetSettingValueDto } from '@/dtos/system_settings.dto';

export class SystemSettingsController {
  public systemSettingsService = Container.get(SystemSettingsService);

  public getSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSettingsData: SystemSettings[] = await this.systemSettingsService.findAllSettings();

      res.status(200).json({ data: findAllSettingsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSettingByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key: string = req.params.key;
      const findOneSettingData: SystemSettings = await this.systemSettingsService.findSettingByKey(key);

      res.status(200).json({ data: findOneSettingData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getSettingValue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key: string = req.params.key;
      const settingValue: any = await this.systemSettingsService.getSettingValue(key);

      res.status(200).json({ data: settingValue, message: 'getSettingValue' });
    } catch (error) {
      next(error);
    }
  };

  public createSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const settingData: CreateSystemSettingDto = req.body;
      const createSettingData: SystemSettings = await this.systemSettingsService.createSetting(settingData);

      res.status(201).json({ data: createSettingData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key: string = req.params.key;
      const settingData: UpdateSystemSettingDto = req.body;
      const updateSettingData: SystemSettings = await this.systemSettingsService.updateSetting(key, settingData);

      res.status(200).json({ data: updateSettingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public setSettingValue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key: string = req.params.key;
      const { value, type }: SetSettingValueDto = req.body;
      const updateSettingData: SystemSettings = await this.systemSettingsService.setSettingValue(key, value, type);

      res.status(200).json({ data: updateSettingData, message: 'settingValueUpdated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key: string = req.params.key;
      const deleteSettingData: SystemSettings = await this.systemSettingsService.deleteSetting(key);

      res.status(200).json({ data: deleteSettingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
