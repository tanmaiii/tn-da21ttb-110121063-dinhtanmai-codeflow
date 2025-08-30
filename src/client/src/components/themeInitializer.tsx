"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/stores/theme_store";
import { useUserStore } from "@/stores/user_store";
import { useSidebarStore } from "@/stores/sidebar_store";

// Load theme từ localStorage và set vào zustand store
export default function ThemeInitializer() {
  const [isClient, setIsClient] = useState(false);
  const setTheme = useThemeStore((s) => s.setTheme);
  const setUser = useUserStore((s) => s.setUser);
  const setSidebar = useSidebarStore((s) => s.setSidebar);

  useEffect(() => {
    // Đảm bảo chỉ chạy trên client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const user = localStorage.getItem("user");
    const sidebar = localStorage.getItem("sidebar") as "true" | "false" | null;

    if (sidebar) setSidebar(JSON.parse(sidebar));
    if (user) setUser(JSON.parse(user));
    if (saved) setTheme(saved);
  }, [isClient, setTheme, setUser, setSidebar]);

  return null;
}
