'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box } from '@react-three/drei';
import { Mesh } from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, ZoomIn, ZoomOut, Move3D } from 'lucide-react';

interface SkinCondition {
  id: string;
  name: string;
  position: [number, number, number];
  severity: 'low' | 'medium' | 'high';
  description: string;
}

interface SkinModelProps {
  conditions?: SkinCondition[];
  onConditionClick?: (condition: SkinCondition) => void;
}

function SkinSphere({ conditions = [], onConditionClick }: SkinModelProps) {
  const meshRef = useRef<Mesh>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
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
      {/* Main skin model */}
      <Sphere ref={meshRef} args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#fdbcb4" 
          roughness={0.8} 
          metalness={0.1}
        />
      </Sphere>

      {/* Condition markers */}
      {conditions.map((condition) => (
        <group key={condition.id}>
          <Sphere
            args={[0.1, 8, 8]}
            position={condition.position}
            onClick={() => {
              setSelectedCondition(condition.id);
              onConditionClick?.(condition);
            }}
          >
            <meshStandardMaterial 
              color={getSeverityColor(condition.severity)}
              emissive={selectedCondition === condition.id ? getSeverityColor(condition.severity) : '#000000'}
              emissiveIntensity={selectedCondition === condition.id ? 0.3 : 0}
            />
          </Sphere>
          
          {selectedCondition === condition.id && (
            <Text
              position={[condition.position[0], condition.position[1] + 0.5, condition.position[2]]}
              fontSize={0.2}
              color="#1f2937"
              anchorX="center"
              anchorY="middle"
            >
              {condition.name}
            </Text>
          )}
        </group>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
    </group>
  );
}

export function SkinModel({ conditions = [], onConditionClick }: SkinModelProps) {
  const [selectedCondition, setSelectedCondition] = useState<SkinCondition | null>(null);

  const handleConditionClick = (condition: SkinCondition) => {
    setSelectedCondition(condition);
    onConditionClick?.(condition);
  };

  const resetView = () => {
    setSelectedCondition(null);
  };

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <SkinSphere conditions={conditions} onConditionClick={handleConditionClick} />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>

      {/* Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button size="sm" variant="outline" onClick={resetView}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4">
        <Card className="w-64">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Condition Severity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs">High Severity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs">Medium Severity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Low Severity</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Condition Info */}
      {selectedCondition && (
        <div className="absolute top-4 left-4">
          <Card className="w-80">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{selectedCondition.name}</CardTitle>
                <Badge variant={selectedCondition.severity === 'high' ? 'destructive' : 'secondary'}>
                  {selectedCondition.severity} severity
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{selectedCondition.description}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
