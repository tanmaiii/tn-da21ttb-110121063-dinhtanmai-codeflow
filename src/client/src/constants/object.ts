import {
  ENUM_FRAMEWORK,
  ENUM_LANGUAGE,
  ENUM_METRICS_CODE_ANALYSIS,
  ENUM_STATUS_TOPIC,
  ENUM_TYPE_COURSE,
  ENUM_TYPE_NOTIFICATION,
  ROLE,
} from './enum';

export interface IStatusObj {
  value: string;
  labelKey: string; // Changed from label to labelKey for i18n
}

// Utility function to get localized label
export const getLocalizedLabel = (obj: IStatusObj, t: (key: string) => string): string => {
  return t(obj.labelKey);
};

export const STATUS_TOPIC: IStatusObj[] = [
  {
    value: ENUM_STATUS_TOPIC.PENDING,
    labelKey: 'topic.pending',
  },
  {
    value: ENUM_STATUS_TOPIC.APPROVED,
    labelKey: 'topic.approved',
  },
  {
    value: ENUM_STATUS_TOPIC.REJECTED,
    labelKey: 'topic.rejected',
  },
];

export const STATUS_TOPIC_CUSTOM: IStatusObj[] = [
  {
    value: 'custom',
    labelKey: 'topic.custom',
  },
  {
    value: 'suggest',
    labelKey: 'topic.suggest',
  },
];

export const STATUS_HIDDEN: IStatusObj[] = [
  {
    value: 'hidden',
    labelKey: 'common.hidden',
  },
  {
    value: 'visible',
    labelKey: 'common.visible',
  },
];

export const STATUS_COURSE: IStatusObj[] = [
  {
    value: 'not_started',
    labelKey: 'course.notStarted',
  },
  {
    value: 'registering',
    labelKey: 'course.registering',
  },
  {
    value: 'started',
    labelKey: 'course.started',
  },
  {
    value: 'finished',
    labelKey: 'course.finished',
  },
];

export const ROLE_USER: IStatusObj[] = [
  {
    value: ROLE.USER,
    labelKey: 'role.user',
  },
  {
    value: ROLE.ADMIN,
    labelKey: 'role.admin',
  },
  {
    value: ROLE.TEACHER,
    labelKey: 'role.teacher',
  },
];

export const TYPE_COURSE: IStatusObj[] = [
  {
    value: ENUM_TYPE_COURSE.MAJOR,
    labelKey: 'course.type.major',
  },
  {
    value: ENUM_TYPE_COURSE.FOUNDATION,
    labelKey: 'course.type.foundation',
  },
  {
    value: ENUM_TYPE_COURSE.THESIS,
    labelKey: 'course.type.thesis',
  },
  {
    value: ENUM_TYPE_COURSE.ELECTIVE,
    labelKey: 'course.type.elective',
  },
];

export const ROLE_TOPIC: IStatusObj[] = [
  {
    value: 'leader',
    labelKey: 'topic.role.leader',
  },
  {
    value: 'member',
    labelKey: 'topic.role.member',
  },
];

export const NOTIFICATION_TYPE: IStatusObj[] = [
  {
    value: ENUM_TYPE_NOTIFICATION.TOPIC_EVALUATION,
    labelKey: 'notification.type.topicEvaluation',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.COMMENT,
    labelKey: 'notification.type.comment',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.COMMENT_REPLY,
    labelKey: 'notification.type.commentReply',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.LIKE_POST,
    labelKey: 'notification.type.likePost',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.JOIN_COURSE,
    labelKey: 'notification.type.joinCourse',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.REGISTER_TOPIC,
    labelKey: 'notification.type.registerTopic',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.APPROVE_TOPIC,
    labelKey: 'notification.type.approveTopic',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.REJECT_TOPIC,
    labelKey: 'notification.type.rejectTopic',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.SYSTEM,
    labelKey: 'notification.type.system',
  },
];

