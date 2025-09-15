import { io, Socket } from 'socket.io-client';

export interface RealTimeMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'system';
  roomId: string;
}

export interface VideoCallState {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  participants: string[];
}

class RealTimeService {
  private socket: Socket | null = null;
  private isConnected = false;

  connect(userId: string, userRole: 'patient' | 'doctor'): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // In production, replace with your Socket.IO server URL
        this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:3001', {
          auth: { userId, userRole },
          transports: ['websocket', 'polling']
        });

        this.socket.on('connect', () => {
          this.isConnected = true;
          resolve();
        });

        this.socket.on('connect_error', (error) => {
          reject(error);
        });

        this.socket.on('disconnect', () => {
          this.isConnected = false;
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  joinRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('join-room', roomId);
    }
  }

  leaveRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('leave-room', roomId);
    }
  }

  sendMessage(message: Omit<RealTimeMessage, 'id' | 'timestamp'>) {
    if (this.socket) {
      this.socket.emit('send-message', {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date()
      });
    }
  }

  onMessage(callback: (message: RealTimeMessage) => void) {
    if (this.socket) {
      this.socket.on('new-message', callback);
    }
  }

  onUserJoined(callback: (user: { id: string; name: string }) => void) {
    if (this.socket) {
      this.socket.on('user-joined', callback);
    }
  }

  onUserLeft(callback: (userId: string) => void) {
    if (this.socket) {
      this.socket.on('user-left', callback);
    }
  }

  // Video call methods
  initiateVideoCall(roomId: string, participants: string[]) {
    if (this.socket) {
      this.socket.emit('initiate-video-call', { roomId, participants });
    }
  }

  updateVideoState(roomId: string, state: Partial<VideoCallState>) {
    if (this.socket) {
      this.socket.emit('update-video-state', { roomId, state });
    }
  }

  onVideoStateUpdate(callback: (state: VideoCallState) => void) {
    if (this.socket) {
      this.socket.on('video-state-updated', callback);
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const realTimeService = new RealTimeService();