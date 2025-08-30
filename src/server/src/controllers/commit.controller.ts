import { RequestWithUser } from '@/interfaces/auth.interface';
import { CommitService } from '@/services/commit.service';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class CommitController {
  public commitService = Container.get(CommitService);

  public getAllCommitByRepoId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', authorId } = req.query;
      const { count, rows } = await this.commitService.findByRepoIdOrAuthorId(
        Number(page),
        Number(limit),
        String(sortBy ?? ''),
        String(order ?? 'DESC') as 'ASC' | 'DESC',
        id,
        authorId ? String(authorId) : undefined,
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(Number(count) / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };
}
