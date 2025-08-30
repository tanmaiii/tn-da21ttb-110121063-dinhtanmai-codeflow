import { RequestWithUser } from '@/interfaces/auth.interface';
import { logger } from '@/utils/logger';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { SocketService } from '@services/socket.service';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search, role } = req.query;
      const { rows, count }: { rows: User[]; count: number } = await this.user.findAllUserWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        search ? String(search) : undefined,
        role ? String(role) : undefined,
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search } = req.query;
      const { rows, count }: { rows: User[]; count: number } = await this.user.findAllStudentWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        search ? String(search) : undefined,
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getMe = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findOneUserData: User = await this.user.findUserById(req.user.id);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const userData: UpdateUserDto = req.body;
      logger.info(JSON.stringify(userData));
      const updateUserData: User = await this.user.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public destroyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const destroyUserData: User = await this.user.destroyUser(userId);

      res.status(200).json({ data: destroyUserData, message: 'destroyed' });
    } catch (error) {
      next(error);
    }
  };

  public getOnlineUsers = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const socketService = Container.get(SocketService);
      const onlineUserIds = socketService.getOnlineUsers();

      // Get user details for online users
      const onlineUsers = await Promise.all(
        onlineUserIds.map(async userId => {
          try {
            return await this.user.findUserById(userId);
          } catch (error) {
            // User might be deleted but still in online list
            return null;
          }
        }),
      );

      // Filter out null values (deleted users)
      const validOnlineUsers = onlineUsers.filter(user => user !== null);

      res.status(200).json({
        success: true,
        message: 'Online users retrieved successfully',
        data: validOnlineUsers,
        count: validOnlineUsers.length,
      });
    } catch (error) {
      next(error);
    }
  };
}
