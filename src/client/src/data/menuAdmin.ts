import { ILinkItem } from '@/interfaces/common';
import { paths } from './path';

export const menuAdmin: ILinkItem[] = [
  {
    en: 'Home',
    vi: 'Trang chủ',
    labelKey: 'path.home',
    icon: 'layout',
    href: paths.HOME,
  },
  {
    en: 'Users',
    vi: 'Người dùng',
    labelKey: 'path.users',
    icon: 'users',
    href: paths.USERS,
  },
  {
    en: 'Courses',
    vi: 'Khóa học',
    labelKey: 'path.courses',
    icon: 'book',
    href: paths.COURSES,
  },
  {
    en: 'Topics',
    vi: 'Đề tài',
    labelKey: 'path.topics',
    icon: 'project',
    href: paths.TOPICS,
  },
  {
    en: 'Repository',
    vi: 'Kho lưu trữ',
    labelKey: 'path.repos',
    icon: 'repos',
    href: paths.REPOS,
  },
  {
    en: 'Posts',
    vi: 'Bài viết',
    labelKey: 'path.posts',
    icon: 'article',
    href: paths.POSTS,
  },
  {
    en: 'Tags',
    vi: 'Thẻ',
    labelKey: 'path.tags',
    icon: 'tag',
    href: paths.TAGS,
  },
  {
    en: 'Comments',
    vi: 'Bình luận',
    labelKey: 'path.comments',
    icon: 'comment',
    href: paths.COMMENTS,
  },
  // {
  //   en: 'Settings',
  //   vi: 'Cài đặt',
  //   labelKey: 'path.settings',
  //   icon: 'settings',
  //   href: paths.SETTINGS,
  // },
];
