import { create } from 'zustand';

interface OnlineUsersState {
  onlineUsers: Set<string>;
  setOnlineUsers: (userIds: string[]) => void;
  addOnlineUser: (userId: string) => void;
  removeOnlineUser: (userId: string) => void;
  isUserOnline: (userId: string) => boolean;
  getOnlineUsersList: () => string[];
  clearOnlineUsers: () => void;
}

export const useOnlineUsersStore = create<OnlineUsersState>((set, get) => ({
  onlineUsers: new Set(),
  
  setOnlineUsers: (userIds: string[]) =>
    set(() => ({
      onlineUsers: new Set(userIds),
    })),
  
  addOnlineUser: (userId: string) =>
    set((state) => {
      const newOnlineUsers = new Set(state.onlineUsers);
      newOnlineUsers.add(userId);
      return { onlineUsers: newOnlineUsers };
    }),
  
  removeOnlineUser: (userId: string) =>
    set((state) => {
      const newOnlineUsers = new Set(state.onlineUsers);
      newOnlineUsers.delete(userId);
      return { onlineUsers: newOnlineUsers };
    }),
  
  isUserOnline: (userId: string) => {
    const { onlineUsers } = get();
    return onlineUsers.has(userId);
  },
  
  getOnlineUsersList: () => {
    const { onlineUsers } = get();
    return Array.from(onlineUsers);
  },
  
  clearOnlineUsers: () =>
    set(() => ({
      onlineUsers: new Set(),
    })),
})); 