'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder, Environment, Float, Text, MeshDistortMaterial } from '@react-three/drei';
import { Mesh, Vector3, Group } from 'three';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, ZoomIn, ZoomOut, Eye, Info } from 'lucide-react';

interface AnatomicalPoint {
  id: string;
  name: string;
  position: [number, number, number];
  description: string;
  category: 'head' | 'torso' | 'arms' | 'legs';
  commonConditions: string[];
}

interface HumanModelProps {
  interactive?: boolean;
  showAnatomicalPoints?: boolean;
  autoRotate?: boolean;
  onPointClick?: (point: AnatomicalPoint) => void;
}

function AnimatedHuman({ 
  interactive = true, 
  showAnatomicalPoints = true, 
  autoRotate = true,
  onPointClick 
}: HumanModelProps) {
  const groupRef = useRef<Group>(null);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  // Anatomical points for skin conditions
  const anatomicalPoints: AnatomicalPoint[] = [
    {
      id: 'face',
      name: 'Facial Skin',
      position: [0, 3.5, 0.8],
      description: 'Common area for acne, rosacea, and aging concerns',
      category: 'head',
      commonConditions: ['Acne', 'Rosacea', 'Melasma', 'Wrinkles']
    },
    {
      id: 'chest',
      name: 'Chest Area',
      position: [0, 1.5, 0.6],
      description: 'Often affected by acne, eczema, and sun damage',
      category: 'torso',
      commonConditions: ['Body Acne', 'Eczema', 'Sun Damage']
    },
    {
      id: 'arms',
      name: 'Arms & Hands',
      position: [1.8, 1, 0],
      description: 'Exposed to sun damage and contact dermatitis',
      category: 'arms',
      commonConditions: ['Psoriasis', 'Contact Dermatitis', 'Age Spots']
    },
    {
      id: 'legs',
      name: 'Legs & Feet',
      position: [0.6, -1.5, 0],
      description: 'Common for fungal infections and varicose veins',
      category: 'legs',
      commonConditions: ['Fungal Infections', 'Varicose Veins', 'Dry Skin']
    }
  ];

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Auto-rotation when not hovered
      if (autoRotate && !hovered) {
        groupRef.current.rotation.y += delta * 0.2;
      }
      
      // Breathing effect
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      groupRef.current.scale.setScalar(breathingScale);
      
      // Subtle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  const handlePointClick = (point: AnatomicalPoint) => {
    setSelectedPoint(selectedPoint === point.id ? null : point.id);
    onPointClick?.(point);
  };

  return (
    <group>
      <group 
        ref={groupRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Head */}
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere args={[0.8, 32, 32]} position={[0, 3.5, 0]}>
            <meshStandardMaterial color="#fdbcb4" roughness={0.6} metalness={0.1} />
          </Sphere>
        </Float>

        {/* Torso */}
        <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.1}>
          <Cylinder args={[1.2, 0.8, 2.5, 16]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#fdbcb4" roughness={0.6} metalness={0.1} />
          </Cylinder>
        </Float>

        {/* Arms */}
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.15}>
          <Cylinder args={[0.3, 0.25, 2, 12]} position={[1.8, 2, 0]} rotation={[0, 0, Math.PI / 6]}>
            <meshStandardMaterial color="#fdbcb4" roughness={0.6} metalness={0.1} />
          </Cylinder>
          <Cylinder args={[0.3, 0.25, 2, 12]} position={[-1.8, 2, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <meshStandardMaterial color="#fdbcb4" roughness={0.6} metalness={0.1} />
          </Cylinder>
        </Float>

        {/* Legs */}
        <Float speed={0.9} rotationIntensity={0.06} floatIntensity={0.12}>
          <Cylinder args={[0.4, 0.35, 2.5, 12]} position={[0.6, -1.5, 0]}>
            <meshStandardMaterial color="#fdbcb4" roughness={0.6} metalness={0.1} />
          </Cylinder>
          <Cylinder args={[0.4, 0.35, 2.5, 12]} position={[-0.6, -1.5, 0]}>
            <meshStandardMaterial color="#fdbcb4" roughness={0.6} metalness={0.1} />
          </Cylinder>
        </Float>

        {/* Anatomical Points */}
        {showAnatomicalPoints && anatomicalPoints.map((point) => (
          <group key={point.id}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
              <Sphere
                args={[0.08, 12, 12]}
                position={point.position}
                onClick={() => handlePointClick(point)}
              >
                <meshStandardMaterial 
                  color={selectedPoint === point.id ? '#ef4444' : '#3b82f6'}
                  emissive={selectedPoint === point.id ? '#ef4444' : '#3b82f6'}
                  emissiveIntensity={selectedPoint === point.id ? 0.4 : 0.2}
                  transparent
                  opacity={0.9}
                />
              </Sphere>
            </Float>
            
            {selectedPoint === point.id && (
              <Float speed={1} floatIntensity={0.1}>
                <Text
                  position={[point.position[0], point.position[1] + 0.8, point.position[2]]}
                  fontSize={0.12}
                  color="#1f2937"
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={2}
                >
                  {point.name}
                </Text>
              </Float>
            )}
          </group>
        ))}
      </group>

      {/* Lighting Setup */}
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
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
      
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
        <p className="text-gray-600 font-medium">Loading 3D Human Model...</p>
        <p className="text-sm text-gray-500 mt-1">Preparing interactive anatomy</p>
      </motion.div>
    </div>
  );
}

