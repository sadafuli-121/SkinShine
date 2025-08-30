'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PerformanceOptimizer } from '@/lib/optimizations';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  lazy?: boolean;
  fallback?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  quality = 80,
  lazy = true,
  fallback = '/placeholder-image.jpg'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = PerformanceOptimizer.createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer?.unobserve(entry.target);
          }
        });
      }
    );

    if (imgRef.current && observer) {
      observer.observe(imgRef.current);
    }

    return () => observer?.disconnect();
  }, [lazy]);

  const optimizedSrc = PerformanceOptimizer.optimizeImageUrl(src, width, height, quality);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {isInView && (
        <motion.img
          src={error ? fallback : optimizedSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setError(true);
            setIsLoaded(true);
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}