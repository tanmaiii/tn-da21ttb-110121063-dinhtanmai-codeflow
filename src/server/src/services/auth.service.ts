import { ENUM_USER_ROLE, ENUM_USER_STATUS } from '@/data/enum';
import { HttpException } from '@/exceptions/HttpException';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { ChangePasswordDto, CreateUserDto, CreateUserGithub, ForgotPasswordDto, LoginUserDto, ResetPasswordDto } from '@dtos/users.dto';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { compare, hash } from 'bcrypt';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { EmailService } from './email.service';
import { GitHubService } from './github.service';
import { UserSettingsService } from './user_settings.service';
import { UserService } from './users.service';

export const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { user: user };
  const expiresIn: number = 60 * 60 * 24;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

export const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  constructor(
    private githubService: GitHubService,
    private userService: UserService,
    private userSettingsService: UserSettingsService,
    private emailService: EmailService,
  ) {}

  public async createToken(user: User): Promise<TokenData> {
    return createToken(user);
  }

  public async createCookie(tokenData: TokenData): Promise<string> {
    return createCookie(tokenData);
  }

  public async loginWithGithub({
    userBody,
    email,
    uid,
  }: {
    userBody: CreateUserGithub;
    email: string;
    uid: string;
  }): Promise<{ tokenData: TokenData; findUser: User }> {
    const findUser: User = await DB.Users.findOne({ where: { email } });

    const checkUserInOrganization = await this.githubService.checkUserInOrganization(userBody.login);

    if (findUser) {
      const tokenData = createToken(findUser);
      // const cookie = createCookie(tokenData);

      if (checkUserInOrganization) {
        findUser.status = ENUM_USER_STATUS.ACTIVE;
        await DB.Users.update({ status: ENUM_USER_STATUS.ACTIVE }, { where: { id: findUser.id } });
      } else {
        findUser.status = ENUM_USER_STATUS.INACTIVE;
        await DB.Users.update({ status: ENUM_USER_STATUS.INACTIVE }, { where: { id: findUser.id } });
        await this.githubService.inviteUserToOrganization(userBody.login);
      }

      return { tokenData, findUser };
    }

    //Mời vào org
    if (!checkUserInOrganization) await this.githubService.inviteUserToOrganization(userBody.login);

    const createUserData: User = await DB.Users.create({
      email: email,
      password: null,
      name: userBody.name ?? userBody.login,
      username: userBody.login,
      uid: uid,
      role: ENUM_USER_ROLE.USER,
      status: checkUserInOrganization ? ENUM_USER_STATUS.ACTIVE : ENUM_USER_STATUS.INACTIVE,
      avatar: userBody.avatar_url,
    });

    const tokenData = createToken(createUserData);
    // const cookie = createCookie(tokenData);

    return { tokenData, findUser: createUserData };
  }

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);

    const newUser: User = {
      ...userData,
      password: hashedPassword,
      username: new Date().getTime().toString(),
    };

    const createUserData: User = await DB.Users.create(newUser);

    return createUserData;
  }

  public async checkJoinOrganization(id: string): Promise<User> {
    const findUser: User = await DB.Users.findByPk(id);
    if (!findUser) throw new HttpException(409, `This user ${id} was not found`);

    const checkUserInOrganization = await this.githubService.checkUserInOrganization(findUser.username);

    if (checkUserInOrganization) {
      findUser.status = ENUM_USER_STATUS.ACTIVE;
      await DB.Users.update({ status: ENUM_USER_STATUS.ACTIVE }, { where: { id: findUser.id } });
    }

    return findUser;
  }

  public async login(userData: LoginUserDto): Promise<{ tokenData: TokenData; findUser: User }> {
    const findUser: User = await DB.Users.scope('withPassword').findOne({
      where: { email: userData.email },
    });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);
    //FIXME: Tạm ẩn
    // if (findUser.uid) throw new HttpException(409, `The account ${userData.email} is linked to Github. Please login with Github`);

    if (!findUser.password) throw new HttpException(409, `The account ${userData.email} is linked to Github. Please login with Github`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = createToken(findUser);
    // const cookie = createCookie(tokenData);

    return { tokenData, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { id: userData.id } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async forgotPassword(forgotPasswordData: ForgotPasswordDto): Promise<{ message: string }> {
    const findUser: User = await DB.Users.findOne({ where: { email: forgotPasswordData.email } });
    if (!findUser) throw new HttpException(404, `User with email ${forgotPasswordData.email} not found`);

    // Tạo reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 giờ

    // Cập nhật user với reset token
    await DB.Users.update(
      {
        resetToken,
        resetTokenExpires,
      },
      { where: { id: findUser.id } },
    );

    // Gửi email reset password
    await this.emailService.sendPasswordResetEmail(findUser.email, resetToken);

    return { message: 'Password reset email sent successfully' };
  }

  public async resetPassword(resetPasswordData: ResetPasswordDto): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordData;

    const findUser: User = await DB.Users.findOne({
      where: {
        resetToken: token,
      },
    });

    if (!findUser) throw new HttpException(400, 'Invalid reset token');

    // Kiểm tra token có hết hạn không
    if (findUser.resetTokenExpires && findUser.resetTokenExpires < new Date()) {
      throw new HttpException(400, 'Reset token has expired');
    }

    // Hash password mới
    const hashedPassword = await hash(newPassword, 10);

    // Cập nhật password và xóa reset token
    await DB.Users.update(
      {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
      { where: { id: findUser.id } },
    );

    return { message: 'Password reset successfully' };
  }

  public async changePassword(userId: string, changePasswordData: ChangePasswordDto): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordData;

    const findUser: User = await DB.Users.scope('withPassword').findByPk(userId);
    if (!findUser) throw new HttpException(404, 'User not found');

    if (!findUser.password) {
      const hashedNewPassword = await hash(newPassword, 10);
      await DB.Users.update({ password: hashedNewPassword }, { where: { id: userId } });

      return { message: 'Password changed successfully' };
    }

    // Kiểm tra mật khẩu hiện tại
    const isCurrentPasswordValid = await compare(currentPassword, findUser.password);
    if (!isCurrentPasswordValid) throw new HttpException(400, 'Current password is incorrect');

    // Hash password mới
    const hashedNewPassword = await hash(newPassword, 10);

    // Cập nhật password
    await DB.Users.update({ password: hashedNewPassword }, { where: { id: userId } });

    return { message: 'Password changed successfully' };
  }
}
