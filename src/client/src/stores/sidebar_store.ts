// lib/sidebar-store.ts
import { create } from 'zustand';

interface SidebarState {
  collapsed: boolean;
  setSidebar: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

// Helper function để update localStorage an toàn
const updateSidebarStorage = (collapsed: boolean) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sidebar', JSON.stringify(collapsed));
};

export const useSidebarStore = create<SidebarState>(set => ({
  collapsed: true,
  setSidebar: (collapsed: boolean) => {
    set(() => {
      updateSidebarStorage(collapsed);
      return { collapsed };
    });
  },
  toggleSidebar: () =>
    set(state => {
      const newCollapsed = !state.collapsed;
      updateSidebarStorage(newCollapsed);
      return { collapsed: newCollapsed };
    }),
}));
