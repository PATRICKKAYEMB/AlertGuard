// services/socketService.ts
import { BASE_URL } from './api';

const WS_URL = BASE_URL.replace('http', 'ws') + '/ws/notifications/';

export const socketService = (onMessageReceived: (data: any) => void) => {
  let socket: WebSocket;

  const connect = () => {
    socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("✅ AlertGuard: WebSocket connecté");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageReceived(data);
      } catch (e) {
        console.error("Erreur parsing JSON WebSocket", e);
      }
    };

    socket.onclose = (e) => {
      console.log("⚠️ WebSocket déconnecté. Tentative de reconnexion dans 3s...", e.reason);
      setTimeout(() => {
        connect();
      }, 3000);
    };

    socket.onerror = (err) => {
      console.error("❌ Erreur WebSocket:", err);
      socket.close();
    };
  };

  connect();

  // On retourne un objet pour pouvoir fermer proprement si besoin
  return {
    close: () => {
      socket.onclose = null; // Désactive la reconnexion automatique avant de fermer
      socket.close();
    }
  };
};