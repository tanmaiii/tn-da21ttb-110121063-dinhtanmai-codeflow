import { config } from 'dotenv';
// Load environment variables first
config();

import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CodeAnalysisRoute } from './routes/code_analysis.route';
import { CommentRoute } from './routes/comment.route';
import { CommitRoute } from './routes/commit.route';
import { CourseRoute } from './routes/courses.route';
import { DashboardRoute } from './routes/dashboard.route';
import { FileRoute } from './routes/file.route';
import { GeminiRoute } from './routes/gemini.route';
import { GitHubRoute } from './routes/github.route';
import { HealthRoute } from './routes/health.route';
import { NotificationRoute } from './routes/notification.route';
import { PostRoute } from './routes/posts.route';
import { PullRequestsRoute } from './routes/pull_requests.route';
import { ReposRoute } from './routes/repos.route';
import { ReviewsAIRoute } from './routes/reviews_ai.route';
import { SearchRoute } from './routes/search.route';
import { SonarRoute } from './routes/sonar.route';
import { SystemSettingsRoute } from './routes/system_settings.route';
import { TagRoute } from './routes/tags.route';
import { TopicRoute } from './routes/topic.route';
import { TopicEvaluationRoute } from './routes/topic_evaluation.route';
import { UserSettingsRoute } from './routes/user_settings.route';
ValidateEnv();

// Test with minimal routes to debug
const app = new App([
  new HealthRoute(),
  new AuthRoute(),
  new UserRoute(),
  new UserSettingsRoute(),
  new SystemSettingsRoute(),
  new CourseRoute(),
  new FileRoute(),
  new PostRoute(),
  new TagRoute(),
  new CommentRoute(),
  new TopicRoute(),
  new TopicEvaluationRoute(),
  new GitHubRoute(),
  new NotificationRoute(),
  new SearchRoute(),
  new ReposRoute(),
  new GeminiRoute(),
  new SonarRoute(),
  new CodeAnalysisRoute(),
  new CommitRoute(),
  new PullRequestsRoute(),
  new ReviewsAIRoute(),
  new DashboardRoute(),
]);

app.listen();
