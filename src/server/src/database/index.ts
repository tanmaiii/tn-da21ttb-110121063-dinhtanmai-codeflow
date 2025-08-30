import { initModels } from '@/models';
import CodeAnalysisModel from '@/models/code_analysis.model';
import CodeAnalysisMetricsModel from '@/models/code_analysis_metrics.model';
import CommentModel from '@/models/comments.model';
import CommitsModel from '@/models/commits.model';
import CourseDocument from '@/models/course_documents.model';
import CourseEnrollmentModel from '@/models/course_enrollment.model';
import CourseTagModel from '@/models/course_tag.model';
import CourseModel from '@/models/courses.model';
import NotificationModel from '@/models/notification.model';
import PostLikeModel from '@/models/post_like.model';
import PostTagModel from '@/models/post_tag.model';
import PostModel from '@/models/posts.model';
import PullRequestsModel from '@/models/pull_requests.model';
import ReposModel from '@/models/repos.model';
import ReviewAIModel from '@/models/reviews_ai.model';
import SystemSettingsModel from '@/models/system_settings.model';
import TagModel from '@/models/tags.model';
import TopicEvaluationsModel from '@/models/topic_evaluations.model';
import TopicMemberModel from '@/models/topic_member.model';
import TopicTagModel from '@/models/topic_tag.model';
import TopicModel from '@/models/topics.model';
import { logger } from '@/utils/logger';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV } from '@config';
import UserSettingsModel from '@models/user_settings.model';
import UserModel from '@models/users.model';
import Sequelize from 'sequelize';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    // logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

// Database connection will be tested in app.ts

export const DB = {
  Users: UserModel(sequelize),
  UserSettings: UserSettingsModel(sequelize),
  Posts: PostModel(sequelize),
  Courses: CourseModel(sequelize),
  Topics: TopicModel(sequelize),
  Comments: CommentModel(sequelize),
  Tags: TagModel(sequelize),
  CourseTag: CourseTagModel(sequelize),
  PostTag: PostTagModel(sequelize),
  TopicMember: TopicMemberModel(sequelize),
  TopicEvaluations: TopicEvaluationsModel(sequelize),
  Notifications: NotificationModel(sequelize),
  SystemSettings: SystemSettingsModel(sequelize),
  CodeAnalysis: CodeAnalysisModel(sequelize),
  CodeAnalysisMetrics: CodeAnalysisMetricsModel(sequelize),
  Commits: CommitsModel(sequelize),
  PullRequests: PullRequestsModel(sequelize),
  CourseEnrollment: CourseEnrollmentModel(sequelize),
  Repos: ReposModel(sequelize),
  PostLike: PostLikeModel(sequelize),
  CourseDocument: CourseDocument(sequelize),
  TopicTag: TopicTagModel(sequelize),
  ReviewsAI: ReviewAIModel(sequelize),
  sequelize,
};

// Temporarily disable model relationships to debug
initModels();
