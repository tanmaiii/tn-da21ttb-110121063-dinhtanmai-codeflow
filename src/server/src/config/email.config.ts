export const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  from: process.env.SMTP_FROM || 'noreply@example.com',
  templates: {
    verification: {
      subject: 'Verify your email address',
      template: 'verification',
    },
    passwordReset: {
      subject: 'Reset your password',
      template: 'password-reset',
    },
    welcome: {
      subject: 'Welcome to our platform',
      template: 'welcome',
    },
  },
};
