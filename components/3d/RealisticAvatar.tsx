'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Text,
  Html,
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  Sphere,
  Box,
  Cylinder
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Mesh, Group, Vector3, Euler } from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MessageCircle,
  Calendar,
  User,
  Settings,
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
  Heart,
  Brain,
  Stethoscope
} from 'lucide-react';

// Avatar Animation States
type AnimationState = 'idle' | 'talking' | 'gesturing' | 'listening' | 'thinking';

interface AvatarMessage {
  id: string;
  type: 'user' | 'avatar';
  content: string;
  timestamp: Date;
  emotion?: 'neutral' | 'happy' | 'concerned' | 'professional';
}

interface AvatarProps {
  animationState: AnimationState;
  isListening: boolean;
  isSpeaking: boolean;
  emotion: 'neutral' | 'happy' | 'concerned' | 'professional';
  onInteraction?: (type: string, data?: any) => void;
}

// Realistic 3D Human Avatar Component
function Avatar3D({ animationState, isListening, isSpeaking, emotion, onInteraction }: AvatarProps) {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Mesh>(null);
  const eyesRef = useRef<Group>(null);
  const mouthRef = useRef<Mesh>(null);
  
  const [blinkTimer, setBlinkTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [talkingPhase, setTalkingPhase] = useState(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Breathing animation
    setBreathingPhase(prev => prev + delta);
    const breathingScale = 1 + Math.sin(breathingPhase * 1.5) * 0.02;
    groupRef.current.scale.setScalar(breathingScale);

    // Head movement based on state
    if (headRef.current) {
      switch (animationState) {
        case 'listening':
          headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.05;
          headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
          break;
        case 'talking':
          setTalkingPhase(prev => prev + delta * 8);
          if (mouthRef.current) {
            mouthRef.current.scale.y = 0.3 + Math.sin(talkingPhase) * 0.2;
          }
          break;
        case 'thinking':
          headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
          break;
        default:
          // Idle subtle movements
          headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
          headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
      }
    }

    // Blinking animation
    setBlinkTimer(prev => prev + delta);
    if (blinkTimer > 3 + Math.random() * 2) {
      setBlinkTimer(0);
      if (eyesRef.current) {
        eyesRef.current.scale.y = 0.1;
        setTimeout(() => {
          if (eyesRef.current) eyesRef.current.scale.y = 1;
        }, 150);
      }
    }

    // Emotion-based posture
    if (groupRef.current) {
      switch (emotion) {
        case 'happy':
          groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 0.1;
          break;
        case 'concerned':
          groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1) * 0.02;
          break;
        case 'professional':
          groupRef.current.position.y = 0;
          groupRef.current.rotation.z = 0;
          break;
      }
    }
  });

  return (
    <group ref={groupRef} onClick={() => onInteraction?.('click')}>
      {/* Head */}
      <group ref={headRef} position={[0, 1.6, 0]}>
        <Sphere args={[0.12, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#fdbcb4" 
            roughness={0.6} 
            metalness={0.1}
            transparent
            opacity={0.95}
          />
        </Sphere>

        {/* Eyes */}
        <group ref={eyesRef}>
          <Sphere args={[0.015, 16, 16]} position={[-0.03, 0.02, 0.11]}>
            <meshStandardMaterial color="#2d3748" />
          </Sphere>
          <Sphere args={[0.015, 16, 16]} position={[0.03, 0.02, 0.11]}>
            <meshStandardMaterial color="#2d3748" />
          </Sphere>
          {/* Eye highlights */}
          <Sphere args={[0.005, 8, 8]} position={[-0.025, 0.025, 0.12]}>
            <meshStandardMaterial color="#ffffff" />
          </Sphere>
          <Sphere args={[0.005, 8, 8]} position={[0.035, 0.025, 0.12]}>
            <meshStandardMaterial color="#ffffff" />
          </Sphere>
        </group>

        {/* Nose */}
        <Sphere args={[0.008, 8, 8]} position={[0, -0.01, 0.115]}>
          <meshStandardMaterial color="#f7b2a3" />
        </Sphere>

        {/* Mouth */}
        <Sphere 
          ref={mouthRef}
          args={[0.025, 16, 8]} 
          position={[0, -0.04, 0.105]} 
          scale={[1, 0.3, 0.5]}
        >
          <meshStandardMaterial 
            color={isSpeaking ? "#ff6b9d" : "#d53f8c"} 
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Hair */}
        <Sphere args={[0.13, 16, 16]} position={[0, 0.05, -0.02]} scale={[1, 0.8, 0.9]}>
          <meshStandardMaterial color="#4a5568" roughness={0.8} />
        </Sphere>
      </group>

      {/* Neck */}
      <Cylinder args={[0.04, 0.05, 0.15, 16]} position={[0, 1.45, 0]}>
        <meshStandardMaterial color="#fdbcb4" />
      </Cylinder>

      {/* Torso */}
      <Box args={[0.25, 0.4, 0.15]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#3182ce" />
      </Box>

      {/* Arms */}
      <Cylinder args={[0.03, 0.025, 0.3, 12]} position={[-0.15, 1.25, 0]} rotation={[0, 0, 0.3]}>
        <meshStandardMaterial color="#fdbcb4" />
      </Cylinder>
      <Cylinder args={[0.03, 0.025, 0.3, 12]} position={[0.15, 1.25, 0]} rotation={[0, 0, -0.3]}>
        <meshStandardMaterial color="#fdbcb4" />
      </Cylinder>

      {/* Hands */}
      <Sphere args={[0.025, 12, 12]} position={[-0.22, 1.1, 0]}>
        <meshStandardMaterial color="#fdbcb4" />
      </Sphere>
      <Sphere args={[0.025, 12, 12]} position={[0.22, 1.1, 0]}>
        <meshStandardMaterial color="#fdbcb4" />
      </Sphere>

      {/* Status indicators */}
      {isListening && (
        <Sphere args={[0.02, 8, 8]} position={[0.15, 1.7, 0]}>
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </Sphere>
      )}

      {isSpeaking && (
        <Sphere args={[0.02, 8, 8]} position={[-0.15, 1.7, 0]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#3b82f6"
            emissiveIntensity={0.5}
          />
        </Sphere>
      )}
    </group>
  );
}

// Floating UI Panel Component
function FloatingPanel({ 
  position, 
  title, 
  children, 
  isVisible = true 
}: { 
  position: [number, number, number];
  title: string;
  children: React.ReactNode;
  isVisible?: boolean;
}) {
  return (
    <Html
      position={position}
      transform
      occlude
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <motion.div
        initial={{ scale: 0, rotateY: 90 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0, rotateY: -90 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 p-4 min-w-[280px]"
      >
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          {title}
        </h3>
        {children}
      </motion.div>
    </Html>
  );
}

// Main Avatar System Component
export function RealisticAvatarSystem() {
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [emotion, setEmotion] = useState<'neutral' | 'happy' | 'concerned' | 'professional'>('professional');
  const [messages, setMessages] = useState<AvatarMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activePanel, setActivePanel] = useState<'chat' | 'appointments' | 'settings' | null>('chat');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [appointments, setAppointments] = useState([
    { id: '1', time: '2:30 PM Today', doctor: 'Dr. Sarah Wilson', type: 'Consultation' },
    { id: '2', time: '10:00 AM Tomorrow', doctor: 'Dr. Michael Chen', type: 'Follow-up' }
  ]);

  // Speech Recognition Setup
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceInput(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        setAnimationState('idle');
      };

      setRecognition(recognitionInstance);
    }

    // Initialize Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }

    // Initialize with welcome message
    setTimeout(() => {
      addAvatarMessage("Hello! I'm Dr. AI, your virtual healthcare assistant. I can help you with appointments, health questions, and skin analysis. How can I assist you today?");
    }, 2000);
  }, []);

  const addUserMessage = (content: string) => {
    const message: AvatarMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addAvatarMessage = (content: string, emotion: 'neutral' | 'happy' | 'concerned' | 'professional' = 'professional') => {
    const message: AvatarMessage = {
      id: (Date.now() + 1).toString(),
      type: 'avatar',
      content,
      timestamp: new Date(),
      emotion
    };
    setMessages(prev => [...prev, message]);
    setEmotion(emotion);
    
    // Speak the message
    if (synthesis && isVoiceEnabled) {
      speakMessage(content);
    }
  };

  const speakMessage = (text: string) => {
    if (!synthesis) return;
    
    setIsSpeaking(true);
    setAnimationState('talking');
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setAnimationState('idle');
    };
    
    synthesis.speak(utterance);
  };

  const handleVoiceInput = (transcript: string) => {
    addUserMessage(transcript);
    processUserInput(transcript);
  };

  const startListening = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }
    
    setIsListening(true);
    setAnimationState('listening');
    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
    setAnimationState('idle');
  };

  const processUserInput = async (input: string) => {
    setAnimationState('thinking');
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerInput = input.toLowerCase();
    let response = '';
    let responseEmotion: 'neutral' | 'happy' | 'concerned' | 'professional' = 'professional';

    if (lowerInput.includes('appointment') || lowerInput.includes('book')) {
      response = "I'd be happy to help you schedule an appointment! I can see you have upcoming consultations. Would you like to book a new appointment or modify an existing one?";
      setActivePanel('appointments');
    } else if (lowerInput.includes('skin') || lowerInput.includes('acne') || lowerInput.includes('rash')) {
      response = "I can help you with skin concerns! Based on your symptoms, I recommend uploading photos for AI analysis or booking a consultation with our dermatologists. Would you like me to guide you through the process?";
      responseEmotion = 'concerned';
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      response = "Hello! It's wonderful to meet you. I'm here to assist with all your healthcare needs. What brings you here today?";
      responseEmotion = 'happy';
    } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
      response = "I'm here to help! I can assist with booking appointments, answering health questions, guiding you through our AI skin analysis, or connecting you with our medical professionals. What specific help do you need?";
    } else {
      response = "Thank you for your question. While I can provide general guidance, for specific medical concerns, I recommend consulting with one of our certified dermatologists. Would you like me to help you book a consultation?";
    }

    addAvatarMessage(response, responseEmotion);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    addUserMessage(inputMessage);
    processUserInput(inputMessage);
    setInputMessage('');
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      addAvatarMessage("Voice interaction enabled! You can now speak to me directly.", 'happy');
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <User className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">Loading 3D Avatar...</p>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 1.6, 1], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          {/* Avatar */}
          <Avatar3D
            animationState={animationState}
            isListening={isListening}
            isSpeaking={isSpeaking}
            emotion={emotion}
            onInteraction={(type) => {
              if (type === 'click') {
                setActivePanel(activePanel === 'chat' ? null : 'chat');
              }
            }}
          />

          {/* Floating Chat Panel */}
          <FloatingPanel
            position={[0.8, 1.8, 0]}
            title="💬 Chat with Dr. AI"
            isVisible={activePanel === 'chat'}
          >
            <div className="space-y-3">
              <ScrollArea className="h-32 w-full">
                <div className="space-y-2">
                  {messages.slice(-3).map((message) => (
                    <div
                      key={message.id}
                      className={`p-2 rounded-lg text-xs ${
                        message.type === 'user'
                          ? 'bg-blue-100 text-blue-900 ml-4'
                          : 'bg-gray-100 text-gray-900 mr-4'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex space-x-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="text-xs h-8"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="sm" onClick={handleSendMessage} className="h-8 w-8 p-0">
                  <MessageCircle className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </FloatingPanel>

          {/* Floating Appointments Panel */}
          <FloatingPanel
            position={[-0.8, 1.8, 0]}
            title="📅 Appointments"
            isVisible={activePanel === 'appointments'}
          >
            <div className="space-y-2">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium">{apt.time}</p>
                  <p className="text-xs text-gray-600">{apt.doctor}</p>
                  <Badge variant="outline" className="text-xs">{apt.type}</Badge>
                </div>
              ))}
              <Button size="sm" className="w-full text-xs h-7">
                <Calendar className="w-3 h-3 mr-1" />
                Book New
              </Button>
            </div>
          </FloatingPanel>

          {/* Floating Settings Panel */}
          <FloatingPanel
            position={[0, 2.2, 0]}
            title="⚙️ Settings"
            isVisible={activePanel === 'settings'}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Voice Interaction</span>
                <Button
                  size="sm"
                  variant={isVoiceEnabled ? "default" : "outline"}
                  onClick={toggleVoice}
                  className="h-6 w-12 text-xs"
                >
                  {isVoiceEnabled ? 'ON' : 'OFF'}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Animation</span>
                <Badge variant="secondary" className="text-xs">Active</Badge>
              </div>
            </div>
          </FloatingPanel>

          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.2} 
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 3, 2]} intensity={0.8} color="#8b5cf6" />
          <pointLight position={[5, 3, 2]} intensity={0.8} color="#3b82f6" />
          
          <Environment preset="studio" />
          <ContactShadows position={[0, 0.8, 0]} opacity={0.4} scale={2} blur={2} />
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.8}
            maxDistance={2}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </Suspense>

      {/* Control Panel */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Dr. AI Assistant</span>
              <Badge variant="secondary" className="text-xs">Online</Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant={isListening ? "destructive" : "outline"}
                onClick={isListening ? stopListening : startListening}
                className="h-8 w-8 p-0"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant={isVoiceEnabled ? "default" : "outline"}
                onClick={toggleVoice}
                className="h-8 w-8 p-0"
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={activePanel === 'chat' ? "default" : "outline"}
              onClick={() => setActivePanel(activePanel === 'chat' ? null : 'chat')}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </Button>
            <Button
              size="sm"
              variant={activePanel === 'appointments' ? "default" : "outline"}
              onClick={() => setActivePanel(activePanel === 'appointments' ? null : 'appointments')}
              className="flex-1"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Appointments
            </Button>
            <Button
              size="sm"
              variant={activePanel === 'settings' ? "default" : "outline"}
              onClick={() => setActivePanel(activePanel === 'settings' ? null : 'settings')}
              className="flex-1"
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="mt-3 flex space-x-2">
            <Button size="sm" variant="outline" className="text-xs">
              <Brain className="w-3 h-3 mr-1" />
              AI Analysis
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <Stethoscope className="w-3 h-3 mr-1" />
              Find Doctor
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <Heart className="w-3 h-3 mr-1" />
              Health Tips
            </Button>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="absolute top-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-xs">Voice {isListening ? 'Listening' : 'Ready'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-xs">Speech {isSpeaking ? 'Active' : 'Ready'}</span>
          </div>
        </div>
      </div>

      {/* Animation State Indicator */}
      <div className="absolute top-4 left-4">
        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
          {animationState === 'idle' && '😊 Ready to Help'}
          {animationState === 'listening' && '👂 Listening...'}
          {animationState === 'talking' && '💬 Speaking...'}
          {animationState === 'thinking' && '🤔 Thinking...'}
          {animationState === 'gesturing' && '👋 Gesturing'}
        </Badge>
      </div>
    </div>
  );
}