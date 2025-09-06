import { ILinkItem } from "@/interfaces/common";
import { Paths } from "./path";

export const menuTeacher: ILinkItem[] = [
  {
    en: "Home",
    vi: "Trang chủ",
    labelKey: "path.home",
    icon: "home",
    href:Paths.HOME,
  },
  {
    vi: "Quản lý môn học",
    en: "Courses",
    labelKey: "path.courses",
    icon: "book",
    href:Paths.COURSES,
  },
  {
    vi: "Quản lý đề tài",
    en: "Topics",
    labelKey: "path.topics",
    icon: "project",
    href:Paths.TOPICS,
  },
  {
    vi: "Bài viết",
    en: "Posts",
    labelKey: "path.posts",
    icon: "article",
    href:Paths.POSTS,
  },
  {
    en: "Settings",
    vi: "Cài đặt",
    labelKey: "path.settings",
    icon: "settings",
    href:Paths.SETTINGS,
  },
];
