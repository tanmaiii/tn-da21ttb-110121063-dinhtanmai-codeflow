import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { GeminiService } from '@/services/gemini.service';
import { GitHubService } from '@/services/github.service';
import { PullRequestsService } from '@/services/pull_requests.service';
import { ReposService } from '@/services/repos.service';
import { ReviewsAIService } from '@/services/reviews_ai.service';
import { getStartLinePullRequest } from '@/utils/util';
import { NextFunction, Response } from 'express';
import Container, { Service } from 'typedi';

@Service()
export class ReviewsAIController {
  public gemini = Container.get(GeminiService);
  public gitHub = Container.get(GitHubService);
  public reposService = Container.get(ReposService);
  public pullRequestsService = Container.get(PullRequestsService);
  public reviewsAIService = Container.get(ReviewsAIService);

  public evaluatePullRequestGithub = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const { reposId, prId } = req.params;
      const pr = await this.pullRequestsService.findById(prId);
      if (!pr) throw new HttpException(404, 'Pull request not found');

      const repos = await this.reposService.findById(reposId);
      if (!repos) throw new HttpException(404, 'Repository not found');

      const prGitHub = await this.gitHub.getPullRequestDetails(repos.name, Number(pr.pullNumber));

      const result = await this.gemini.evaluateCodeWithPrompt(
        `${prGitHub.pullRequest.title}\n${prGitHub.pullRequest.body}`,
        prGitHub.files.map(content => ({
          file: content.filename,
          start_line: getStartLinePullRequest(content.patch),
          code: content.patch,
        })),
      );

      // Thêm comments vào pull request với error handling
      await Promise.allSettled(
        result.comments.map(async comment => {
          try {
            await this.gitHub.commentPullRequest(
              repos.name,
              Number(pr.pullNumber),
              comment.comment,
              prGitHub.pullRequest.head.sha,
              comment.file,
              comment.line,
            );
            return { success: true, comment: comment.comment };
          } catch (error) {
            console.error(`Failed to post comment: ${error.message}`);
            return { success: false, comment: comment.comment, error: error.message };
          }
        }),
      );

      await this.reviewsAIService.createReviewAI({
        pullRequestId: pr.id,
        authorId: user.id,
        summany: result.summary,
        score: result.score,
        comments: result.comments,
      });

      res.status(200).json({
        data: result,
      });
    } catch (error) {
      if (error.status === 503) {
        res.status(503).json({
          data: null,
          message: 'Token limit exceeded',
        });
        return;
      }
      next(error);
    }
  };
}
