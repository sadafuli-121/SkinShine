'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  Book,
  Video,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle
} from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      faqs: [
        {
          question: 'How do I create an account on SkinShine?',
          answer: 'Creating an account is simple! Click "Get Started" on our homepage, choose whether you\'re a patient or healthcare provider, fill in your basic information, and verify your email. The entire process takes less than 3 minutes.'
        },
        {
          question: 'Is SkinShine free to use?',
          answer: 'Registration and basic features are completely free. You only pay for consultations with doctors. Our AI analysis tool is free for all registered users. Consultation fees vary by doctor and typically range from ₹300-₹1500.'
        },
        {
          question: 'How does the AI skin analysis work?',
          answer: 'Our AI has been trained on thousands of dermatological images. Simply upload clear photos of your skin concern, answer a few questions, and our AI will provide an analysis with confidence levels and recommendations. Results are available instantly.'
        }
      ]
    },
    {
      id: 'consultations',
      title: 'Consultations',
      icon: Video,
      faqs: [
        {
          question: 'How do I book a consultation with a dermatologist?',
          answer: 'Go to "Find Doctors", browse our certified dermatologists, select your preferred doctor, choose a convenient time slot, and complete the payment. You\'ll receive confirmation and joining instructions via email and SMS.'
        },
        {
          question: 'What\'s the difference between video and chat consultations?',
          answer: 'Video consultations allow face-to-face interaction with the doctor and visual examination of your skin. Chat consultations are text-based and typically cost 30% less. Both include prescription and follow-up care.'
        },
        {
          question: 'Can I reschedule or cancel my appointment?',
          answer: 'Yes, you can reschedule or cancel appointments up to 2 hours before the scheduled time through your dashboard. Cancellations made within 2 hours may incur a small fee as per our policy.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: Shield,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, RuPay), net banking, and digital wallets. All payments are processed securely through Razorpay.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Absolutely! We use industry-standard encryption and comply with PCI DSS standards. We never store your payment information on our servers. All transactions are processed through secure, certified payment gateways.'
        },
        {
          question: 'Can I get a refund if I\'m not satisfied?',
          answer: 'We offer refunds for technical issues or if a consultation couldn\'t be completed due to our platform issues. Refunds are processed within 5-7 business days. Please contact our support team for assistance.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: HelpCircle,
      faqs: [
        {
          question: 'What devices and browsers are supported?',
          answer: 'SkinShine works on all modern devices and browsers including Chrome, Firefox, Safari, and Edge. Our mobile app (PWA) can be installed on both Android and iOS devices for the best experience.'
        },
        {
          question: 'I\'m having trouble with video calls. What should I do?',
          answer: 'Ensure you have a stable internet connection, allow camera and microphone permissions, and use a supported browser. If issues persist, try refreshing the page or switching to chat consultation. Our support team is available 24/7.'
        },
        {
          question: 'How do I install the mobile app?',
          answer: 'Visit our website on your mobile browser, tap the "Install" prompt, or go to Settings > Add to Home Screen. The app works offline and provides push notifications for appointments and reminders.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      available: '24/7',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      action: '+91 98765 43210',
      available: '9 AM - 9 PM',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed queries',
      action: 'support@skinshine.com',
      available: '24 hours response',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help topics, features, or common issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find quick answers to the most common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="getting-started" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    {faqCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <TabsTrigger key={category.id} value={category.id} className="text-xs">
                          <Icon className="w-4 h-4 mr-1" />
                          {category.title}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {faqCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id}>
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`${category.id}-${index}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Need more help? Our team is here for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{method.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-600">{method.action}</span>
                            <Badge variant="outline" className="text-xs">
                              {method.available}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Book className="w-4 h-4 mr-2" />
                  User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Terms of Service
                </Button>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Analysis</span>
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Gateway</span>
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EnhancedFooter />
    </div>
  );
}