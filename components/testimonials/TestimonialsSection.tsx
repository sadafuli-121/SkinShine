'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInWhenVisible, ParallaxSection } from '@/components/animations/ScrollAnimations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  location: string;
  condition: string;
  verified: boolean;
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      title: 'Software Engineer',
      company: 'Tech Solutions Pvt Ltd',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      review: 'SkinShine transformed my skin care routine completely! The AI analysis was incredibly accurate, and Dr. Kumar\'s treatment plan worked wonders. My acne cleared up in just 6 weeks. The video consultations were so convenient - no more waiting in clinics!',
      location: 'Mumbai, Maharashtra',
      condition: 'Acne Treatment',
      verified: true
    },
    {
      id: '2',
      name: 'Rajesh Patel',
      title: 'Business Owner',
      company: 'Patel Enterprises',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      review: 'As a busy entrepreneur, I couldn\'t find time for regular dermatologist visits. SkinShine\'s platform made it so easy to get expert care from home. Dr. Anjali helped me with my psoriasis, and the results have been amazing. Highly recommend!',
      location: 'Ahmedabad, Gujarat',
      condition: 'Psoriasis Management',
      verified: true
    },
    {
      id: '3',
      name: 'Meera Krishnan',
      title: 'Teacher',
      company: 'St. Mary\'s School',
      avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      review: 'The multi-language support in Tamil was a game-changer for me. I could explain my skin concerns clearly, and the doctor understood everything perfectly. The AI skin analysis gave me insights I never knew about my skin. Excellent service!',
      location: 'Chennai, Tamil Nadu',
      condition: 'Skin Pigmentation',
      verified: true
    },
    {
      id: '4',
      name: 'Arjun Singh',
      title: 'Marketing Manager',
      company: 'Digital Marketing Co.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      review: 'I was skeptical about online consultations, but SkinShine exceeded my expectations. The 3D skin analysis was fascinating, and Dr. Sharma\'s expertise really showed. My eczema is now under control, and I feel confident about my skin again.',
      location: 'Delhi, NCR',
      condition: 'Eczema Treatment',
      verified: true
    },
    {
      id: '5',
      name: 'Kavya Reddy',
      title: 'Graphic Designer',
      company: 'Creative Studio',
      avatar: 'https://images.pexels.com/photos/3763153/pexels-photo-3763153.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      review: 'The convenience of booking appointments through the app is unmatched. I love how I can track my skin progress with the analytics dashboard. The doctors are incredibly knowledgeable, and the treatment plans are personalized perfectly.',
      location: 'Hyderabad, Telangana',
      condition: 'Anti-aging Treatment',
      verified: true
    },
    {
      id: '6',
      name: 'Rohit Gupta',
      title: 'Financial Analyst',
      company: 'Investment Bank',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      review: 'SkinShine\'s AI-powered analysis detected early signs of skin damage that I hadn\'t noticed. The preventive care recommendations have been invaluable. The payment system with UPI made everything seamless. Truly innovative healthcare!',
      location: 'Bangalore, Karnataka',
      condition: 'Preventive Care',
      verified: true
    }
  ];

  // Auto-rotation logic
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 6000); // 6 seconds per testimonial
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <ParallaxSection>
      <section className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden relative">
        {/* Animated Background Pattern */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInWhenVisible className="text-center mb-20">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-4">
              Patient Stories
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              What Our Patients Say
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Real stories from real patients who transformed their skin health with SkinShine
            </p>
        </FadeInWhenVisible>

        {/* 3D Testimonials Carousel */}
        <div 
          className="relative perspective-1000 mb-16"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ 
                  opacity: 0, 
                  rotateY: 180, 
                  scale: 0.8,
                  z: -200 
                }}
                animate={{ 
                  opacity: 1, 
                  rotateY: 0, 
                  scale: 1,
                  z: 0 
                }}
                exit={{ 
                  opacity: 0, 
                  rotateY: -180, 
                  scale: 0.8,
                  z: -200 
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.4, 0.0, 0.2, 1] 
                }}
                className="absolute inset-0 flex items-center justify-center preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    z: 50
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="max-w-5xl w-full mx-auto shadow-3xl bg-white/95 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
                    <CardContent className="p-8 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      {/* Customer Info */}
                      <div className="text-center lg:text-left">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="relative inline-block mb-6"
                        >
                          <Avatar className="w-24 h-24 mx-auto lg:mx-0 ring-4 ring-blue-100">
                            <AvatarImage 
                              src={testimonials[currentIndex].avatar} 
                              alt={testimonials[currentIndex].name} 
                            />
                            <AvatarFallback className="text-2xl">
                              {testimonials[currentIndex].name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {testimonials[currentIndex].verified && (
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {testimonials[currentIndex].name}
                          </h3>
                          <p className="text-blue-600 font-medium mb-1">
                            {testimonials[currentIndex].title}
                          </p>
                          <p className="text-gray-600 text-sm mb-3">
                            {testimonials[currentIndex].company}
                          </p>
                          <p className="text-gray-500 text-sm mb-4">
                            📍 {testimonials[currentIndex].location}
                          </p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {testimonials[currentIndex].condition}
                          </Badge>
                        </motion.div>
                      </div>

                      {/* Review Content */}
                      <div className="lg:col-span-2">
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                        >
                          {/* Rating */}
                          <div className="flex items-center justify-center lg:justify-start mb-6">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-6 h-6 ${
                                  i < testimonials[currentIndex].rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-lg font-semibold text-gray-900">
                              {testimonials[currentIndex].rating}.0
                            </span>
                          </div>

                          {/* Quote */}
                          <div className="relative">
                            <Quote className="absolute -top-4 -left-2 w-8 h-8 text-blue-200" />
                            <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic pl-6">
                              "{testimonials[currentIndex].review}"
                            </blockquote>
                          </div>

                          {/* Treatment Success Badge */}
                          <div className="mt-6 flex items-center justify-center lg:justify-start">
                            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                              ✨ Treatment Successful
                            </Badge>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-6">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Auto-play Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleAutoPlay}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1</span>
              <span>{testimonials.length}</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <FadeInWhenVisible className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <motion.div 
              className="text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              10,000+
            </motion.div>
            <div className="text-gray-600">Happy Patients</div>
          </div>
          <div className="space-y-2">
            <motion.div 
              className="text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              4.9/5
            </motion.div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="space-y-2">
            <motion.div 
              className="text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              95%
            </motion.div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="space-y-2">
            <motion.div 
              className="text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              24/7
            </motion.div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </FadeInWhenVisible>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      </section>
    </ParallaxSection>
  );
}