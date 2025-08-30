import { GitHubUser } from '@interfaces/github.interface';
import { Service } from 'typedi';
import { GitHubBaseService } from './github-base.service';

@Service()
export class GitHubUserService extends GitHubBaseService {
  constructor() {
    super('GitHub User Service');
  }

  /**
   * Lấy thông tin user từ GitHub
   * @param accessToken GitHub access token
   * @returns GitHub user information
   */
  public async getUserInfo(accessToken: string): Promise<GitHubUser> {
    this.logInfo('Getting user info with access token');

    return this.makeRequest<GitHubUser>({
      method: 'GET',
      url: `${this.baseUrl}/user`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
  }

  public async getUserInfoByUsername(username: string): Promise<GitHubUser> {
    this.logInfo('Getting user info by username', { username });

    return this.makeRequest<GitHubUser>({
      method: 'GET',
      url: `${this.baseUrl}/users/${username}`,
    });
  }

  /**
   * Mời user vào tổ chức GitHub
   * @param username GitHub username
   */
  public async inviteUserToOrganization(username: string): Promise<void> {
    this.logInfo('Inviting user to organization', { username });

    // Get user ID first
    const user = await this.makeRequest<GitHubUser>({
      method: 'GET',
      url: `${this.baseUrl}/users/${username}`,
    });

    return this.makeRequest<void>({
      method: 'POST',
      url: `${this.getOrgUrl()}/invitations`,
      data: {
        invitee_id: user.id,
        role: 'direct_member',
      },
    });
  }

  /**
   * Kiểm tra xem user có tồn tại trong tổ chức GitHub hay không
   * @param username GitHub username
   * @returns true nếu user tồn tại trong tổ chức, false nếu ngược lại
   */
  public async checkUserInOrganization(username: string): Promise<boolean> {
    try {
      await this.makeRequest({
        method: 'GET',
        url: `${this.getOrgUrl()}/members/${username}`,
      });
      return true;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      }
      throw error;
    }
  }

  /**
   * Lấy danh sách thành viên tổ chức GitHub
   * @returns Danh sách thành viên tổ chức
   */
  public async getOrganizationMembers(): Promise<GitHubUser[]> {
    this.logInfo('Getting organization members');

    return this.makeRequest<GitHubUser[]>({
      method: 'GET',
      url: `${this.getOrgUrl()}/members`,
    });
  }
}
