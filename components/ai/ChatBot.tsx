'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Camera,
  Image as ImageIcon,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized?: boolean;
  onMinimize?: () => void;
}

export function ChatBot({ isOpen, onToggle, isMinimized = false, onMinimize }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m Dr. AI, your virtual dermatology assistant. I can help you with skin care questions, analyze symptoms, and guide you to the right treatment. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple keyword-based responses (in real app, this would be OpenAI API)
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('acne') || lowerMessage.includes('pimple')) {
      return 'Acne is a common skin condition. Here are some recommendations:\n\n• Use a gentle cleanser twice daily\n• Apply salicylic acid or benzoyl peroxide\n• Avoid touching your face\n• Consider seeing a dermatologist for persistent acne\n\nWould you like me to help you find a dermatologist specializing in acne treatment?';
    }
    
    if (lowerMessage.includes('dry') || lowerMessage.includes('moistur')) {
      return 'For dry skin, I recommend:\n\n• Use a gentle, fragrance-free moisturizer\n• Apply moisturizer while skin is still damp\n• Use a humidifier in dry environments\n• Avoid hot showers\n• Consider hyaluronic acid serums\n\nWould you like personalized product recommendations based on your skin type?';
    }
    
    if (lowerMessage.includes('sun') || lowerMessage.includes('spf')) {
      return 'Sun protection is crucial for healthy skin:\n\n• Use broad-spectrum SPF 30+ daily\n• Reapply every 2 hours\n• Seek shade during peak hours (10 AM - 4 PM)\n• Wear protective clothing\n• Don\'t forget lips, ears, and feet\n\nWould you like recommendations for sunscreens suitable for Indian climate?';
    }
    
    if (lowerMessage.includes('rash') || lowerMessage.includes('itch')) {
      return 'Skin rashes can have various causes. Here\'s what you can do:\n\n• Keep the area clean and dry\n• Apply cool compresses\n• Use fragrance-free moisturizers\n• Avoid scratching\n• Consider antihistamines for itching\n\n⚠️ If the rash persists, spreads, or is accompanied by fever, please consult a dermatologist immediately. Would you like me to help you book an urgent consultation?';
    }
    
    if (lowerMessage.includes('routine') || lowerMessage.includes('skincare')) {
      return 'A basic skincare routine should include:\n\n🌅 **Morning:**\n• Gentle cleanser\n• Vitamin C serum (optional)\n• Moisturizer\n• Broad-spectrum sunscreen\n\n🌙 **Evening:**\n• Gentle cleanser\n• Treatment (retinol/acids)\n• Moisturizer\n\nStart slowly and patch test new products. Would you like a personalized routine based on your skin type?';
    }

    // Default response
    return 'Thank you for your question! While I can provide general skincare guidance, for specific concerns or conditions, I recommend consulting with one of our certified dermatologists. They can provide personalized advice based on your unique skin needs.\n\nWould you like me to help you:\n• Find a suitable dermatologist\n• Schedule a consultation\n• Learn more about specific skin conditions';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again or contact our support team.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real app, upload to cloud storage and get URL
      const fakeUrl = URL.createObjectURL(file);
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: 'I\'ve uploaded an image for analysis.',
        timestamp: new Date(),
        attachments: [{
          type: 'image',
          url: fakeUrl,
          name: file.name
        }]
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI image analysis
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'I can see the image you\'ve uploaded. Based on the visual analysis, I notice some areas that might need attention. For a detailed diagnosis and treatment plan, I recommend consulting with one of our dermatologists who can provide expert analysis.\n\nWould you like me to help you book a consultation?',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 2000);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className={`fixed z-50 bg-white rounded-lg shadow-2xl border ${
        isMinimized 
          ? 'bottom-6 right-6 w-80 h-16' 
          : 'bottom-6 right-6 w-96 h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Dr. AI Assistant</h3>
            <p className="text-xs text-blue-100">Online • Powered by AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={onMinimize}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
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
          <ScrollArea className="flex-1 p-4 h-[400px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="w-8 h-8">
                      {message.type === 'bot' ? (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
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
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.attachments && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <ImageIcon className="w-4 h-4" />
                              <span className="text-xs">{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-1">
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
                    <div className="bg-gray-100 rounded-lg p-3">
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

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about skin conditions, treatments, or care tips..."
                  className="resize-none min-h-[40px] max-h-[100px] pr-20"
                  rows={1}
                />
                <div className="absolute right-2 top-2 flex items-center space-x-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-6 w-6 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsRecording(!isRecording)}
                    className={`h-6 w-6 p-0 ${isRecording ? 'text-red-500' : ''}`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
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
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('I have acne problems')}
                className="text-xs"
              >
                Acne Help
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('My skin is very dry')}
                className="text-xs"
              >
                Dry Skin
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('Recommend sunscreen')}
                className="text-xs"
              >
                Sun Protection
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('Book a consultation')}
                className="text-xs"
              >
                Book Doctor
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}