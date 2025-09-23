'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  Play, 
  Pause,
  Heart,
  CheckCircle,
  Calendar,
  MapPin,
  Award
} from 'lucide-react';

interface PatientStory {
  id: string;
  name: string;
  age: number;
  location: string;
  condition: string;
  treatmentDuration: string;
  avatar: string;
  story: string;
  rating: number;
  beforeImage?: string;
  afterImage?: string;
  doctorName: string;
  verified: boolean;
  treatmentDate: string;
  outcome: string;
}

export default function PatientStoriesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const patientStories: PatientStory[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      age: 28,
      location: 'Mumbai, Maharashtra',
      condition: 'Severe Acne',
      treatmentDuration: '3 months',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
      story: 'I struggled with severe acne for over 5 years. Traditional treatments never worked for me. When I found SkinShine, Dr. Kumar\'s personalized approach and the AI analysis changed everything. The platform made it so easy to track my progress and stay consistent with treatment. My confidence is completely restored!',
      rating: 5,
      doctorName: 'Dr. Rajesh Kumar',
      verified: true,
      treatmentDate: 'March 2024',
      outcome: '95% improvement in skin clarity'
    },
    {
      id: '2',
      name: 'Arjun Patel',
      age: 35,
      location: 'Ahmedabad, Gujarat',
      condition: 'Psoriasis',
      treatmentDuration: '6 months',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
      story: 'Living with psoriasis was affecting my work and personal life. The stigma was overwhelming. SkinShine\'s telemedicine approach gave me privacy and comfort. Dr. Anjali\'s treatment plan with regular video check-ins helped me manage my condition effectively. I can now wear short sleeves with confidence!',
      rating: 5,
      doctorName: 'Dr. Anjali Patel',
      verified: true,
      treatmentDate: 'January 2024',
      outcome: 'Significant reduction in flare-ups'
    },
    {
      id: '3',
      name: 'Meera Krishnan',
      age: 42,
      location: 'Chennai, Tamil Nadu',
      condition: 'Melasma',
      treatmentDuration: '4 months',
      avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=200',
      story: 'Post-pregnancy melasma made me very self-conscious. The Tamil language support on SkinShine was incredible - I could explain my concerns clearly. The AI analysis helped track my pigmentation changes, and Dr. Priya\'s treatment plan worked wonders. My skin tone is now more even than before pregnancy!',
      rating: 5,
      doctorName: 'Dr. Priya Sharma',
      verified: true,
      treatmentDate: 'February 2024',
      outcome: '80% reduction in pigmentation'
    },
    {
      id: '4',
      name: 'Rohit Singh',
      age: 31,
      location: 'Delhi, NCR',
      condition: 'Eczema',
      treatmentDuration: '5 months',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
      story: 'Chronic eczema was ruining my sleep and productivity. The 24/7 availability of SkinShine doctors was a game-changer. During flare-ups, I could get immediate consultation. The personalized skincare routine and medication adjustments through the app helped me achieve the best skin I\'ve had in years.',
      rating: 5,
      doctorName: 'Dr. Vikram Singh',
      verified: true,
      treatmentDate: 'December 2023',
      outcome: 'Complete control over eczema flare-ups'
    },
    {
      id: '5',
      name: 'Kavya Reddy',
      age: 26,
      location: 'Hyderabad, Telangana',
      condition: 'Premature Aging',
      treatmentDuration: '8 months',
      avatar: 'https://images.pexels.com/photos/3763153/pexels-photo-3763153.jpeg?auto=compress&cs=tinysrgb&w=200',
      story: 'Working night shifts in IT was taking a toll on my skin. Fine lines and dark circles made me look much older. SkinShine\'s anti-aging protocol with regular monitoring helped me reverse the damage. The convenience of video consultations fit perfectly with my schedule. I look younger now than I did 2 years ago!',
      rating: 5,
      doctorName: 'Dr. Anjali Patel',
      verified: true,
      treatmentDate: 'October 2023',
      outcome: 'Visible reduction in fine lines and improved skin texture'
    },
    {
      id: '6',
      name: 'Deepak Kumar',
      age: 45,
      location: 'Bangalore, Karnataka',
      condition: 'Rosacea',
      treatmentDuration: '7 months',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
      story: 'Rosacea was affecting my professional presentations and social interactions. The redness and burning sensation were unbearable. SkinShine\'s specialized rosacea treatment program with trigger identification helped me understand and manage my condition. The improvement has been life-changing!',
      rating: 5,
      doctorName: 'Dr. Priya Sharma',
      verified: true,
      treatmentDate: 'November 2023',
      outcome: '90% reduction in redness and irritation'
    },
    {
      id: '7',
      name: 'Anita Gupta',
      age: 38,
      location: 'Pune, Maharashtra',
      condition: 'Vitiligo',
      treatmentDuration: '12 months',
      avatar: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=200',
      story: 'Vitiligo diagnosis was devastating for me. The emotional support and advanced treatment options on SkinShine gave me hope. Dr. Kumar\'s comprehensive approach combining medical treatment with psychological support helped me accept and manage my condition. The community support feature connected me with others facing similar challenges.',
      rating: 5,
      doctorName: 'Dr. Rajesh Kumar',
      verified: true,
      treatmentDate: 'August 2023',
      outcome: 'Stabilized condition with improved self-confidence'
    },
    {
      id: '8',
      name: 'Rajesh Nair',
      age: 52,
      location: 'Kochi, Kerala',
      condition: 'Skin Cancer Screening',
      treatmentDuration: '2 months',
      avatar: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=200',
      story: 'As someone with a family history of skin cancer, regular screening was crucial. SkinShine\'s AI-powered mole analysis and Dr. Singh\'s expertise gave me peace of mind. The early detection protocol and regular monitoring through the platform helped identify a suspicious spot early. Grateful for the life-saving technology!',
      rating: 5,
      doctorName: 'Dr. Vikram Singh',
      verified: true,
      treatmentDate: 'May 2024',
      outcome: 'Early detection and successful treatment'
    }
  ];

  // Auto-rotation logic
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % patientStories.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, patientStories.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % patientStories.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? patientStories.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === ' ') {
      e.preventDefault();
      toggleAutoPlay();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-4">
                Real Patient Experiences
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Inspiring{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Recovery Stories
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Real patients, real results. Discover how SkinShine has transformed lives across India 
                with expert dermatology care, AI-powered analysis, and personalized treatment plans.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patient Stories Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Patient stories carousel"
          >
            {/* Main Carousel */}
            <div className="relative h-[600px] overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300, rotateY: 45 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -300, rotateY: -45 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0.0, 0.2, 1] 
                  }}
                  className="absolute inset-0"
                >
                  <Card className="h-full shadow-2xl bg-gradient-to-br from-white to-blue-50 border-0">
                    <CardContent className="p-8 lg:p-12 h-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
                        {/* Patient Info */}
                        <div className="space-y-6">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="relative"
                          >
                            <Avatar className="w-32 h-32 mx-auto lg:mx-0 ring-4 ring-blue-100 shadow-xl">
                              <AvatarImage 
                                src={patientStories[currentIndex].avatar} 
                                alt={patientStories[currentIndex].name}
                                className="object-cover"
                              />
                              <AvatarFallback className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                {patientStories[currentIndex].name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {patientStories[currentIndex].verified && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6, duration: 0.3 }}
                                className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                              >
                                <CheckCircle className="w-5 h-5 text-white" />
                              </motion.div>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-center lg:text-left space-y-4"
                          >
                            <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {patientStories[currentIndex].name}
                              </h2>
                              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 mb-2">
                                <span>{patientStories[currentIndex].age} years old</span>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{patientStories[currentIndex].location}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                {patientStories[currentIndex].condition}
                              </Badge>
                              <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{patientStories[currentIndex].treatmentDuration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Award className="w-4 h-4" />
                                  <span>{patientStories[currentIndex].doctorName}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                              <h4 className="font-semibold text-green-800 mb-1">Treatment Outcome</h4>
                              <p className="text-green-700 text-sm">{patientStories[currentIndex].outcome}</p>
                            </div>
                          </motion.div>
                        </div>

                        {/* Story Content */}
                        <div className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                          >
                            {/* Rating */}
                            <div className="flex items-center justify-center lg:justify-start mb-6">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                                >
                                  <Star
                                    className={`w-6 h-6 ${
                                      i < patientStories[currentIndex].rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </motion.div>
                              ))}
                              <span className="ml-3 text-lg font-semibold text-gray-900">
                                {patientStories[currentIndex].rating}.0
                              </span>
                            </div>

                            {/* Quote */}
                            <div className="relative">
                              <Quote className="absolute -top-4 -left-2 w-12 h-12 text-blue-200" />
                              <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic pl-8 mb-6">
                                "{patientStories[currentIndex].story}"
                              </blockquote>
                            </div>

                            {/* Treatment Details */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-blue-800">Treatment Started:</span>
                                  <p className="text-blue-700">{patientStories[currentIndex].treatmentDate}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-800">Duration:</span>
                                  <p className="text-blue-700">{patientStories[currentIndex].treatmentDuration}</p>
                                </div>
                              </div>
                            </div>

                            {/* Success Badge */}
                            <div className="flex items-center justify-center lg:justify-start">
                              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2">
                                <Heart className="w-4 h-4 mr-2" />
                                Treatment Successful
                              </Badge>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
                aria-label="Previous patient story"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dot Indicators */}
              <div className="flex space-x-2" role="tablist" aria-label="Patient story indicators">
                {patientStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125 shadow-lg'
                        : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                    }`}
                    aria-label={`Go to patient story ${index + 1}`}
                    role="tab"
                    aria-selected={index === currentIndex}
                  />
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
                aria-label="Next patient story"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Auto-play Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleAutoPlay}
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl"
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
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentIndex + 1) / patientStories.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Story {currentIndex + 1}</span>
                <span>{patientStories.length} Total</span>
              </div>
            </div>

            {/* Story Counter */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                {currentIndex + 1} of {patientStories.length} patient stories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-green-100">Success Stories</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold">95%</div>
              <div className="text-green-100">Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold">4.9/5</div>
              <div className="text-green-100">Patient Rating</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-green-100">Support Available</div>
            </motion.div>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}