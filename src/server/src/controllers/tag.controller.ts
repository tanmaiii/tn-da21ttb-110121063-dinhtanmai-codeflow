import { ENUM_USER_ROLE } from '@/data/enum';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { Tag } from '@/interfaces/tags.interface';
import { TagService } from '@/services/tag.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class TagController {
  public tag = Container.get(TagService);

  public getTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allTagsData: Tag[] = await this.tag.findAll();
      res.status(200).json({ data: allTagsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllTags = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const isAdmin = req.user.role === ENUM_USER_ROLE.ADMIN;
      const { count, rows } = await this.tag.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.query.search as string,
        isAdmin,
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

  public getTagById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const findOneTagData: Tag = await this.tag.findTagById(tagId);
      res.status(200).json({ data: findOneTagData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTag = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const tagData: Partial<Tag> = req.body;

      const createTagData: Tag = await this.tag.createTag({
        ...tagData,
      });

      res.status(201).json({ data: createTagData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTag = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const tagData: Partial<Tag> = req.body;
      const updateTagData: Tag = await this.tag.updateTag(tagId, {
        ...tagData,
      });
      res.status(200).json({ data: updateTagData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const deleteTagData: Tag = await this.tag.deleteTag(tagId);
      res.status(200).json({ data: deleteTagData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public destroyTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const destroyTagData: Tag = await this.tag.destroyTag(tagId);
      res.status(200).json({ data: destroyTagData, message: 'destroyed' });
    } catch (error) {
      next(error);
    }
  };

  public restoreTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagId = req.params.id;
      const restoreTagData: Tag = await this.tag.restoreTag(tagId);
      res.status(200).json({ data: restoreTagData, message: 'restored' });
    } catch (error) {
      next(error);
    }
  };
}
