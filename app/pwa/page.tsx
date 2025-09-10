'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Smartphone, 
  Download, 
  Wifi, 
  WifiOff,
  Bell,
  Settings,
  Shield,
  Zap,
  HardDrive,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function PWAPage() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [cacheSize, setCacheSize] = useState(0);
  const [settings, setSettings] = useState({
    offlineMode: true,
    backgroundSync: true,
    pushNotifications: true,
    autoUpdate: true
  });
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    };

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate cache size calculation
    setCacheSize(Math.floor(Math.random() * 50) + 10);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      toast.error('Installation not available on this device');
      return;
    }

    const result = await installPrompt.prompt();
    if (result.outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
      toast.success('SkinShine installed successfully!');
    }
    setInstallPrompt(null);
  };

  const clearCache = () => {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
      setCacheSize(0);
      toast.success('Cache cleared successfully');
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast.success('Notifications enabled');
        setSettings({...settings, pushNotifications: true});
      } else {
        toast.error('Notification permission denied');
        setSettings({...settings, pushNotifications: false});
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Progressive Web App</h1>
          <p className="text-gray-600">
            Install SkinShine as a mobile app for the best experience
          </p>
        </div>

        {/* Installation Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-6 h-6" />
              <span>App Installation</span>
            </CardTitle>
            <CardDescription>
              Get the native app experience with offline support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isInstalled ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {isInstalled ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Download className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {isInstalled ? 'App Installed' : 'Install SkinShine'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isInstalled 
                      ? 'You\'re using the installed version'
                      : 'Add to home screen for quick access'
                    }
                  </p>
                </div>
              </div>
              
              {!isInstalled && (
                <Button 
                  onClick={handleInstall}
                  disabled={!isInstallable}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install App
                </Button>
              )}
            </div>

            {!isInstallable && !isInstalled && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Installation Not Available</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      To install the app, use Chrome or Edge browser and visit this page again.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PWA Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Offline Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="w-5 h-5 text-green-600" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-600" />
                )}
                <span>Offline Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Offline Mode</Label>
                  <p className="text-sm text-gray-600">Access cached content when offline</p>
                </div>
                <Switch 
                  checked={settings.offlineMode}
                  onCheckedChange={(checked) => setSettings({...settings, offlineMode: checked})}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cache Size</span>
                  <span>{cacheSize} MB</span>
                </div>
                <Progress value={(cacheSize / 100) * 100} className="h-2" />
                <Button variant="outline" size="sm" onClick={clearCache} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Push Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive notifications even when app is closed</p>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onCheckedChange={requestNotificationPermission}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Background Sync</Label>
                  <p className="text-sm text-gray-600">Sync data when connection is restored</p>
                </div>
                <Switch 
                  checked={settings.backgroundSync}
                  onCheckedChange={(checked) => setSettings({...settings, backgroundSync: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Auto Update</Label>
                  <p className="text-sm text-gray-600">Automatically update to latest version</p>
                </div>
                <Switch 
                  checked={settings.autoUpdate}
                  onCheckedChange={(checked) => setSettings({...settings, autoUpdate: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PWA Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Progressive Web App Benefits</CardTitle>
            <CardDescription>
              Why install SkinShine as a mobile app?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Lightning Fast</h4>
                    <p className="text-sm text-gray-600">Instant loading with cached content</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <WifiOff className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Works Offline</h4>
                    <p className="text-sm text-gray-600">Access your data without internet</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Never miss important updates</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Secure</h4>
                    <p className="text-sm text-gray-600">HTTPS and secure storage</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <HardDrive className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Small Size</h4>
                    <p className="text-sm text-gray-600">Much smaller than native apps</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Auto Updates</h4>
                    <p className="text-sm text-gray-600">Always up to date automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}