export function HumanModel({ 
  interactive = true, 
  showAnatomicalPoints = true, 
  autoRotate = true,
  onPointClick 
}: HumanModelProps) {
  const [selectedPoint, setSelectedPoint] = useState<AnatomicalPoint | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const anatomicalPoints: AnatomicalPoint[] = [
    {
      id: 'face',
      name: 'Facial Skin',
      position: [0, 3.5, 0.8],
      description: 'Most common area for acne, rosacea, melasma, and aging concerns. Requires specialized care due to sensitivity.',
      category: 'head',
      commonConditions: ['Acne', 'Rosacea', 'Melasma', 'Fine Lines', 'Dark Spots']
    },
    {
      id: 'chest',
      name: 'Chest & Neck',
      position: [0, 1.5, 0.6],
      description: 'Often affected by hormonal acne, sun damage, and skin texture issues. Important for overall skin health.',
      category: 'torso',
      commonConditions: ['Body Acne', 'Sun Damage', 'Keratosis Pilaris', 'Stretch Marks']
    },
    {
      id: 'arms',
      name: 'Arms & Hands',
      position: [1.8, 1, 0],
      description: 'Frequently exposed to environmental factors. Common site for contact dermatitis and age-related changes.',
      category: 'arms',
      commonConditions: ['Psoriasis', 'Contact Dermatitis', 'Age Spots', 'Dry Skin']
    },
    {
      id: 'legs',
      name: 'Legs & Feet',
      position: [0.6, -1.5, 0],
      description: 'Prone to circulation-related issues, fungal infections, and dryness. Requires specific care protocols.',
      category: 'legs',
      commonConditions: ['Fungal Infections', 'Varicose Veins', 'Dry Skin', 'Ingrown Hairs']
    }
  ];

  const handlePointClick = (point: AnatomicalPoint) => {
    setSelectedPoint(selectedPoint?.id === point.id ? null : point);
    onPointClick?.(point);
  };

  const resetView = () => {
    setSelectedPoint(null);
  };

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 2, 8], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <AnimatedHuman 
            interactive={interactive}
            showAnatomicalPoints={showAnatomicalPoints}
            autoRotate={autoRotate}
            onPointClick={handlePointClick}
          />
          {interactive && (
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={4}
              maxDistance={15}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI * 0.8}
              minPolarAngle={Math.PI * 0.2}
            />
          )}
        </Canvas>
      </Suspense>

      {/* Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button size="sm" variant="outline" onClick={resetView} className="bg-white/90 backdrop-blur-sm">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {/* Anatomical Point Info */}
      {selectedPoint && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="absolute top-4 left-4 w-80"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>{selectedPoint.name}</span>
                <Badge variant="outline" className="capitalize">
                  {selectedPoint.category}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{selectedPoint.description}</p>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Common Conditions:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedPoint.commonConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>Interactive Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs">Click to explore</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs">Selected area</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="text-xs text-gray-600 space-y-1">
              <p>🖱️ Drag to rotate</p>
              <p>🔍 Scroll to zoom</p>
              <p>👆 Click points to explore</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}