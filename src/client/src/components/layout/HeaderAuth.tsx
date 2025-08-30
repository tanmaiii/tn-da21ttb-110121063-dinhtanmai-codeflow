"use client";
import LocaleSwitcher from "./Header/LocaleSwicher";
import ThemeToggle from "./Header/ThemeToggle";

export default function HeaderAuth() {
  return (
    <div
      className="fixed top-0 z-30 
      px-4 py-2 flex items-center justify-end w-full h-14 md:16 gap-2"
    >
      <LocaleSwitcher />
      <ThemeToggle />
    </div>
  );
}
