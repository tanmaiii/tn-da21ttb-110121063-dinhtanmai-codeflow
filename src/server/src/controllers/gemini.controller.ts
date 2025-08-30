import { GeminiService } from '@/services/gemini.service';
import { GitHubService } from '@/services/github.service';
import { ReposService } from '@/services/repos.service';
import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';

@Service()
export class GeminiController {
  public gemini = Container.get(GeminiService);
  public gitHub = Container.get(GitHubService);
  public reposService = Container.get(ReposService);

  public generateText = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prompt } = req.body;
      const result = await this.gemini.generateText(prompt);
      res.status(200).json({ data: result });
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
