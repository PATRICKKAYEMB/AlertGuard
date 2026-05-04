import React, { createContext, useContext, useState, useEffect } from 'react';
import { socketService } from '@/services/socketService';
import { api , getAuthToken  } from '@/services/api';


const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastNotification, setLastNotification] = useState<any>(null);

  useEffect(() => {
    // UN SEUL WebSocket pour toute l'application
    const socket = socketService((data) => {
      console.log("📥 WebSocket Global reçu:", data);
      if (data.type === 'new_notification' || data.type === 'connection_established') {
        if (data.unread_count !== undefined) {
          setUnreadCount(data.unread_count);
        }
        if (data.notification) {
          setLastNotification(data.notification);
        }
      }
    });

    return () => socket.close();
  }, []);

  const resetBadge = async () => {
  setUnreadCount(0); 
  try {
    const token = await getAuthToken(); // Récupère le token frais
    if (!token) return; 

    await api.post('/notifications/mark_all_as_read/');
    console.log("✅ Badge réinitialisé sur le serveur");
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error("❌ Session expirée, impossible de reset le badge");
      // Optionnel: rediriger vers le login ou rafraîchir le token
    }
  }
};

  return (
    <NotificationContext.Provider value={{ unreadCount, lastNotification, resetBadge }}>
      {children}
    </NotificationContext.Provider>
  );
};

// On exporte le hook pour qu'il soit facile à utiliser
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications doit être utilisé dans un NotificationProvider");
  }
  return context;
};