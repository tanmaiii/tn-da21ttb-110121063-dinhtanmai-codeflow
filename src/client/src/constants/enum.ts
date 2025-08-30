export enum ENUM_STATUS_TOPIC {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ENUM_STATUS_COURSE {
  PENDING = 'pending', // chưa bắt đầu
  COMPLETED = 'completed', // đã bắt đầu
}

export enum ENUM_TYPE_COURSE {
  MAJOR = 'major',
  FOUNDATION = 'foundation',
  THESIS = 'thesis',
  ELECTIVE = 'elective',
}

export enum ROLE {
  USER = 'user',
  TEACHER = 'teacher',
  ADMIN = 'admin',
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

export enum ENUM_TYPE_REPOS {
  MAJOR = 'major',
  FOUNDATION = 'foundation',
  THESIS = 'thesis',
  ELECTIVE = 'elective',
}

export enum ENUM_TYPE_SYSTEM_SETTINGS {
  GEMINI_TOKEN = 'gemini_token', // Gemini
}

export enum ENUM_LANGUAGE {
  JAVASCRIPT_TYPESCRIPT = 'Javascript/Typescript', // JavaScript/TypeScript
  PYTHON = 'Python', // Python
  JAVA = 'Java', // Java
  DOTNET = 'Dotnet', // .NET
  PHP = 'PHP', // PHP
  STATIC = 'Static', // Static
}

export enum ENUM_FRAMEWORK {
  REACT = 'React', // React
  EXPRESS = 'Express', // Express
  NEXTJS = 'Nextjs', // Nextjs
  NESTJS = 'Nestjs', // Nestjs
  NODEJS = 'Nodejs', // Nodejs
  DJANGO = 'Django', // Django
  FLASK = 'Flask', // Flask
  SPRING_BOOT = 'Spring Boot', // Spring Boot
  ASP_NET = 'ASP.NET', // ASP.NET
  LARAVEL = 'Laravel', // Laravel
  HTML = 'HTML', // HTML
}

export enum ENUM_METRICS_CODE_ANALYSIS {
  /** Điểm nóng bảo mật */
  SECURITY_HOTSPOTS = 'security_hotspots',
  /** Lỗi */
  BUGS = 'bugs',
  /** Độ tin cậy */
  RELIABILITY_RATING = 'reliability_rating',
  /** Mùi code */
  CODE_SMELLS = 'code_smells',
  /** Dòng code lặp lại */
  DUPLICATED_LINES = 'duplicated_lines',
  /** Phần trăm code được test */
  COVERAGE = 'coverage',
  /** Mật độ dòng lặp lại */
  DUPLICATED_LINES_DENSITY = 'duplicated_lines_density',
  /** Trạng thái cảnh báo */
  ALERT_STATUS = 'alert_status',
  /** Điểm nóng bảo mật đã xem xét */
  SECURITY_HOTSPOTS_REVIEWED = 'security_hotspots_reviewed',
  /** Đánh giá bảo mật */
  SECURITY_RATING = 'security_rating',
  /** Lỗi bảo mật */
  VULNERABILITIES = 'vulnerabilities',
  /** Chỉ số SQALE */
  SQALE_INDEX = 'sqale_index',
  /** Đánh giá SQALE */
  SQALE_RATING = 'sqale_rating',
  /** Đánh giá bảo mật đã xem xét */
  SECURITY_REVIEW_RATING = 'security_review_rating',
  /** Phần trăm dòng code được test */
  LINE_COVERAGE = 'line_coverage',
  /** Dòng code không được test */
  UNCOVERED_LINES = 'uncovered_lines',
  /** Dòng code cần test */
  LINES_TO_COVER = 'lines_to_cover',
  /** Khối code lặp lại */
  DUPLICATED_BLOCKS = 'duplicated_blocks',
  /** Độ phức tạp */
  COMPLEXITY = 'complexity',
  /** Độ phức tạp trí tuệ */
  COGNITIVE_COMPLEXITY = 'cognitive_complexity',
  /** Số dòng code */
  NCLoc = 'ncloc',
  /** Số file */
  FILES = 'files',
  /** Số hàm */
  FUNCTIONS = 'functions',
  /** Số lớp */
  CLASSES = 'classes',
}
