// services/socketService.ts
import { BASE_URL, getAuthToken } from './api'; // Assure-toi d'avoir une fonction pour récupérer le token

export const socketService = (onMessageReceived: (data: any) => void) => {
  let socket: WebSocket | null = null;
  let reconnectTimeout: NodeJS.Timeout;

  const connect = async () => {
    // 1. Récupérer le token JWT
    const token = await getAuthToken(); 
    
    // 2. Construire l'URL avec le token en paramètre query
    // Django Channels pourra lire ce token pour identifier l'utilisateur
    const WS_URL_WITH_AUTH = `${BASE_URL.replace('http', 'ws')}/ws/notifications/?token=${token}`;

    socket = new WebSocket(WS_URL_WITH_AUTH);

    socket.onopen = () => {
      console.log("✅ AlertGuard: WebSocket connecté avec succès");
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
      console.log("⚠️ WebSocket déconnecté. Reconnexion dans 3s...");
      reconnectTimeout = setTimeout(connect, 3000);
    };

    socket.onerror = (err) => {
      console.error("❌ Erreur WebSocket:", err);
      socket?.close();
    };
  };

  connect();

  return {
    close: () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socket) {
        socket.onclose = null;
        socket.close();
      }
    }
  };
};