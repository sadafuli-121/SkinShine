'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Languages, 
  Globe, 
  CheckCircle,
  Volume2,
  Type,
  Users,
  Heart,
  Mic
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

interface Translation {
  [key: string]: {
    [lang: string]: string;
  };
}

export default function MultiLanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const translations: Translation = {
    welcome: {
      en: 'Welcome to SkinShine',
      hi: 'स्किनशाइन में आपका स्वागत है',
      ta: 'ஸ்கின்ஷைனுக்கு வரவேற்கிறோம்',
      te: 'స్కిన్‌షైన్‌కు స్వాగతం',
      bn: 'স্কিনশাইনে স্বাগতম',
      mr: 'स्किनशाइनमध्ये आपले स्वागत आहे',
      gu: 'સ્કિનશાઇનમાં આપનું સ્વાગત છે',
      kn: 'ಸ್ಕಿನ್‌ಶೈನ್‌ಗೆ ಸ್ವಾಗತ',
      ml: 'സ്കിൻഷൈനിലേക്ക് സ്വാഗതം',
      pa: 'ਸਕਿਨਸ਼ਾਈਨ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ'
    },
    findDoctor: {
      en: 'Find a Doctor',
      hi: 'डॉक्टर खोजें',
      ta: 'மருத்துவரைக் கண்டறியவும்',
      te: 'వైద్యుడిని కనుగొనండి',
      bn: 'একজন ডাক্তার খুঁজুন',
      mr: 'डॉक्टर शोधा',
      gu: 'ડૉક્ટર શોધો',
      kn: 'ವೈದ್ಯರನ್ನು ಹುಡುಕಿ',
      ml: 'ഒരു ഡോക്ടറെ കണ്ടെത്തുക',
      pa: 'ਇੱਕ ਡਾਕਟਰ ਲੱਭੋ'
    },
    bookAppointment: {
      en: 'Book Appointment',
      hi: 'अपॉइंटमेंट बुक करें',
      ta: 'சந்திப்பை பதிவு செய்யுங்கள்',
      te: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
      bn: 'অ্যাপয়েন্টমেন্ট বুক করুন',
      mr: 'भेटीची वेळ बुक करा',
      gu: 'એપોઇન્ટમેન્ટ બુક કરો',
      kn: 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ',
      ml: 'അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക',
      pa: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ'
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setIsTranslating(true);
    setSelectedLanguage(langCode);
    
    // Simulate translation loading
    setTimeout(() => {
      setIsTranslating(false);
      const selectedLang = languages.find(l => l.code === langCode);
      toast.success(`Language changed to ${selectedLang?.nativeName}`);
    }, 1000);
  };

  const t = (key: string): string => {
    return translations[key]?.[selectedLanguage] || translations[key]?.['en'] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Multi-Language Support</h1>
          <p className="text-gray-600">
            SkinShine supports multiple Indian languages for better accessibility
          </p>
        </div>

        {/* Language Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-6 h-6" />
              <span>Choose Your Language</span>
            </CardTitle>
            <CardDescription>
              Select your preferred language for the best experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Language</Label>
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                          <span className="text-gray-500">({lang.name})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isTranslating && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Translating interface...</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Interface Preview</CardTitle>
            <CardDescription>
              See how the interface looks in your selected language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('welcome')}
                </h2>
                
                <div className="flex space-x-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    {t('findDoctor')}
                  </Button>
                  <Button variant="outline">
                    {t('bookAppointment')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Type className="w-5 h-5" />
                <span>Text Translation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Interface Translation</span>
                  <Badge variant="default">✓ Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medical Terms</span>
                  <Badge variant="default">✓ Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cultural Context</span>
                  <Badge variant="default">✓ Adapted</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>Voice Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voice Commands</span>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Text-to-Speech</span>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voice Translation</span>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EnhancedFooter />
    </div>
  );
}