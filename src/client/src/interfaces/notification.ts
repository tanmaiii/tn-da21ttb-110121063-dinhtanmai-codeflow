import { IBaseEntity } from "./common";

export interface INotification extends IBaseEntity {
    id: string;
    type: ENUM_TYPE_NOTIFICATION;
    title: string;
    message: string;
    userId?: string;
    isRead: boolean;
    link: string;
}

export enum ENUM_TYPE_NOTIFICATION {
    TOPIC_EVALUATION = 'TOPIC_EVALUATION', // Đánh giá chủ đề
    COMMENT = 'COMMENT', // Bình luận
    COMMENT_REPLY = 'COMMENT_REPLY', // Bình luận trả lời
    LIKE_POST = 'LIKE_POST', // Thích bài viết
    JOIN_COURSE = 'JOIN_COURSE', // Tham gia khóa học
    REGISTER_TOPIC = 'REGISTER_TOPIC', // Đăng ký chủ đề
    APPROVE_TOPIC = 'APPROVE_TOPIC', // Phê duyệt chủ đề
    REJECT_TOPIC = 'REJECT_TOPIC', // Từ chối chủ đề
    SYSTEM = 'SYSTEM', // Hệ thống
}