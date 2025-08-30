import Container, { Service } from 'typedi';
import nodemailer from 'nodemailer';
import { logger } from '@/utils/logger';
import { IEmailOptions } from '@/interfaces/email.interface';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { Notification } from '@/interfaces/notification.interface';
import { notification as notificationTemplate } from '@/templates/email/notification';
import { UserSettingsService } from './user_settings.service';

@Service()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private userSettingsService: UserSettingsService;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    this.userSettingsService = Container.get(UserSettingsService);
  }

  /**
   * Tải template email từ file
   * @param templateName Tên template
   * @param data Dữ liệu cho template
   * @returns Nội dung template đã được compile
   */
  private async loadTemplate(templateName: string, data: any): Promise<string> {
    const templatePath = path.join(__dirname, '../templates/email', `${templateName}.hbs`);
    const template = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(data);
  }

  /**
   * Gửi email
   * @param options Thông tin email
   */
  public async sendEmail(options: IEmailOptions): Promise<void> {
    try {
      const mailOptions = {
        ...options,
        from: process.env.SMTP_FROM,
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${options.to}`);
    } catch (error) {
      logger.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Gửi email thông báo với template HTML đẹp
   * @param to Địa chỉ email người nhận
   * @param notification Thông tin thông báo
   * @param options Tùy chọn bổ sung cho template
   */
  public async sendNotificationEmail(
    to: string,
    notification: Notification,
    options?: {
      appName?: string;
      baseUrl?: string;
      logoUrl?: string;
      companyAddress?: string;
    },
  ): Promise<void> {
    try {
      const canReceiveEmail = await this.userSettingsService.canReceiveEmail(notification.userId);
      if (!canReceiveEmail) {
        return;
      }
      // Generate HTML từ template TypeScript
      const html = notificationTemplate(notification, {
        appName: options?.appName || 'CodeFlow',
        baseUrl: options?.baseUrl || process.env.FRONTEND_URL || 'http://localhost:3000',
        logoUrl: options?.logoUrl || '',
        companyAddress: options?.companyAddress || 'TVU',
      });

      await this.sendEmail({
        to,
        subject: notification.title || 'Thông báo mới từ CodeFlow',
        html,
        // Thêm text fallback cho email clients không support HTML
        text: `${notification.title}\n\n${notification.message}\n\nTruy cập: ${notification.link}`,
      });

      logger.info(`Notification email sent successfully to ${to} for notification type: ${notification.type}`);
    } catch (error) {
      logger.error(`Error sending notification email to ${to}:`, error);
      throw error;
    }
  }

  /**
   * Gửi email xác thực
   * @param to Địa chỉ email người nhận
   * @param token Mã xác thực
   */
  public async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const html = await this.loadTemplate('verification', { verificationUrl });

    await this.sendEmail({
      to,
      subject: 'Verify your email address',
      html,
    });
  }

  /**
   * Gửi email đặt lại mật khẩu
   * @param to Địa chỉ email người nhận
   * @param token Mã đặt lại mật khẩu
   */
  public async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/en/reset-password?token=${token}`;
    const html = await this.loadTemplate('password-reset', { resetUrl });

    await this.sendEmail({
      to,
      subject: 'Reset your password',
      html,
    });
  }

  /**
   * Gửi email chào mừng
   * @param to Địa chỉ email người nhận
   * @param name Tên người nhận
   */
  public async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = await this.loadTemplate('welcome', { name });

    await this.sendEmail({
      to,
      subject: 'Welcome to our platform',
      html,
    });
  }
}
