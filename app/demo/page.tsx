import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn } from '@/components/layout/page-transition';
import Link from 'next/link';
import { 
  Play, 
  Video, 
  Brain, 
  MessageCircle,
  Smartphone,
  Shield,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <FadeIn>
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                See SkinShine in Action
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Watch how our platform transforms dermatology care with AI-powered analysis, 
                expert consultations, and seamless user experience.
              </p>
              
              <div className="relative max-w-4xl mx-auto">
                <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Play className="w-8 h-8 mr-3" />
                      Watch Demo Video
                    </Button>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      
      {/* Features Demo */}
      <SlideIn direction="up">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
              <p className="text-gray-600">Experience all the features that make SkinShine special</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>AI Skin Analysis</CardTitle>
                  <CardDescription>
                    Advanced AI analyzes skin conditions with 94% accuracy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/ai-analysis">Try AI Analysis</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Video Consultations</CardTitle>
                  <CardDescription>
                    HD video calls with certified dermatologists
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/find-doctors">Book Consultation</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Real-time Chat</CardTitle>
                  <CardDescription>
                    Instant messaging with doctors and AI assistant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/real-time">Try Live Chat</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SlideIn>

      {/* CTA Section */}
      <FadeIn delay={0.4}>
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Experience SkinShine?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of users who trust SkinShine for their dermatology needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/learn">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      <EnhancedFooter />
    </div>
  );
}