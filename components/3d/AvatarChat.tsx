'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Bot,
  User,
  Calendar,
  Stethoscope,
  Brain,
  Heart,
  Phone,
  Video,
  FileText,
  Camera,
  Settings,
  Minimize2,
  Maximize2,
  X
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'avatar' | 'system';
  content: string;
  timestamp: Date;
  emotion?: 'neutral' | 'happy' | 'concerned' | 'professional';
  actions?: {
    label: string;
    action: string;
    icon?: React.ReactNode;
  }[];
}

interface AvatarChatProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onAvatarStateChange?: (state: {
    animation: string;
    emotion: string;
    isListening: boolean;
    isSpeaking: boolean;
  }) => void;
}

export function AvatarChat({ 
  isOpen, 
  onToggle, 
  isMinimized = false, 
  onMinimize,
  onAvatarStateChange 
}: AvatarChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize with welcome message
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        type: 'avatar',
        content: 'Hello! I\'m Dr. AI, your virtual healthcare assistant. I can help you with appointments, health questions, skin analysis, and connecting you with our medical professionals. How can I assist you today?',
        timestamp: new Date(),
        emotion: 'professional',
        actions: [
          { label: 'Book Appointment', action: 'book_appointment', icon: <Calendar className="w-3 h-3" /> },
          { label: 'AI Analysis', action: 'ai_analysis', icon: <Brain className="w-3 h-3" /> },
          { label: 'Find Doctor', action: 'find_doctor', icon: <Stethoscope className="w-3 h-3" /> }
        ]
      };
      setMessages([welcomeMessage]);
      
      // Speak welcome message if voice is enabled
      setTimeout(() => {
        if (isVoiceEnabled) {
          speakMessage(welcomeMessage.content);
        }
      }, 1000);
    }
  }, [isOpen, isVoiceEnabled]);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        onAvatarStateChange?.({
          animation: 'idle',
          emotion: 'professional',
          isListening: false,
          isSpeaking: false
        });
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    // Initialize Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakMessage = (text: string) => {
    if (!synthesisRef.current || !isVoiceEnabled) return;
    
    setIsSpeaking(true);
    onAvatarStateChange?.({
      animation: 'talking',
      emotion: 'professional',
      isListening: false,
      isSpeaking: true
    });
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      onAvatarStateChange?.({
        animation: 'idle',
        emotion: 'professional',
        isListening: false,
        isSpeaking: false
      });
    };
    
    synthesisRef.current.speak(utterance);
  };

  const handleVoiceInput = (transcript: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: transcript,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    processMessage(transcript);
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    
    setIsListening(true);
    onAvatarStateChange?.({
      animation: 'listening',
      emotion: 'professional',
      isListening: true,
      isSpeaking: false
    });
    
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processMessage = async (message: string) => {
    setIsTyping(true);
    onAvatarStateChange?.({
      animation: 'thinking',
      emotion: 'professional',
      isListening: false,
      isSpeaking: false
    });

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = message.toLowerCase();
    let response = '';
    let emotion: 'neutral' | 'happy' | 'concerned' | 'professional' = 'professional';
    let actions: ChatMessage['actions'] = [];

    if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
      response = 'I\'d be happy to help you schedule an appointment! I can connect you with our certified dermatologists. What type of consultation are you looking for?';
      emotion = 'happy';
      actions = [
        { label: 'Video Consultation', action: 'book_video', icon: <Video className="w-3 h-3" /> },
        { label: 'Chat Consultation', action: 'book_chat', icon: <MessageCircle className="w-3 h-3" /> },
        { label: 'View Doctors', action: 'view_doctors', icon: <Stethoscope className="w-3 h-3" /> }
      ];
    } else if (lowerMessage.includes('skin') || lowerMessage.includes('acne') || lowerMessage.includes('rash')) {
      response = 'I can help you with skin concerns! Our AI can analyze skin conditions with 94% accuracy. Would you like to upload photos for analysis or speak with a dermatologist?';
      emotion = 'concerned';
      actions = [
        { label: 'AI Skin Analysis', action: 'ai_analysis', icon: <Brain className="w-3 h-3" /> },
        { label: 'Upload Photos', action: 'upload_photos', icon: <Camera className="w-3 h-3" /> },
        { label: 'Consult Doctor', action: 'consult_doctor', icon: <Stethoscope className="w-3 h-3" /> }
      ];
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = 'Hello! It\'s wonderful to meet you. I\'m here to assist with all your healthcare needs. I can help with skin analysis, booking appointments, or answering health questions. What brings you here today?';
      emotion = 'happy';
      actions = [
        { label: 'Skin Analysis', action: 'ai_analysis', icon: <Brain className="w-3 h-3" /> },
        { label: 'Book Appointment', action: 'book_appointment', icon: <Calendar className="w-3 h-3" /> },
        { label: 'Health Tips', action: 'health_tips', icon: <Heart className="w-3 h-3" /> }
      ];
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      response = 'I\'m here to help! I can assist with:\n\n• Booking appointments with dermatologists\n• AI-powered skin analysis\n• Health questions and tips\n• Finding the right doctor for your needs\n• Navigating our platform\n\nWhat specific help do you need?';
      actions = [
        { label: 'Help Center', action: 'help_center', icon: <FileText className="w-3 h-3" /> },
        { label: 'Contact Support', action: 'contact_support', icon: <Phone className="w-3 h-3" /> }
      ];
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      response = 'Our consultation fees are very affordable:\n\n• Video Consultation: ₹500-₹1500\n• Chat Consultation: ₹300-₹1000\n• AI Skin Analysis: Free for registered users\n\nPrices vary by doctor\'s experience and specialization. Would you like to see available doctors and their fees?';
      actions = [
        { label: 'View Doctors & Fees', action: 'view_doctors', icon: <Stethoscope className="w-3 h-3" /> },
        { label: 'Free AI Analysis', action: 'ai_analysis', icon: <Brain className="w-3 h-3" /> }
      ];
    } else {
      response = 'Thank you for your question! While I can provide general guidance, for specific medical concerns, I recommend consulting with one of our certified dermatologists. They can provide personalized advice based on your unique needs.\n\nWould you like me to help you find a suitable doctor or try our AI skin analysis?';
      actions = [
        { label: 'Find Doctor', action: 'find_doctor', icon: <Stethoscope className="w-3 h-3" /> },
        { label: 'AI Analysis', action: 'ai_analysis', icon: <Brain className="w-3 h-3" /> }
      ];
    }

    const avatarMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'avatar',
      content: response,
      timestamp: new Date(),
      emotion,
      actions
    };

    setMessages(prev => [...prev, avatarMessage]);
    setIsTyping(false);

    // Speak the response
    if (isVoiceEnabled) {
      setTimeout(() => speakMessage(response), 500);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    processMessage(inputValue);
    setInputValue('');
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'book_appointment':
      case 'book_video':
      case 'book_chat':
        window.open('/find-doctors', '_blank');
        break;
      case 'ai_analysis':
        window.open('/ai-analysis', '_blank');
        break;
      case 'find_doctor':
      case 'view_doctors':
        window.open('/find-doctors', '_blank');
        break;
      case 'upload_photos':
        window.open('/upload', '_blank');
        break;
      case 'help_center':
        window.open('/help', '_blank');
        break;
      case 'contact_support':
        window.open('/contact', '_blank');
        break;
      case 'health_tips':
        window.open('/learn', '_blank');
        break;
      default:
        console.log('Action:', action);
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    const message = !isVoiceEnabled 
      ? 'Voice interaction enabled! You can now speak to me directly.'
      : 'Voice interaction disabled. You can still type your messages.';
    
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'system',
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl z-50 animate-pulse"
        size="icon"
      >
        <Bot className="w-8 h-8 text-white" />
      </Button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-white rounded-2xl shadow-2xl border transition-all duration-300 ${
        isMinimized 
          ? 'bottom-6 right-6 w-80 h-16' 
          : 'bottom-6 right-6 w-96 h-[700px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Dr. AI Assistant</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-xs text-blue-100">Online • AI Powered</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleVoice}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          {onMinimize && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onMinimize}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggle}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 p-4 h-[480px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      {message.type === 'avatar' ? (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      ) : message.type === 'system' ? (
                        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                          <Settings className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div className={`rounded-2xl p-3 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : message.type === 'system'
                        ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      
                      {/* Action Buttons */}
                      {message.actions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              onClick={() => handleActionClick(action.action)}
                              className="text-xs h-7 bg-white/80 hover:bg-white"
                            >
                              {action.icon}
                              <span className="ml-1">{action.label}</span>
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    </Avatar>
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <Separator />

          {/* Input Area */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about skin conditions, appointments, or health tips..."
                  className="pr-12"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-1 top-1 h-8 w-8 p-0 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('I need help with acne')}
                className="text-xs h-7"
              >
                Acne Help
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('Book an appointment')}
                className="text-xs h-7"
              >
                Book Appointment
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('Skin care routine advice')}
                className="text-xs h-7"
              >
                Skin Care Tips
              </Button>
            </div>

            {/* Voice Status */}
            {isVoiceEnabled && (
              <div className="mt-2 flex items-center justify-center space-x-2 text-xs text-gray-600">
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                <span>{isListening ? 'Listening...' : 'Voice ready'}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}