export const LANGUAGE_TYPE = {
  [ENUM_LANGUAGE.JAVASCRIPT_TYPESCRIPT]: [
    ENUM_FRAMEWORK.EXPRESS,
    ENUM_FRAMEWORK.REACT,
    ENUM_FRAMEWORK.NEXTJS,
    ENUM_FRAMEWORK.NESTJS,
    ENUM_FRAMEWORK.NODEJS,
  ],
  [ENUM_LANGUAGE.PYTHON]: [ENUM_FRAMEWORK.DJANGO, ENUM_FRAMEWORK.FLASK],
  [ENUM_LANGUAGE.JAVA]: [ENUM_FRAMEWORK.SPRING_BOOT],
  // [ENUM_LANGUAGE.DOTNET]: [ENUM_FRAMEWORK.ASP_NET],
  [ENUM_LANGUAGE.PHP]: [ENUM_FRAMEWORK.LARAVEL],
  [ENUM_LANGUAGE.STATIC]: [ENUM_FRAMEWORK.HTML],
};

export const METRICS_CODE_ANALYSIS: IStatusObj[] = [
  {
    value: ENUM_METRICS_CODE_ANALYSIS.ALERT_STATUS,
    labelKey: 'codeAnalysis.metrics.alert_status',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.BUGS,
    labelKey: 'codeAnalysis.metrics.bugs',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.VULNERABILITIES,
    labelKey: 'codeAnalysis.metrics.vulnerabilities',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS_REVIEWED,
    labelKey: 'codeAnalysis.metrics.security_hotspots_reviewed',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.CODE_SMELLS,
    labelKey: 'codeAnalysis.metrics.code_smells',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.SQALE_INDEX,
    labelKey: 'codeAnalysis.metrics.sqale_index',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.SQALE_RATING,
    labelKey: 'codeAnalysis.metrics.sqale_rating',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.RELIABILITY_RATING,
    labelKey: 'codeAnalysis.metrics.reliability_rating',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.SECURITY_RATING,
    labelKey: 'codeAnalysis.metrics.security_rating',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS,
    labelKey: 'codeAnalysis.metrics.security_hotspots',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.SECURITY_REVIEW_RATING,
    labelKey: 'codeAnalysis.metrics.security_review_rating',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.COVERAGE,
    labelKey: 'codeAnalysis.metrics.coverage',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.LINE_COVERAGE,
    labelKey: 'codeAnalysis.metrics.line_coverage',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.UNCOVERED_LINES,
    labelKey: 'codeAnalysis.metrics.uncovered_lines',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.LINES_TO_COVER,
    labelKey: 'codeAnalysis.metrics.lines_to_cover',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_LINES_DENSITY,
    labelKey: 'codeAnalysis.metrics.duplicated_lines_density',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_BLOCKS,
    labelKey: 'codeAnalysis.metrics.duplicated_blocks',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_LINES,
    labelKey: 'codeAnalysis.metrics.duplicated_lines',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.COMPLEXITY,
    labelKey: 'codeAnalysis.metrics.complexity',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.COGNITIVE_COMPLEXITY,
    labelKey: 'codeAnalysis.metrics.cognitive_complexity',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.NCLoc,
    labelKey: 'codeAnalysis.metrics.ncloc',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.FILES,
    labelKey: 'codeAnalysis.metrics.files',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.FUNCTIONS,
    labelKey: 'codeAnalysis.metrics.functions',
  },
  {
    value: ENUM_METRICS_CODE_ANALYSIS.CLASSES,
    labelKey: 'codeAnalysis.metrics.classes',
  },
];

export const STATUS_CODE_ANLYSIS: IStatusObj[] = [
  {
    value: 'completed',
    labelKey: 'codeAnalysis.completed',
  },
  {
    value: 'success',
    labelKey: 'codeAnalysis.success',
  },
  {
    value: 'failure',
    labelKey: 'codeAnalysis.failed',
  },
  {
    value: 'error',
    labelKey: 'codeAnalysis.error',
  },
  {
    value: 'pending',
    labelKey: 'codeAnalysis.pending',
  },
  {
    value: 'running',
    labelKey: 'codeAnalysis.running',
  },
];

export const STATUS_PULL_REQUEST: IStatusObj[] = [
  {
    value: 'open',
    labelKey: 'pullRequest.open',
  },
  {
    value: 'closed',
    labelKey: 'pullRequest.closed',
  },
  {
    value: 'merged',
    labelKey: 'pullRequest.merged',
  },
];
