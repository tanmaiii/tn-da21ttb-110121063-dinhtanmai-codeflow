import { useEffect } from 'react';
import { useOnlineUsersStore } from '@/stores/online_users_store';
import { useUserStore } from '@/stores/user_store';
import socketService from '@/services/socket.service';

export const useOnlineStatus = () => {
  const { user } = useUserStore();
  const { setOnlineUsers, addOnlineUser, removeOnlineUser, clearOnlineUsers } = useOnlineUsersStore();

  useEffect(() => {
    if (!user) {
      clearOnlineUsers();
      return;
    }

    // Connect socket if not already connected
    socketService.connect(user.id);

    // Subscribe to online users updates
    const unsubscribeOnlineUsers = socketService.onOnlineUsersUpdate((userIds: string[]) => {
      console.log('🟢 Online users updated:', userIds);
      setOnlineUsers(userIds);
    });

    // Subscribe to individual user status changes
    const unsubscribeUserStatus = socketService.onUserStatusChange(({ userId, isOnline }) => {
      console.log(`🟢 User ${userId} is now ${isOnline ? 'online' : 'offline'}`);
      if (isOnline) {
        addOnlineUser(userId);
      } else {
        removeOnlineUser(userId);
      }
    });

    // Cleanup on unmount or user change
    return () => {
      unsubscribeOnlineUsers();
      unsubscribeUserStatus();
      if (!user) {
        socketService.disconnect();
      }
    };
  }, [user, setOnlineUsers, addOnlineUser, removeOnlineUser, clearOnlineUsers]);
}; 