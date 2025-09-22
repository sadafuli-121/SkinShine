'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface SkinCondition {
  id: string;
  name: string;
  position: [number, number, number];
  severity: 'low' | 'medium' | 'high';
  description: string;
  color: string;
}

interface FaceModelProps {
  conditions?: SkinCondition[];
  interactive?: boolean;
  autoRotate?: boolean;
  showConditions?: boolean;
}

function AnimatedFace({ conditions = [], interactive = true, autoRotate = true, showConditions = true }: FaceModelProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (autoRotate && !hovered) {
        meshRef.current.rotation.y += delta * 0.3;
      }
      
      // Breathing effect
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      meshRef.current.scale.setScalar(breathingScale);
      
      // Subtle floating
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <group>
      {/* Main Face Model */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.3}
      >
        <Sphere
          ref={meshRef}
          args={[2.5, 64, 64]}
          position={[0, 0, 0]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color="#fdbcb4"
            attach="material"
            distort={hovered ? 0.3 : 0.1}
            speed={2}
            roughness={0.4}
            metalness={0.1}
          />
        </Sphere>
      </Float>

      {/* Facial Features */}
      {/* Eyes */}
      <Sphere args={[0.15, 16, 16]} position={[-0.6, 0.4, 2.2]}>
        <meshStandardMaterial color="#2d3748" />
      </Sphere>
      <Sphere args={[0.15, 16, 16]} position={[0.6, 0.4, 2.2]}>
        <meshStandardMaterial color="#2d3748" />
      </Sphere>

      {/* Nose */}
      <Sphere args={[0.08, 8, 8]} position={[0, 0, 2.4]}>
        <meshStandardMaterial color="#f7b2a3" />
      </Sphere>

      {/* Mouth */}
      <Sphere args={[0.3, 16, 8]} position={[0, -0.4, 2.1]} scale={[1, 0.3, 0.5]}>
        <meshStandardMaterial color="#d53f8c" />
      </Sphere>

      {/* Condition Markers */}
      {showConditions && conditions.map((condition) => (
        <group key={condition.id}>
          <Float
            speed={2}
            rotationIntensity={0.1}
            floatIntensity={0.2}
          >
            <Sphere
              args={[0.08, 12, 12]}
              position={condition.position}
              onClick={() => setSelectedCondition(
                selectedCondition === condition.id ? null : condition.id
              )}
            >
              <meshStandardMaterial 
                color={condition.color}
                emissive={selectedCondition === condition.id ? condition.color : '#000000'}
                emissiveIntensity={selectedCondition === condition.id ? 0.4 : 0}
                transparent
                opacity={0.8}
              />
            </Sphere>
          </Float>
          
          {selectedCondition === condition.id && (
            <Float speed={1} floatIntensity={0.1}>
              <Text
                position={[condition.position[0], condition.position[1] + 0.8, condition.position[2]]}
                fontSize={0.15}
                color="#1f2937"
                anchorX="center"
                anchorY="middle"
                maxWidth={2}
              >
                {condition.name}
              </Text>
            </Float>
          )}
        </group>
      ))}

      {/* Dynamic Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={0.6} color="#3b82f6" />
      
      {/* Environment for reflections */}
      <Environment preset="studio" />
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </motion.div>
        <p className="text-gray-600 font-medium">Loading 3D Face Model...</p>
        <p className="text-sm text-gray-500 mt-1">Preparing interactive experience</p>
      </motion.div>
    </div>
  );
}

export function FaceModel({ 
  conditions = [], 
  interactive = true, 
  autoRotate = true, 
  showConditions = true 
}: FaceModelProps) {
  const [selectedCondition, setSelectedCondition] = useState<SkinCondition | null>(null);

  const defaultConditions: SkinCondition[] = [
    {
      id: '1',
      name: 'Mild Acne',
      position: [1.2, 0.3, 1.8],
      severity: 'medium',
      description: 'Small inflammatory lesions detected',
      color: '#f59e0b'
    },
    {
      id: '2',
      name: 'Dry Patch',
      position: [-1.0, -0.5, 1.9],
      severity: 'low',
      description: 'Area requiring moisturization',
      color: '#10b981'
    },
    {
      id: '3',
      name: 'Sun Damage',
      position: [0.5, 0.8, 2.0],
      severity: 'medium',
      description: 'UV-induced pigmentation',
      color: '#ef4444'
    }
  ];

  const displayConditions = conditions.length > 0 ? conditions : defaultConditions;

  const handleConditionClick = (condition: SkinCondition) => {
    setSelectedCondition(selectedCondition?.id === condition.id ? null : condition);
  };

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <AnimatedFace 
            conditions={displayConditions}
            interactive={interactive}
            autoRotate={autoRotate}
            showConditions={showConditions}
          />
          {interactive && (
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={12}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
            />
          )}
        </Canvas>
      </Suspense>

      {/* Condition Info Panel */}
      {selectedCondition && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="absolute top-4 right-4 w-72"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{selectedCondition.name}</h3>
              <Badge 
                variant={selectedCondition.severity === 'high' ? 'destructive' : 'secondary'}
                className={selectedCondition.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
              >
                {selectedCondition.severity} severity
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{selectedCondition.description}</p>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}