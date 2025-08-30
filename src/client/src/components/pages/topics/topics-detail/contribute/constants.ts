import { Code2, Star, Target, Trophy, Users } from 'lucide-react';
import { RoleConfig } from './types';

export const getRoleConfig = (role: string): RoleConfig => {
  switch (role) {
    case 'leader':
      return {
        color: 'bg-gradient-to-r from-red-500 to-red-600',
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        textColor: 'text-red-700 dark:text-red-400',
        icon: Trophy,
      };
    case 'developer':
      return {
        color: 'bg-gradient-to-r from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        textColor: 'text-blue-700 dark:text-blue-400',
        icon: Code2,
      };
    case 'designer':
      return {
        color: 'bg-gradient-to-r from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        textColor: 'text-purple-700 dark:text-purple-400',
        icon: Star,
      };
    case 'member':
      return {
        color: 'bg-gradient-to-r from-green-500 to-green-600',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        textColor: 'text-green-700 dark:text-green-400',
        icon: Target,
      };
    default:
      return {
        color: 'bg-gradient-to-r from-gray-500 to-gray-600',
        bgColor: 'bg-gray-50 dark:bg-gray-950/20',
        textColor: 'text-gray-700 dark:text-gray-400',
        icon: Users,
      };
  }
};
