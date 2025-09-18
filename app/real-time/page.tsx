'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { 
  MessageCircle, 
  Send, 
  Users, 
  Wifi, 
  WifiOff,
  Bell,
  Video,
  Phone,
  Mic,
  MicOff,
  Camera,
  CameraOff
} from 'lucide-react';

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

interface OnlineUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy';
  lastSeen: Date;
}

export default function RealTimePage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  // Simulate WebSocket connection
  useEffect(() => {
    if (!user) return;

    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      
      // Add system message
      const systemMessage: Message = {
        id: Date.now().toString(),
        userId: 'system',
        userName: 'System',
        content: `${user.name} joined the consultation room`,
        timestamp: new Date(),
        type: 'system'
      };
      setMessages([systemMessage]);

      // Simulate other online users
      setOnlineUsers([
        {
          id: 'doc1',
          name: 'Dr. Priya Sharma',
          avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'online',
          lastSeen: new Date()
        },
        {
          id: 'patient1',
          name: 'Rahul Patel',
          avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'online',
          lastSeen: new Date()
        }
      ]);

      toast.success('Connected to real-time consultation');
    }, 2000);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !user || !isConnected) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate response from doctor
    if (user.role === 'patient') {
      setTimeout(() => {
        const doctorResponse: Message = {
          id: (Date.now() + 1).toString(),
          userId: 'doc1',
          userName: 'Dr. Priya Sharma',
          content: 'Thank you for sharing that information. I can see the area you\'re concerned about. Let me examine it more closely.',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Please log in to access real-time features</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Real-Time Consultation</h1>
              <p className="text-gray-600 mt-1">
                Live video consultation with instant messaging
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? (
                  <>
                    <Wifi className="w-3 h-3 mr-1" />
                    Connected
                  </>
                ) : isConnecting ? (
                  <>
                    <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin mr-1"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 mr-1" />
                    Disconnected
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
          {/* Video Area */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Video Consultation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden min-h-[400px]">
                  {/* Main Video Feed */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Dr. Priya Sharma</p>
                      <p className="text-sm opacity-75">Video consultation in progress</p>
                    </div>
                  </div>

                  {/* Picture-in-Picture */}
                  <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">You</p>
                      </div>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                      <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
                        <Camera className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="rounded-full w-10 h-10 p-0">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="space-y-6">
            {/* Online Users */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Online ({onlineUsers.length + 1})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Current User */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name} (You)</p>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>

                {/* Other Users */}
                {onlineUsers.map((onlineUser) => (
                  <div key={onlineUser.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={onlineUser.avatar} alt={onlineUser.name} />
                        <AvatarFallback>{onlineUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(onlineUser.status)} border border-white rounded-full`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{onlineUser.name}</p>
                      <p className="text-xs text-gray-600 capitalize">{onlineUser.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card className="flex-1">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Live Chat</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-64 px-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id}>
                        {message.type === 'system' ? (
                          <div className="text-center">
                            <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                              {message.content}
                            </p>
                          </div>
                        ) : (
                          <div className={`flex ${message.userId === user.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] ${message.userId === user.id ? 'text-right' : 'text-left'}`}>
                              <div className={`inline-block p-3 rounded-lg ${
                                message.userId === user.id
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {message.userName} • {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={!isConnected}
                    />
                    <Button size="sm" onClick={sendMessage} disabled={!isConnected || !newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EnhancedFooter />
    </div>
  );
}