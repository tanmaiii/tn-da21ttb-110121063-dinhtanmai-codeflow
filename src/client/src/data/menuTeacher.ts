import { ILinkItem } from "@/interfaces/common";
import { paths } from "./path";

export const menuTeacher: ILinkItem[] = [
  {
    en: "Home",
    vi: "Trang chủ",
    labelKey: "path.home",
    icon: "home",
    href: paths.HOME,
  },
  {
    vi: "Quản lý môn học",
    en: "Courses",
    labelKey: "path.courses",
    icon: "book",
    href: paths.COURSES,
  },
  {
    vi: "Quản lý đề tài",
    en: "Topics",
    labelKey: "path.topics",
    icon: "project",
    href: paths.TOPICS,
  },
  {
    vi: "Bài viết",
    en: "Posts",
    labelKey: "path.posts",
    icon: "article",
    href: paths.POSTS,
  },
  {
    en: "Settings",
    vi: "Cài đặt",
    labelKey: "path.settings",
    icon: "settings",
    href: paths.SETTINGS,
  },
];
