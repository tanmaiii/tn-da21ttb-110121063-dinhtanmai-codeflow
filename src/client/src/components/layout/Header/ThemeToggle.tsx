"use client";
import { useThemeStore } from "@/stores/theme_store";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import ButtonTooltip from "../../common/Button/ButtonWithTooltip/ButtonTooltip";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const t = useTranslations("settings");

  return (
    <ButtonTooltip
      tooltip={t("switchTheme")}
      variant="ghost" size="icon"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </ButtonTooltip>
  );
}
