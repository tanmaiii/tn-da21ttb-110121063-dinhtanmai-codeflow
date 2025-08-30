import { EmailService } from '@/services/email.service';
import { logger } from '@/utils/logger';
import { CreateUserDto, CreateUserGithubDto, LoginUserDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { GitHubService } from '@services/github.service';
import { UserService } from '@services/users.service';
import CryptoJS from 'crypto-js';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

const decodeToken = async (token: string, secret: string) => {
  const bytes = CryptoJS.AES.decrypt(token, secret);
  const originalToken = bytes.toString(CryptoJS.enc.Utf8);
  return originalToken;
};

export class AuthController {
  private readonly auth: AuthService;
  private readonly user: UserService;
  private readonly github: GitHubService;
  private readonly email: EmailService;

  constructor() {
    this.auth = Container.get(AuthService);
    this.user = Container.get(UserService);
    this.github = Container.get(GitHubService);
    this.email = Container.get(EmailService);
  }

  public loginWithGithub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, uid, email }: CreateUserGithubDto = req.body;

      const resDecode = await decodeToken(accessToken, process.env.SECRET_KEY);

      const tokenRes = await this.github.getUserInfo(resDecode);

      logger.info(`[TOKEN GITHUB: ] ${resDecode}`);

      if (!tokenRes) {
        return new HttpException(401, 'Unauthorized');
      }

      const { tokenData, findUser } = await this.auth.loginWithGithub({ userBody: tokenRes, email, uid });

      // res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, accessToken: tokenData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.auth.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public checkJoinOrganization = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const checkInvitationUserData: User = await this.auth.checkJoinOrganization(userData.id);
      res.status(200).json({ data: checkInvitationUserData, message: 'check invitation' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { tokenData, findUser } = await this.auth.login(userData);

      // res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, accessToken: tokenData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public getInfoUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const findUserData: User = await this.user.findUserById(userData.id);

      res.status(200).json({ data: findUserData, message: 'get info user' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      // res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const forgotPasswordData: ForgotPasswordDto = req.body;
      const result = await this.auth.forgotPassword(forgotPasswordData);

      res.status(200).json({ data: result, message: 'forgot password' });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resetPasswordData: ResetPasswordDto = req.body;
      const result = await this.auth.resetPassword(resetPasswordData);

      res.status(200).json({ data: result, message: 'reset password' });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user.id;
      const changePasswordData: ChangePasswordDto = req.body;
      const result = await this.auth.changePassword(userId, changePasswordData);

      res.status(200).json({ data: result, message: 'change password' });
    } catch (error) {
      next(error);
    }
  };
}
