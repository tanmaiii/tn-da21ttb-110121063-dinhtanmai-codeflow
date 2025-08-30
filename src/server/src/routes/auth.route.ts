import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, CreateUserGithubDto, LoginUserDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', ValidationMiddleware(CreateUserDto), this.auth.signUp);
    this.router.post('/login', ValidationMiddleware(LoginUserDto), this.auth.logIn);
    this.router.post('/loginWithGithub', ValidationMiddleware(CreateUserGithubDto), this.auth.loginWithGithub);
    this.router.get('/checkJoinOrganization', AuthMiddleware, this.auth.checkJoinOrganization);
    this.router.get('/info', AuthMiddleware, this.auth.getInfoUser);
    this.router.post('/logout', AuthMiddleware, this.auth.logOut);
    this.router.post('/forgot-password', ValidationMiddleware(ForgotPasswordDto), this.auth.forgotPassword);
    this.router.post('/reset-password', ValidationMiddleware(ResetPasswordDto), this.auth.resetPassword);
    this.router.post('/change-password', AuthMiddleware, ValidationMiddleware(ChangePasswordDto), this.auth.changePassword);
  }
}
