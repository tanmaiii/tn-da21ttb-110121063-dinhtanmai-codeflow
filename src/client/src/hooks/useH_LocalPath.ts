import { useLocale } from "next-intl";

// This hook is used to create localized paths for routing in the application.
// It uses the `useLocale` hook from `next-intl` to get the current locale and constructs a path with it.
export default function useH_LocalPath() {
  const locale = useLocale();
  const localPath = (path: string) => `/${locale}${path}`;

  return { localPath };
}
