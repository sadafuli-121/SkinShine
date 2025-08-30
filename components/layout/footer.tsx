import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SkinShine</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Expert dermatology care at your fingertips. Connect with certified dermatologists 
              for personalized consultations and AI-powered skin analysis.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@skinshine.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/find-doctors" className="text-gray-300 hover:text-white transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-gray-300 hover:text-white transition-colors">
                  Learn About Skin Care
                </Link>
              </li>
              <li>
                <Link href="/ai-analysis" className="text-gray-300 hover:text-white transition-colors">
                  AI Skin Analysis
                </Link>
              </li>
              <li>
                <Link href="/for-doctors" className="text-gray-300 hover:text-white transition-colors">
                  For Healthcare Providers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 SkinShine. All rights reserved. | Compliant with DPDP Act 2023
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-400 mt-4 md:mt-0">
            <MapPin className="w-4 h-4" />
            <span>Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}