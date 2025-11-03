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
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Platform Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">3D Avatar Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Photorealistic 3D human model with natural animations, facial expressions, and real-time responsiveness
                </p>
                <Badge variant="secondary">Advanced AI</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Voice Interaction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Natural language processing with speech recognition, text-to-speech, and emotional intelligence
                </p>
                <Badge variant="secondary">Multilingual</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Smart Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Intelligent appointment scheduling with AI recommendations and real-time availability updates
                </p>
                <Badge variant="secondary">Real-time</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  GDPR compliant with end-to-end encryption, secure data handling, and privacy compliance
                </p>
                <Badge variant="secondary">Enterprise Grade</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Brain className="w-5 h-5 mr-2 text-blue-600" />
                  AI Skin Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">
                  Comprehensive skin condition analysis with machine learning insights
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ Real-time condition detection</li>
                  <li>✓ 94% accuracy rate</li>
                  <li>✓ Personalized recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                  Real-time Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">
                  Seamless interaction with AI assistant and medical professionals
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ Instant response time</li>
                  <li>✓ 24/7 availability</li>
                  <li>✓ Multi-language support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Smartphone className="w-5 h-5 mr-2 text-purple-600" />
                  Cross-Platform Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">
                  Seamless experience across all devices and platforms
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ Mobile optimized</li>
                  <li>✓ Desktop support</li>
                  <li>✓ Responsive design</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  "The AI analysis was incredibly accurate. It caught early signs of a skin condition that I would have missed. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=150" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Jyoti Desai</p>
                    <p className="text-xs text-gray-500">Mumbai, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  "The 3D avatar is so helpful and friendly. The voice interaction makes consultations feel personal and engaging. Love this app!"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=150" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Aisha Khan</p>
                    <p className="text-xs text-gray-500">Delhi, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  "Booking appointments is so easy! The AI assistant remembers my preferences and suggests the best doctors for my needs."
                </p>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="https://images.pexels.com/photos/3814517/pexels-photo-3814517.jpeg?auto=compress&cs=tinysrgb&w=150" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Raj Sharma</p>
                    <p className="text-xs text-gray-500">Bangalore, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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