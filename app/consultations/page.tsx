'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Bell } from 'lucide-react';
import { ChatBot } from '@/components/ai/ChatBot';
import { toast } from 'sonner';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  MessageCircle,
  Send,
  Camera,
  Monitor,
  Users,
  Clock,
  FileText,
  Download,
  Share2,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ConsultationMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'prescription';
}

export default function ConsultationsPage() {
  const { user } = useAuth();
  const [activeConsultation, setActiveConsultation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample consultations
  const consultations = [
    {
      id: 'cons1',
      patientName: 'Priya Sharma',
      doctorName: 'Dr. Rajesh Kumar',
      status: 'active',
      type: 'video',
      startTime: new Date(),
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 'cons2',
      patientName: 'Rahul Patel',
      doctorName: 'Dr. Anjali Singh',
      status: 'waiting',
      type: 'chat',
      startTime: new Date(Date.now() + 15 * 60 * 1000),
      avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  useEffect(() => {
    // Initialize with sample messages
    if (activeConsultation) {
      setMessages([
        {
          id: '1',
          senderId: 'doctor',
          senderName: 'Dr. Kumar',
          content: 'Hello! I can see you\'ve joined the consultation. How are you feeling today?',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          type: 'text'
        },
        {
          id: '2',
          senderId: 'patient',
          senderName: 'You',
          content: 'Hi Doctor, I\'ve been having some skin issues on my face that I\'d like to discuss.',
          timestamp: new Date(Date.now() - 4 * 60 * 1000),
          type: 'text'
        },
        {
          id: '3',
          senderId: 'doctor',
          senderName: 'Dr. Kumar',
          content: 'I understand. Can you please describe the symptoms you\'re experiencing? Also, feel free to show me the affected area on video.',
          timestamp: new Date(Date.now() - 3 * 60 * 1000),
          type: 'text'
        }
      ]);
    }
  }, [activeConsultation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ConsultationMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse: ConsultationMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'doctor',
        senderName: 'Dr. Kumar',
        content: 'Thank you for sharing that information. Based on what you\'ve described, I\'d like to examine the area more closely. Can you adjust your camera angle?',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast.info(isVideoEnabled ? 'Camera turned off' : 'Camera turned on');
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast.info(isAudioEnabled ? 'Microphone muted' : 'Microphone unmuted');
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.info(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started');
  };

  const endConsultation = () => {
    setActiveConsultation(null);
    toast.success('Consultation ended successfully');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Please log in to access consultations</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeConsultation ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultations</h1>
              <p className="text-gray-600">
                {user.role === 'patient' 
                  ? 'Join your scheduled consultations and chat with doctors'
                  : 'Manage your patient consultations and provide expert care'
                }
              </p>
            </div>

            {/* Active Consultations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {consultations.map((consultation) => (
                <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={consultation.avatar} />
                          <AvatarFallback>
                            {(user.role === 'patient' ? consultation.doctorName : consultation.patientName).charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {user.role === 'patient' ? consultation.doctorName : consultation.patientName}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant={consultation.status === 'active' ? 'default' : 'secondary'}>
                              {consultation.status}
                            </Badge>
                            <Badge variant="outline">
                              {consultation.type === 'video' ? (
                                <Video className="w-3 h-3 mr-1" />
                              ) : (
                                <MessageCircle className="w-3 h-3 mr-1" />
                              )}
                              {consultation.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {consultation.status === 'active' 
                              ? 'Started ' + consultation.startTime.toLocaleTimeString()
                              : 'Starts ' + consultation.startTime.toLocaleTimeString()
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => setActiveConsultation(consultation.id)}
                        disabled={consultation.status === 'waiting'}
                      >
                        {consultation.type === 'video' ? (
                          <>
                            <Video className="w-4 h-4 mr-2" />
                            Join Video Call
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Open Chat
                          </>
                        )}
                      </Button>
                      {consultation.status === 'waiting' && (
                        <Button variant="outline">
                          <Bell className="w-4 h-4 mr-2" />
                          Notify
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Active Consultation Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Video Area */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Video className="w-5 h-5" />
                      <span>Video Consultation</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default" className="bg-green-600">
                        <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                        Live
                      </Badge>
                      <span className="text-sm text-gray-600">15:23</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
                    {/* Main Video */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Dr. Kumar</p>
                        <p className="text-sm opacity-75">Video consultation in progress</p>
                      </div>
                    </div>

                    {/* Picture-in-Picture */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <div className="text-center text-white">
                          <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">You</p>
                        </div>
                      </div>
                    </div>

                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                        <Button
                          size="sm"
                          variant={isAudioEnabled ? "secondary" : "destructive"}
                          onClick={toggleAudio}
                          className="rounded-full w-10 h-10 p-0"
                        >
                          {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant={isVideoEnabled ? "secondary" : "destructive"}
                          onClick={toggleVideo}
                          className="rounded-full w-10 h-10 p-0"
                        >
                          {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                        </Button>

                        <Button
                          size="sm"
                          variant={isScreenSharing ? "default" : "secondary"}
                          onClick={toggleScreenShare}
                          className="rounded-full w-10 h-10 p-0"
                        >
                          <Monitor className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={endConsultation}
                          className="rounded-full w-10 h-10 p-0"
                        >
                          <PhoneOff className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Sidebar */}
            <div className="space-y-6">
              {/* Consultation Info */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Consultation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150" />
                      <AvatarFallback>DK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Rajesh Kumar</p>
                      <p className="text-sm text-gray-600">Pediatric Dermatology</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>15:23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span>Video Consultation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee:</span>
                      <span>₹600</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Messages */}
              <Card className="flex-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-64 px-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${
                            message.senderId === user.id ? 'text-right' : 'text-left'
                          }`}>
                            <div className={`inline-block p-3 rounded-lg ${
                              message.senderId === user.id
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {message.senderName} • {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
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
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button size="sm" onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    Share Image
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Prescription
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share with Family
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Consultation List */}
        {!activeConsultation && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Consultations</h2>
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={consultation.avatar} />
                          <AvatarFallback>
                            {(user.role === 'patient' ? consultation.doctorName : consultation.patientName).charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {user.role === 'patient' ? consultation.doctorName : consultation.patientName}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={consultation.status === 'active' ? 'default' : 'secondary'}>
                              {consultation.status}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {consultation.status === 'active' 
                                ? 'Started ' + consultation.startTime.toLocaleTimeString()
                                : 'Starts ' + consultation.startTime.toLocaleTimeString()
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => setActiveConsultation(consultation.id)}
                        disabled={consultation.status === 'waiting'}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {consultation.type === 'video' ? (
                          <>
                            <Video className="w-4 h-4 mr-2" />
                            Join Call
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Open Chat
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Chatbot */}
      <ChatBot 
        isOpen={showChatBot} 
        onToggle={() => setShowChatBot(!showChatBot)}
        isMinimized={chatMinimized}
        onMinimize={() => setChatMinimized(!chatMinimized)}
      />

      <Footer />
    </div>
  );
}