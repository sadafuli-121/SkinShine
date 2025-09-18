import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { TestimonialsSection } from '@/components/testimonials/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { FadeIn, SlideIn } from '@/components/layout/page-transition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Smartphone, 
  Brain,
  Star,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <FadeIn>
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    🇮🇳 Made for India
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Expert{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Dermatology Care
                    </span>{' '}
                    at Your Fingertips
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Connect with certified dermatologists for personalized consultations. 
                    Get AI-powered skin analysis, secure video consultations, and expert care 
                    in Hindi, English, and regional languages.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <EnhancedButton size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                    <Link href="/auth/register">
                      Get Started Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </EnhancedButton>
                  <EnhancedButton size="lg" variant="outline" className="group" asChild>
                    <Link href="/demo">
                      <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                      Watch Demo
                    </Link>
                  </EnhancedButton>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>DPDP Act Compliant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>End-to-End Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold">Quick Consultation</h3>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Brain className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">AI Skin Analysis</p>
                          <p className="text-sm text-gray-600">Get instant preliminary assessment</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Expert Consultation</p>
                          <p className="text-sm text-gray-600">Connect with certified dermatologists</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Secure & Private</p>
                          <p className="text-sm text-gray-600">Your data is protected</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <Link href="/ai-analysis">Start Free Analysis</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      
      {/* Features Section */}
      <SlideIn direction="up">
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Why Choose SkinShine?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine cutting-edge technology with expert medical care to provide 
                the best dermatology experience in India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>AI-Powered Analysis</CardTitle>
                  <CardDescription>
                    Get instant skin condition assessment using advanced AI technology 
                    trained on thousands of dermatological cases.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Certified Experts</CardTitle>
                  <CardDescription>
                    Connect with board-certified dermatologists with years of experience 
                    in treating Indian skin types and conditions.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Mobile-First Design</CardTitle>
                  <CardDescription>
                    Optimized for mobile devices with support for regional languages 
                    and seamless UPI payments.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    DPDP Act compliant with end-to-end encryption ensuring your 
                    medical data remains private and secure.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <CardTitle>24/7 Availability</CardTitle>
                  <CardDescription>
                    Book consultations at your convenience with flexible scheduling 
                    and emergency consultation options.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle>Holistic Care</CardTitle>
                  <CardDescription>
                    Complete skin care journey from diagnosis to treatment with 
                    follow-up care and lifestyle recommendations.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </SlideIn>
      
      {/* Stats Section */}
      <FadeIn delay={0.4}>
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-blue-100">Happy Patients</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-blue-100">Expert Doctors</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">50K+</div>
                <div className="text-blue-100">Consultations</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">4.9</div>
                <div className="text-blue-100 flex items-center justify-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Rating
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <SlideIn direction="up">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Ready to Transform Your Skin Care Journey?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied patients who trust SkinShine for their dermatology needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                <Link href="/auth/register">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </EnhancedButton>
              <EnhancedButton size="lg" variant="outline" asChild>
                <Link href="/find-doctors">Browse Doctors</Link>
              </EnhancedButton>
            </div>
          </div>
        </section>
      </SlideIn>

      <EnhancedFooter />
    </div>
  );
}