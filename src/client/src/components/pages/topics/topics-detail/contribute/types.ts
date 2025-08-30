export interface MemberContribution {
  id: string;
  name: string;
  avatar?: string;
  commits: number;
  linesAdded: number;
  linesDeleted: number;
  tasksCompleted: number;
  score: number;
  role: 'Leader' | 'Developer' | 'Designer' | 'Tester';
}

export interface RoleConfig {
  color: string;
  bgColor: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
} 