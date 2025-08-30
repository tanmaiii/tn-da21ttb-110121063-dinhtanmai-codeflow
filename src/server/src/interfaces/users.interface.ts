export interface User {
  id?: string;
  uid?: string;
  email: string;
  password?: string;
  name?: string;
  username: string;
  role?: string;
  status?: string;
  avatar?: string;
  bio?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  topicMembers?: TopicMember[];
}

export interface TopicMember {
  id: string;
  topicId: string;
  userId: string;
  role: string;
  topic?: Topic;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  courseId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
  groupName: string;
}

export interface UserGithub {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company?: string;
  blog: string;
  location: string;
  email?: string;
  hireable?: boolean;
  bio: string;
  twitter_username?: string;
  notification_email?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface UserContributes {
  authorId: string;
  author: User;
  commit: {
    total: number;
    additions: number;
    deletions: number;
  };
  pullRequest: {
    total: number;
    additions: number;
    deletions: number;
  };
  codeAnalysis: {
    total: number;
    success: number;
    failure: number;
  };
}
