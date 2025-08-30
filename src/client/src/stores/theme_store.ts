import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Helper function để update DOM và localStorage an toàn
const updateThemeDOM = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      updateThemeDOM(newTheme);
      return { theme: newTheme };
    }),
  setTheme: (theme: Theme) =>
    set(() => {
      updateThemeDOM(theme);
      return { theme };
    }),
}));
