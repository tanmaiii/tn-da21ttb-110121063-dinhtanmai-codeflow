import { GetAllQueryDto } from '@/dtos/common.dto';
import { AuthMiddleware, isAdmin, isTeacherOrAdmin } from '@/middlewares/auth.middleware';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto, GetAllUser, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, isAdmin, ValidationMiddleware(GetAllUser, 'query'), this.user.getUsers);
    this.router.get(`${this.path}/student`, isTeacherOrAdmin, ValidationMiddleware(GetAllQueryDto, 'query'), this.user.getStudents);
    this.router.get(`${this.path}/online`, AuthMiddleware, this.user.getOnlineUsers);
    this.router.get(`${this.path}/me`, AuthMiddleware, this.user.getMe);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.user.getUserById);
    this.router.post(`${this.path}`, isAdmin, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateUserDto, 'body', true), this.user.updateUser);
    this.router.put(`${this.path}/:id/delete`, isAdmin, this.user.deleteUser);
    this.router.delete(`${this.path}/:id`, isAdmin, this.user.destroyUser);
  }
}
