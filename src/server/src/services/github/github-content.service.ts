import { GitHubContent } from '@interfaces/github.interface';
import { Service } from 'typedi';
import { GitHubBaseService } from './github-base.service';

@Service()
export class GitHubContentService extends GitHubBaseService {
  constructor() {
    super('GitHub Content Service');
  }

  /**
   * Lấy nội dung repository từ GitHub
   * @param owner Repository owner
   * @param repo Repository name
   * @param path Đường dẫn đến file hoặc thư mục
   * @returns Nội dung repository
   */
  public async getRepositoryContents(owner: string, repo: string, path: string): Promise<GitHubContent | GitHubContent[]> {
    this.logInfo('Getting repository contents', { owner, repo, path });

    return this.makeRequest<GitHubContent | GitHubContent[]>({
      method: 'GET',
      url: `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`,
    });
  }

  /**
   * Push code/nội dung vào repository
   * @param repoName Tên repository
   * @param message Commit message
   * @param content Nội dung file
   * @param path Đường dẫn file
   * @returns Thông tin commit đã tạo
   */
  public async pushCode(repoName: string, message: string, content: string, path: string): Promise<any> {
    this.logInfo('Pushing content', { repoName, message, path });

    // Encode content to base64
    const contentBase64 = Buffer.from(content).toString('base64');

    // Kiểm tra file đã tồn tại chưa
    // let sha: string | undefined;
    // try {
    //   const existingFile = await this.makeRequest<any>({
    //     method: 'GET',
    //     url: `${this.getOrgRepoUrl(repoName)}/contents/${path}`,
    //   });
    //   sha = existingFile.sha;
    // } catch (error) {
    //   // Nếu file không tồn tại, thì không cần làm gì
    //   this.logInfo('File does not exist, will create new file', { path });
    // }

    const body: any = {
      message: `Add/Update ${message}`,
      content: contentBase64,
      branch: 'main',
    };

    // Nếu file đã tồn tại, thì thêm sha để update
    // if (sha) {
    //   body.sha = sha;
    // }

    return this.makeRequest<any>({
      method: 'PUT',
      url: `${this.getOrgRepoUrl(repoName)}/contents/${path}`,
      data: body,
    });
  }

  /**
   * Xác định ngôn ngữ của repository bằng cách lấy danh sách các file trong repository
   * @param repoName Tên repository
   * @returns Ngôn ngữ của repository
   */
  //FIXME: Không sử dụng nửa
  public async detectRepoLanguage(repoName: string): Promise<string> {
    this.logInfo('Detecting repository language', { repoName });

    const languages = await this.makeRequest<Record<string, number>>({
      method: 'GET',
      url: `${this.getOrgRepoUrl(repoName)}/languages`,
    });

    const sorted = Object.entries(languages).sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
    const mainLanguage = sorted.length > 0 ? sorted[0][0] : 'Unknown';

    if (mainLanguage === 'Unknown') {
      return '';
    }
    return mainLanguage;
  }
}
