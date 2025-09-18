import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn } from '@/components/layout/page-transition';
import Link from 'next/link';
import { 
  Stethoscope, 
  Users, 
  TrendingUp, 
  Shield,
  Clock,
  IndianRupee,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  MessageCircle,
  Brain
} from 'lucide-react';

export default function ForDoctorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <FadeIn>
        <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                For Healthcare Providers
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Expand Your{' '}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Dermatology Practice
                </span>{' '}
                Online
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Join SkinShine's network of certified dermatologists. Reach more patients, 
                provide expert consultations, and grow your practice with our advanced platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" asChild>
                  <Link href="/auth/register">
                    Join as Doctor
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/demo">
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      
      {/* Benefits Section */}
      <SlideIn direction="up">
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Why Join SkinShine?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to provide excellent dermatology care online
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Reach More Patients</CardTitle>
                  <CardDescription>
                    Connect with patients across India through our platform. 
                    Expand your practice beyond geographical limitations.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Increase Revenue</CardTitle>
                  <CardDescription>
                    Set your own consultation fees and work flexible hours. 
                    Earn more with video and chat consultations.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>AI-Assisted Diagnosis</CardTitle>
                  <CardDescription>
                    Use our AI tools to enhance your diagnostic capabilities 
                    and provide better patient care.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <CardTitle>Flexible Schedule</CardTitle>
                  <CardDescription>
                    Set your own availability and work hours. 
                    Perfect for part-time or full-time practice.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle>Secure Platform</CardTitle>
                  <CardDescription>
                    DPDP Act compliant platform with end-to-end encryption 
                    for all patient communications.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <IndianRupee className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle>Easy Payments</CardTitle>
                  <CardDescription>
                    Automatic payment processing with UPI and card support. 
                    Get paid instantly after consultations.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </SlideIn>

      {/* Stats Section */}
      <FadeIn delay={0.4}>
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-purple-100">Active Doctors</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">₹45K</div>
                <div className="text-purple-100">Avg Monthly Earnings</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">50K+</div>
                <div className="text-purple-100">Consultations Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">4.9</div>
                <div className="text-purple-100 flex items-center justify-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Doctor Rating
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA Section */}
      <SlideIn direction="up">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Ready to Join Our Network?
            </h2>
            <p className="text-xl text-gray-600">
              Start providing online consultations and grow your dermatology practice today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" asChild>
                <Link href="/auth/register">
                  Register as Doctor
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </SlideIn>

      <EnhancedFooter />
    </div>
  );
}