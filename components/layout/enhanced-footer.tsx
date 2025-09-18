'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Shield,
  Award,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone
} from 'lucide-react';

export function EnhancedFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Successfully subscribed to our newsletter!');
    setEmail('');
    setIsSubscribing(false);
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
  ];

  const quickLinks = [
    { href: '/find-doctors', label: 'Find Doctors' },
    { href: '/ai-analysis', label: 'AI Skin Analysis' },
    { href: '/learn', label: 'Skin Care Tips' },
    { href: '/appointments', label: 'Book Appointment' },
    { href: '/for-doctors', label: 'For Healthcare Providers' },
    { href: '/pwa', label: 'Mobile App' },
  ];

  const supportLinks = [
    { href: '/help', label: 'Help Center' },
    { href: '/contact', label: 'Contact Support' },
    { href: '/faq', label: 'FAQ' },
    { href: '/live-chat', label: 'Live Chat' },
    { href: '/feedback', label: 'Feedback' },
    { href: '/bug-report', label: 'Report Issue' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/medical-disclaimer', label: 'Medical Disclaimer' },
    { href: '/data-protection', label: 'Data Protection' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/compliance', label: 'DPDP Compliance' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About SkinShine' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press & Media' },
    { href: '/investors', label: 'Investors' },
    { href: '/partnerships', label: 'Partnerships' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Stay Updated with Skin Care Tips
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Get weekly expert tips, treatment updates, and exclusive offers delivered to your inbox
              </p>
              
              <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-100"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubscribing}
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    {isSubscribing ? (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">SkinShine</span>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  India's leading telemedicine platform for dermatology care. We connect patients 
                  with certified dermatologists through AI-powered analysis, secure video consultations, 
                  and comprehensive skin care solutions.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-gray-300">
                      123 Healthcare Plaza, Cyber City, Gurgaon, Haryana 122002
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">support@skinshine.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-300">24/7 Support Available</span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-600">
                    <Shield className="w-3 h-3 mr-1" />
                    DPDP Compliant
                  </Badge>
                  <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-600">
                    <Award className="w-3 h-3 mr-1" />
                    ISO 27001
                  </Badge>
                  <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    HIPAA Ready
                  </Badge>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
                <ul className="space-y-3">
                  {supportLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* App Download */}
                <div className="mt-6">
                  <h5 className="text-sm font-semibold mb-3 text-white">Download App</h5>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-800">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Install PWA
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom Section */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Copyright */}
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-sm">
                  © 2024 SkinShine Healthcare Pvt Ltd. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Registered in India | CIN: U85100DL2024PTC123456
                </p>
              </div>

              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm mr-2">Follow us:</span>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-all duration-200 hover:scale-110 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">
                {legalLinks.map((link, index) => (
                  <span key={link.href} className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                    {index < legalLinks.length - 1 && (
                      <span className="text-gray-600 mx-2">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">SSL Secured</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">Certified Doctors</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-300">10K+ Patients</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Globe className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-300">Made in India 🇮🇳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}