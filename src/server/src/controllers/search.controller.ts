import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

export class SearchController {
  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req.query;
    } catch (error) {
      next(error);
    }
  };
}
