import { Notification } from '@/interfaces/notification.interface';
import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';

// Utility function to get notification type display info
function getNotificationTypeInfo(type: ENUM_TYPE_NOTIFICATION) {
  const typeMap = {
    [ENUM_TYPE_NOTIFICATION.TOPIC_EVALUATION]: {
      label: 'Đánh giá chủ đề',
      className: 'evaluation',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    [ENUM_TYPE_NOTIFICATION.COMMENT]: {
      label: 'Bình luận mới',
      className: 'comment',
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    [ENUM_TYPE_NOTIFICATION.COMMENT_REPLY]: {
      label: 'Trả lời bình luận',
      className: 'reply',
      color: '#6366f1',
      bgColor: '#e0e7ff',
    },
    [ENUM_TYPE_NOTIFICATION.LIKE_POST]: {
      label: 'Lượt thích',
      className: 'like',
      color: '#ef4444',
      bgColor: '#fecaca',
    },
    [ENUM_TYPE_NOTIFICATION.JOIN_COURSE]: {
      label: 'Tham gia khóa học',
      className: 'course',
      color: '#8b5cf6',
      bgColor: '#e0e7ff',
    },
    [ENUM_TYPE_NOTIFICATION.REGISTER_TOPIC]: {
      label: 'Đăng ký chủ đề',
      className: 'register',
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    [ENUM_TYPE_NOTIFICATION.APPROVE_TOPIC]: {
      label: 'Phê duyệt chủ đề',
      className: 'approve',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    [ENUM_TYPE_NOTIFICATION.REJECT_TOPIC]: {
      label: 'Từ chối chủ đề',
      className: 'reject',
      color: '#ef4444',
      bgColor: '#fecaca',
    },
    [ENUM_TYPE_NOTIFICATION.SYSTEM]: {
      label: 'Hệ thống',
      className: 'system',
      color: '#6b7280',
      bgColor: '#f3f4f6',
    },
  };

  return typeMap[type] || typeMap[ENUM_TYPE_NOTIFICATION.SYSTEM];
}

// Utility function to get action button text based on notification type
function getActionButtonText(type: ENUM_TYPE_NOTIFICATION): string {
  const actionMap = {
    [ENUM_TYPE_NOTIFICATION.TOPIC_EVALUATION]: 'Xem đánh giá',
    [ENUM_TYPE_NOTIFICATION.COMMENT]: 'Xem bình luận',
    [ENUM_TYPE_NOTIFICATION.COMMENT_REPLY]: 'Xem trả lời',
    [ENUM_TYPE_NOTIFICATION.LIKE_POST]: 'Xem bài viết',
    [ENUM_TYPE_NOTIFICATION.JOIN_COURSE]: 'Xem khóa học',
    [ENUM_TYPE_NOTIFICATION.REGISTER_TOPIC]: 'Xem chủ đề',
    [ENUM_TYPE_NOTIFICATION.APPROVE_TOPIC]: 'Xem chủ đề',
    [ENUM_TYPE_NOTIFICATION.REJECT_TOPIC]: 'Xem chủ đề',
    [ENUM_TYPE_NOTIFICATION.SYSTEM]: 'Xem chi tiết',
  };

  return actionMap[type] || 'Xem chi tiết';
}

export function notification(
  notification: Notification,
  options?: {
    appName?: string;
    baseUrl?: string;
    logoUrl?: string;
    companyAddress?: string;
  },
) {
  const {
    appName = 'CodeFlow',
    baseUrl = 'http://localhost:3000',
    logoUrl = '',
    companyAddress = 'Trường Đại học Sư phạm Kỹ thuật TP.HCM',
  } = options || {};

  const typeInfo = getNotificationTypeInfo(notification.type);
  const actionText = getActionButtonText(notification.type);
  const actionUrl = notification.link || `${baseUrl}`;

  return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${notification.title}</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            background-color: #f8fafc;
            color: #334155;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="50" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="30" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            pointer-events: none;
        }

        .header-content {
            position: relative;
            z-index: 1;
        }

        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .header p {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }

        .content {
            padding: 40px 30px;
        }

        .notification-badge {
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 25px;
            background-color: ${typeInfo.bgColor};
            color: ${typeInfo.color};
            border: 2px solid ${typeInfo.color}20;
        }

        .notification-badge::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: ${typeInfo.color};
            margin-right: 8px;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .notification-content h2 {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            line-height: 1.3;
        }

        .notification-message {
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
            margin-bottom: 30px;
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid ${typeInfo.color};
        }

        .action-section {
            text-align: center;
            margin: 35px 0;
        }

        .action-button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            border: none;
            cursor: pointer;
        }

        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }

        .action-button:active {
            transform: translateY(0);
        }

        .info-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            border: 1px solid #e2e8f0;
        }

        .info-card h4 {
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .info-card p {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
        }

        .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer-content {
            max-width: 400px;
            margin: 0 auto;
        }

        .footer p {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .footer-links {
            margin: 20px 0;
        }

        .footer-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 15px;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .footer-links a:hover {
            color: #764ba2;
            text-decoration: underline;
        }

        .footer-note {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }

        .footer-note p {
            font-size: 12px;
            color: #9ca3af;
            margin: 5px 0;
        }

        .footer-note a {
            color: #9ca3af;
            text-decoration: underline;
        }

        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            body {
                padding: 10px;
            }

            .email-container {
                border-radius: 12px;
            }

            .header {
                padding: 30px 20px;
            }

            .header h1 {
                font-size: 24px;
            }

            .content {
                padding: 30px 20px;
            }

            .notification-content h2 {
                font-size: 20px;
            }

            .action-button {
                display: block;
                width: 100%;
                padding: 16px;
                font-size: 16px;
            }

            .footer {
                padding: 25px 20px;
            }

            .footer-links a {
                display: block;
                margin: 8px 0;
            }
        }

        @media only screen and (max-width: 480px) {
            .notification-message {
                padding: 15px;
            }

            .header {
                padding: 25px 15px;
            }

            .content {
                padding: 25px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="header-content">
                <h1>${appName}</h1>
                <p>Thông báo mới từ hệ thống</p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="content">
            <!-- Notification Type Badge -->
            <div class="notification-badge">
                ${typeInfo.label}
            </div>

            <!-- Notification Content -->
            <div class="notification-content">
                <h2>${notification.title}</h2>
                
                <div class="notification-message">
                    ${notification.message}
                </div>

                <!-- Action Button -->
                <div class="action-section">
                    <a href="${actionUrl}" class="action-button">
                        ${actionText}
                    </a>
                </div>

                <!-- Additional Info -->
                <div class="info-card">
                    <h4>Thông tin thêm</h4>
                    <p>Nhấn vào nút bên trên để xem chi tiết hoặc truy cập trực tiếp vào hệ thống.</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <p>Cảm ơn bạn đã sử dụng <strong>${appName}</strong>!</p>
                
                <div class="footer-links">
                    <a href="${baseUrl}">Trang chủ</a>
                    <a href="${baseUrl}/settings">Cài đặt</a>
                </div>

                <div class="footer-note">
                    <p>Email này được gửi tự động, vui lòng không trả lời.</p>
                    <p>Nếu bạn không muốn nhận email này, <a href="${baseUrl}/settings">hủy đăng ký tại đây</a>.</p>
                    <p>${companyAddress}</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}
