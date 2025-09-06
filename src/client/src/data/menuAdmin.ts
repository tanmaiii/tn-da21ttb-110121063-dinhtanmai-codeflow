import { ILinkItem } from '@/interfaces/common';
import { Paths } from './path';

export const menuAdmin: ILinkItem[] = [
  {
    en: 'Home',
    vi: 'Trang chủ',
    labelKey: 'path.home',
    icon: 'layout',
    href:Paths.HOME,
  },
  {
    en: 'Users',
    vi: 'Người dùng',
    labelKey: 'path.users',
    icon: 'users',
    href:Paths.USERS,
  },
  {
    en: 'Courses',
    vi: 'Khóa học',
    labelKey: 'path.courses',
    icon: 'book',
    href:Paths.COURSES,
  },
  {
    en: 'Topics',
    vi: 'Đề tài',
    labelKey: 'path.topics',
    icon: 'project',
    href:Paths.TOPICS,
  },
  {
    en: 'Repository',
    vi: 'Kho lưu trữ',
    labelKey: 'path.repos',
    icon: 'repos',
    href:Paths.REPOS,
  },
  {
    en: 'Posts',
    vi: 'Bài viết',
    labelKey: 'path.posts',
    icon: 'article',
    href:Paths.POSTS,
  },
  {
    en: 'Tags',
    vi: 'Thẻ',
    labelKey: 'path.tags',
    icon: 'tag',
    href:Paths.TAGS,
  },
  {
    en: 'Comments',
    vi: 'Bình luận',
    labelKey: 'path.comments',
    icon: 'comment',
    href:Paths.COMMENTS,
  },
  // {
  //   en: 'Settings',
  //   vi: 'Cài đặt',
  //   labelKey: 'path.settings',
  //   icon: 'settings',
  //   href:Paths.SETTINGS,
  // },
];
