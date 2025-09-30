'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { RealisticAvatarSystem } from '@/components/3d/RealisticAvatar';
import { AvatarChat } from '@/components/3d/AvatarChat';
import { AvatarAppointments } from '@/components/3d/AvatarAppointments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bot, 
  Mic, 
  Video, 
  MessageCircle,
  Calendar,
  Settings,
  Info,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Heart
} from 'lucide-react';

export default function AvatarPage() {
  const [avatarState, setAvatarState] = useState({
    animation: 'idle',
    emotion: 'professional',
    isListening: false,
    isSpeaking: false
  });
  const [showChat, setShowChat] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check browser support
    const checkSupport = () => {
      const webglSupport = !!window.WebGLRenderingContext;
      const speechSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      const webrtcSupport = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      
      setIsSupported(webglSupport);
      
      if (!webglSupport) {
        console.warn('WebGL not supported - 3D features may not work');
      }
      if (!speechSupport) {
        console.warn('Speech recognition not supported');
      }
      if (!webrtcSupport) {
        console.warn('WebRTC not supported - video features may not work');
      }
    };

    checkSupport();
  }, []);

  const handleAvatarStateChange = (state: typeof avatarState) => {
    setAvatarState(state);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive 3D Healthcare Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet Dr. AI, your intelligent 3D healthcare companion. Experience the future of 
            telemedicine with voice interaction, real-time chat, and appointment management.
          </p>
        </div>

        {/* Browser Support Alert */}
        {!isSupported && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Your browser may not fully support all 3D features. For the best experience, 
              please use Chrome, Firefox, or Edge with WebGL enabled.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Avatar */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="w-6 h-6 text-blue-600" />
                      <span>Dr. AI Assistant</span>
                    </CardTitle>
                    <CardDescription>
                      Interactive 3D healthcare companion with voice and chat capabilities
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" className="bg-green-600">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                      Online
                    </Badge>
                    <Badge variant="outline">
                      {avatarState.animation}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <RealisticAvatarSystem />
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Avatar Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Real-time Chat</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mic className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Voice Recognition</span>
                    <Badge variant={avatarState.isListening ? "default" : "secondary"}>
                      {avatarState.isListening ? 'Listening' : 'Ready'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">3D Animations</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Appointment Booking</span>
                    <Badge variant="default">Available</Badge>
                  </div>
                </div>

                <Button
                  onClick={() => setShowChat(!showChat)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {showChat ? 'Hide Chat' : 'Start Conversation'}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="w-4 h-4 mr-2" />
                  AI Skin Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Health Tips
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Avatar Settings
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">3D Rendering</span>
                  <Badge variant="default">✓ Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voice Recognition</span>
                  <Badge variant={isSupported ? "default" : "secondary"}>
                    {isSupported ? '✓ Supported' : '⚠ Limited'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Real-time Chat</span>
                  <Badge variant="default">✓ Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Processing</span>
                  <Badge variant="default">✓ Online</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Browser Compatibility */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Compatibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-gray-600 space-y-1">
                  <p>✅ Chrome 90+ (Recommended)</p>
                  <p>✅ Firefox 88+</p>
                  <p>✅ Safari 14+</p>
                  <p>✅ Edge 90+</p>
                  <p>📱 Mobile browsers supported</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">3D Avatar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Photorealistic 3D human model with natural animations and expressions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Voice Interaction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Natural voice commands with speech recognition and text-to-speech
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Smart Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Intelligent appointment scheduling with real-time availability
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                GDPR compliant with end-to-end encryption for all communications
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Avatar Chat Interface */}
      <AvatarChat
        isOpen={showChat}
        onToggle={() => setShowChat(!showChat)}
        isMinimized={chatMinimized}
        onMinimize={() => setChatMinimized(!chatMinimized)}
        onAvatarStateChange={handleAvatarStateChange}
      />

      <EnhancedFooter />
    </div>
  );
}