'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardAnalytics } from '@/components/analytics/DashboardAnalytics';
import { DashboardSkeleton } from '@/components/ui/skeleton-loader';
import { FadeIn, SlideIn } from '@/components/layout/page-transition';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { 
  Calendar, 
  MessageCircle, 
  User, 
  Clock, 
  Star,
  TrendingUp,
  Users,
  Stethoscope,
  Heart,
  Brain,
  Shield,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isDoctor = user.role === 'doctor';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <FadeIn>
          <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                {isDoctor 
                  ? 'Manage your practice and help patients with their skin care needs'
                  : 'Continue your journey to healthier, more beautiful skin'
                }
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant={user.isVerified ? "default" : "secondary"}>
                {user.isVerified ? "Verified" : "Pending Verification"}
              </Badge>
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          </div>
        </FadeIn>

        {/* Quick Stats */}
        <SlideIn direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isDoctor ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">+12 this month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.totalConsultations || 0}</div>
                  <p className="text-xs text-muted-foreground">+23 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.rating || 0}</div>
                  <p className="text-xs text-muted-foreground">Based on 89 reviews</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹45,200</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Total completed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Tomorrow</div>
                  <p className="text-xs text-muted-foreground">2:30 PM with Dr. Sharma</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skin Score</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85</div>
                  <p className="text-xs text-muted-foreground">Improving (+5)</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12 days</div>
                  <p className="text-xs text-muted-foreground">Skincare routine</p>
                </CardContent>
              </Card>
            </>
          )}
          </div>
        </SlideIn>

        {/* Analytics Tabs */}
        <FadeIn delay={0.3}>
          <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      {isDoctor 
                        ? 'Manage your practice efficiently'
                        : 'Take control of your skin health'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {isDoctor ? (
                        <>
                          <Button className="h-auto p-4 justify-start" variant="outline" asChild>
                            <Link href="/doctor/schedule">
                              <Calendar className="mr-3 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">Manage Schedule</div>
                                <div className="text-sm text-muted-foreground">Set availability</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button className="h-auto p-4 justify-start" variant="outline" asChild>
                            <Link href="/doctor/patients">
                              <Users className="mr-3 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">View Patients</div>
                                <div className="text-sm text-muted-foreground">Patient records</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button className="h-auto p-4 justify-start" variant="outline" asChild>
                            <Link href="/consultations">
                              <MessageCircle className="mr-3 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">Consultations</div>
                                <div className="text-sm text-muted-foreground">Active sessions</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button className="h-auto p-4 justify-start" variant="outline" asChild>
                            <Link href="/profile">
                              <User className="mr-3 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">Profile Settings</div>
                                <div className="text-sm text-muted-foreground">Update info</div>
                              </div>
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="h-auto p-4 justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" asChild>
                            <Link href="/ai-analysis">
                              <Brain className="mr-3 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">AI Skin Analysis</div>
                                <div className="text-sm text-blue-100">Get instant assessment</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button className="h-auto p-4 justify-start" variant="outline" asChild>
                            <Link href="/find-doctors">
                              <Stethoscope className="mr-3 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">Find Doctors</div>
                                <div className="text-sm text-muted-foreground">Book consultation</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button className="h-auto p-4 justify-start" variant="outline" asChild>
                            <Link href="/appointments">
                              <Calendar className="mr-3 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">My Appointments</div>
                                <div className="text-sm text-muted-foreground">View schedule</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button className="h-auto p-4 justify-start" variant="outline" asChild>
                            <Link href="/learn">
                              <Heart className="mr-3 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">Learn & Tips</div>
                                <div className="text-sm text-muted-foreground">Skin care guides</div>
                              </div>
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      {isDoctor ? 'Your latest consultations and updates' : 'Your recent interactions and progress'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {isDoctor ? (
                        <>
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Consultation completed with Priya Patel</p>
                              <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">New appointment booked by Rahul Sharma</p>
                              <p className="text-xs text-muted-foreground">4 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Profile updated with new qualifications</p>
                              <p className="text-xs text-muted-foreground">1 day ago</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">AI skin analysis completed</p>
                              <p className="text-xs text-muted-foreground">3 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Appointment booked with Dr. Sharma</p>
                              <p className="text-xs text-muted-foreground">1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Completed skincare routine for 7 days</p>
                              <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Completion */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Profile Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Profile completeness</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/profile">
                          Complete Profile
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isDoctor ? 'Upcoming Appointments' : 'Next Appointment'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {isDoctor ? 'Consultation with Priya' : 'Dr. Priya Sharma'}
                          </p>
                          <p className="text-xs text-muted-foreground">Tomorrow at 2:30 PM</p>
                        </div>
                      </div>
                      
                      {isDoctor && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Follow-up with Rahul</p>
                            <p className="text-xs text-muted-foreground">Dec 28 at 4:00 PM</p>
                          </div>
                        </div>
                      )}
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        {isDoctor ? 'View All' : 'Book New'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Security & Privacy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-green-600" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-factor auth</span>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data encryption</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">DPDP Compliant</span>
                        <Badge variant="default">✓</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <DashboardAnalytics userRole={user.role} />
          </TabsContent>
          </Tabs>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}