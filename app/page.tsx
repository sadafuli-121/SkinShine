'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { TestimonialsSection } from '@/components/testimonials/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaceModel } from '@/components/3d/FaceModel';
import { HumanModel } from '@/components/3d/HumanModel';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { 
  ParallaxSection,
  FadeInWhenVisible,
  SlideInFromLeft,
  SlideInFromRight,
  ScaleInWhenVisible,
  StaggerChildren,
  StaggerItem,
  FloatingElement,
  PulseGlow
} from '@/components/animations/ScrollAnimations';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Shield, Clock, Users, Smartphone, Brain, Star, CircleCheck as CheckCircle, ArrowRight, Play, Zap, Award, Globe, TrendingUp, Bot, User, Stethoscope } from 'lucide-react';

export default function Home() {
  // Initialize smooth scrolling
  useSmoothScroll();
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(147, 51, 234, 0.05) 50%, 
            rgba(236, 72, 153, 0.05) 100%)`,
          y: backgroundY
        }}
      />
      
      {/* Hero Section with 3D Face Model */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Background Elements */}
        <FloatingElement className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl" />
        <FloatingElement className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl" />
        <FloatingElement className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-15 blur-lg" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <SlideInFromLeft className="space-y-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all duration-300">
                    <Bot className="w-4 h-4 mr-2" />
                    AI-Powered Healthcare
                  </Badge>
                </motion.div>

                <motion.h1 
                  className="text-4xl lg:text-7xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Expert{' '}
                  <motion.span 
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 200%'
                    }}
                  >
                    Dermatology Care
                  </motion.span>{' '}
                  at Your Fingertips
                </motion.h1>

                <motion.p 
                  className="text-xl lg:text-2xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Connect with certified dermatologists for personalized consultations. 
                  Get AI-powered skin analysis and expert care 
                  in Hindi, English, and regional languages.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <PulseGlow>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300" 
                    asChild
                  >
                    <Link href="/auth/register">
                      <Zap className="mr-3 w-5 h-5" />
                      Get Started Free
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </Link>
                  </Button>
                </PulseGlow>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group text-lg px-8 py-4 border-2 hover:bg-gray-50 transition-all duration-300" 
                  asChild
                >
                  <Link href="/demo">
                    <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-8 text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">DPDP Act Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </motion.div>
            </SlideInFromLeft>
            
            {/* Right Content - 3D Face Model */}
            <SlideInFromRight className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="relative h-[600px] w-full"
              >
                {/* 3D Model Container */}
                <div className="relative h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden">
                  <FaceModel 
                    interactive={true}
                    autoRotate={true}
                    showConditions={true}
                  />
                  
                  {/* Floating UI Elements */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute top-6 right-6"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-900">AI Assistant</span>
                      </div>
                      <p className="text-xs text-gray-600">Click to start conversation</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="absolute bottom-6 left-6"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">3D Analysis</span>
                      </div>
                      <p className="text-xs text-gray-600">Interactive skin mapping</p>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
                />
              </motion.div>
            </SlideInFromRight>
          </div>
        </div>
      </section>
      
      {/* Features Section with Stagger Animation */}
      <section id="features" className="py-32 bg-gradient-to-b from-gray-50 to-white relative">
        <ParallaxSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible className="text-center space-y-6 mb-20">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Advanced Technology
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SkinShine?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We combine cutting-edge technology with expert medical care to provide 
                the best dermatology experience in India.
              </p>
            </FadeInWhenVisible>
            
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
              <StaggerItem>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white to-blue-50">
                    <CardHeader className="text-center">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Brain className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl mb-3">AI-Powered Analysis</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Get instant skin condition assessment using advanced AI technology 
                        trained on thousands of dermatological cases with 94% accuracy.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: -5,
                    z: 50
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white to-purple-50">
                    <CardHeader className="text-center">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={{ rotate: -360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Users className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl mb-3">Certified Experts</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Connect with board-certified dermatologists with years of experience 
                        in treating Indian skin types and conditions.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white to-green-50">
                    <CardHeader className="text-center">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Smartphone className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl mb-3">Mobile-First Design</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Optimized for mobile devices with support for regional languages 
                        and seamless UPI payments.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </StaggerItem>
              
              <StaggerItem>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: -5,
                    z: 50
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white to-red-50">
                    <CardHeader className="text-center">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={{ rotate: -360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Shield className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl mb-3">Privacy & Security</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        DPDP Act compliant with end-to-end encryption ensuring your 
                        medical data remains private and secure.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </StaggerItem>
              
              <StaggerItem>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white to-yellow-50">
                    <CardHeader className="text-center">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Clock className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl mb-3">24/7 Availability</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Book consultations at your convenience with flexible scheduling 
                        and emergency consultation options.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </StaggerItem>
              
              <StaggerItem>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: -5,
                    z: 50
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white to-indigo-50">
                    <CardHeader className="text-center">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={{ rotate: -360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Heart className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl mb-3">Holistic Care</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Complete skin care journey from diagnosis to treatment with 
                        follow-up care and lifestyle recommendations.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </StaggerItem>
            </StaggerChildren>
          </div>
        </ParallaxSection>
      </section>

      {/* 3D Human Model Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible className="text-center space-y-6 mb-20">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Interactive 3D Technology
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Explore Your{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skin Health
              </span>{' '}
              in 3D
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our interactive 3D human model helps you understand skin conditions and 
              visualize treatment areas with precision.
            </p>
          </FadeInWhenVisible>

          <ScaleInWhenVisible>
            <div className="relative h-[600px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden">
              <HumanModel 
                interactive={true}
                showAnatomicalPoints={true}
                autoRotate={true}
                onPointClick={(point) => {
                  console.log('Clicked anatomical point:', point);
                }}
              />
            </div>
          </ScaleInWhenVisible>
        </div>
      </section>
      
      {/* Stats Section with Parallax */}
      <ParallaxSection>
        <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          {/* Animated Background Pattern */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center" staggerDelay={0.2}>
              <StaggerItem>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="space-y-3"
                >
                  <motion.div 
                    className="text-5xl lg:text-6xl font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    10K+
                  </motion.div>
                  <div className="text-blue-100 text-lg">Happy Patients</div>
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Growing daily</span>
                  </div>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="space-y-3"
                >
                  <motion.div 
                    className="text-5xl lg:text-6xl font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    500+
                  </motion.div>
                  <div className="text-blue-100 text-lg">Expert Doctors</div>
                  <div className="flex items-center justify-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Certified</span>
                  </div>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="space-y-3"
                >
                  <motion.div 
                    className="text-5xl lg:text-6xl font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    50K+
                  </motion.div>
                  <div className="text-blue-100 text-lg">Consultations</div>
                  <div className="flex items-center justify-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Completed</span>
                  </div>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="space-y-3"
                >
                  <motion.div 
                    className="text-5xl lg:text-6xl font-bold flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    4.9
                  </motion.div>
                  <div className="text-blue-100 text-lg flex items-center justify-center">
                    <Star className="w-5 h-5 mr-1 fill-current" />
                    Rating
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Trusted globally</span>
                  </div>
                </motion.div>
              </StaggerItem>
            </StaggerChildren>
          </div>
        </section>
      </ParallaxSection>
      
      {/* 3D Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section with Parallax */}
      <ParallaxSection>
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Animated Background */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-0 w-full h-full opacity-5"
            style={{
              backgroundImage: `conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)`,
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-6">
                  Join Thousands of Satisfied Patients
                </Badge>
                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Ready to Transform Your{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Skin Care Journey?
                  </span>
                </h2>
                <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Join thousands of satisfied patients who trust SkinShine for their dermatology needs. 
                  Start your journey to healthier, more beautiful skin today.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <PulseGlow>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-10 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300" 
                    asChild
                  >
                    <Link href="/auth/register">
                      <Zap className="mr-3 w-6 h-6" />
                      Start Your Journey
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Link>
                  </Button>
                </PulseGlow>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-xl px-10 py-6 border-2 hover:bg-gray-50 transition-all duration-300" 
                  asChild
                >
                  <Link href="/find-doctors">
                    <Users className="mr-3 w-6 h-6" />
                    Browse Doctors
                  </Link>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-8 mt-12"
              >
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium">DPDP Act Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">ISO 27001 Certified</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Made in India 🇮🇳</span>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          </div>
        </section>
      </ParallaxSection>

      <EnhancedFooter />
    </div>
  );
}