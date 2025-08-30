import { RequestWithUser } from '@/interfaces/auth.interface';
import { SonarService } from '@/services/sonar.service';
import { logger } from '@/utils/logger';
import { NextFunction, Response } from 'express';
import Container, { Service } from 'typedi';

@Service()
export class SonarController {
  private readonly sonarService: SonarService;

  constructor() {
    this.sonarService = Container.get(SonarService);
  }
  public createProject = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body;
      const project = await this.sonarService.createProject(name);
      res.status(201).json({
        message: 'create sonar project success',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteProject = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body;
      await this.sonarService.deleteProject(name);
      res.status(200).json({
        message: 'delete sonar project success',
      });
    } catch (error) {
      next(error);
    }
  };

  public getMeasures = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.params;
      logger.info(`[Sonar Controller] Measures: ${name}`);
      const measures = await this.sonarService.getMeasures(name);
      res.status(200).json({
        message: 'get sonar measures success',
        data: measures,
      });
    } catch (error) {
      next(error);
    }
  };
}
