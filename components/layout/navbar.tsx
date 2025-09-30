'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Heart, Menu, User, Calendar, MessageCircle, Settings, LogOut, Stethoscope, Search, BookOpen, Loader as Loader2 } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (href: string) => {
    if (pathname === href) return;
    
    setIsNavigating(true);
    router.push(href);
    setIsOpen(false);
    
    // Reset loading state after navigation
    setTimeout(() => setIsNavigating(false), 1000);
  };

  const patientNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: User },
    { href: '/find-doctors', label: 'Find Doctors', icon: Search },
    { href: '/appointments', label: 'Appointments', icon: Calendar },
    { href: '/consultations', label: 'Consultations', icon: MessageCircle },
    { href: '/learn', label: 'Learn', icon: BookOpen },
  ];

  const doctorNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Stethoscope },
    { href: '/schedule', label: 'Schedule', icon: Calendar },
    { href: '/patients', label: 'Patients', icon: User },
    { href: '/consultations', label: 'Consultations', icon: MessageCircle },
  ];

  const navItems = user?.role === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <>
      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkinShine
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                <>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </>
              ) : (
                <>
                  <button onClick={() => handleNavigation('/learn')} className="text-gray-600 hover:text-blue-600 transition-colors">
                    Learn
                  </button>
                  <button onClick={() => handleNavigation('/patient-stories')} className="text-gray-600 hover:text-blue-600 transition-colors">
                    Patient Stories
                  </button>
                  <button onClick={() => handleNavigation('/upload')} className="text-gray-600 hover:text-blue-600 transition-colors">
                    Upload Images
                  </button>
                  <button onClick={() => handleNavigation('/find-doctors')} className="text-gray-600 hover:text-blue-600 transition-colors">
                    Find Doctors
                  </button>
                  <button onClick={() => handleNavigation('/avatar')} className="text-gray-600 hover:text-blue-600 transition-colors">
                    3D Assistant
                  </button>
                  <button onClick={() => handleNavigation('/for-doctors')} className="text-gray-600 hover:text-blue-600 transition-colors">
                    For Doctors
                  </button>
                </>
              )}
            </div>

            {/* User Menu / Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-blue-600 capitalize">
                          {user.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" onClick={() => handleNavigation('/auth/login')}>
                    Login
                  </Button>
                  <Button onClick={() => handleNavigation('/auth/register')}>
                    Get Started
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-4">
                    {user ? (
                      <>
                        <div className="flex items-center space-x-2 p-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                          </div>
                        </div>
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.href}
                              onClick={() => handleNavigation(item.href)}
                              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-left w-full"
                            >
                              <Icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                        <Button variant="outline" onClick={logout} className="justify-start">
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleNavigation('/learn')}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                        >
                          Learn
                        </button>
                        <button
                          onClick={() => handleNavigation('/patient-stories')}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                        >
                          Patient Stories
                        </button>
                        <button
                          onClick={() => handleNavigation('/upload')}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                        >
                          Upload Images
                        </button>
                        <button
                          onClick={() => handleNavigation('/find-doctors')}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                        >
                          Find Doctors
                        </button>
                        <button
                          onClick={() => handleNavigation('/for-doctors')}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                        >
                          For Doctors
                        </button>
                        <div className="flex flex-col space-y-2 pt-4">
                          <Button variant="outline" onClick={() => handleNavigation('/auth/login')}>
                            Login
                          </Button>
                          <Button onClick={() => handleNavigation('/auth/register')}>
                            Get Started
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}