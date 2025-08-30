'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  IndianRupee,
  Star,
  Clock,
  Activity
} from 'lucide-react';

interface AnalyticsProps {
  userRole: 'patient' | 'doctor';
}

export function DashboardAnalytics({ userRole }: AnalyticsProps) {
  // Sample data for charts
  const consultationData = [
    { month: 'Jan', consultations: 45, revenue: 27000 },
    { month: 'Feb', consultations: 52, revenue: 31200 },
    { month: 'Mar', consultations: 48, revenue: 28800 },
    { month: 'Apr', consultations: 61, revenue: 36600 },
    { month: 'May', consultations: 55, revenue: 33000 },
    { month: 'Jun', consultations: 67, revenue: 40200 },
  ];

  const patientData = [
    { month: 'Jan', appointments: 2, skinScore: 75 },
    { month: 'Feb', appointments: 1, skinScore: 78 },
    { month: 'Mar', appointments: 3, skinScore: 82 },
    { month: 'Apr', appointments: 2, skinScore: 85 },
    { month: 'May', appointments: 1, skinScore: 87 },
    { month: 'Jun', appointments: 2, skinScore: 89 },
  ];

  const conditionData = [
    { name: 'Acne', value: 35, color: '#ef4444' },
    { name: 'Dry Skin', value: 25, color: '#f59e0b' },
    { name: 'Eczema', value: 20, color: '#8b5cf6' },
    { name: 'Rosacea', value: 12, color: '#06b6d4' },
    { name: 'Other', value: 8, color: '#6b7280' },
  ];

  const timeSlotData = [
    { time: '9-11 AM', bookings: 15 },
    { time: '11-1 PM', bookings: 22 },
    { time: '1-3 PM', bookings: 8 },
    { time: '3-5 PM', bookings: 28 },
    { time: '5-7 PM', bookings: 35 },
    { time: '7-9 PM', bookings: 18 },
  ];

  if (userRole === 'doctor') {
    return (
      <div className="space-y-6">
        {/* Revenue & Consultation Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Monthly Revenue</span>
              </CardTitle>
              <CardDescription>Revenue trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={consultationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    fill="url(#colorRevenue)" 
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Consultation Volume</span>
              </CardTitle>
              <CardDescription>Number of consultations per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={consultationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consultations" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Condition Distribution & Time Slots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Conditions Treated</CardTitle>
              <CardDescription>Distribution of skin conditions in your practice</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={conditionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {conditionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Time Slots</CardTitle>
              <CardDescription>Most booked consultation times</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={timeSlotData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="time" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Patient Analytics
  return (
    <div className="space-y-6">
      {/* Skin Health Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span>Skin Health Progress</span>
          </CardTitle>
          <CardDescription>Your skin health journey over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 95]} />
              <Tooltip formatter={(value) => [`${value}`, 'Skin Score']} />
              <Line 
                type="monotone" 
                dataKey="skinScore" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skin Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">89</div>
                <p className="text-sm text-gray-600">Current Score</p>
              </div>
              <Progress value={89} className="h-2" />
              <div className="flex justify-between text-xs text-gray-600">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Routine Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600">12</div>
              <p className="text-sm text-gray-600">Days</p>
              <Badge variant="secondary">🔥 On Fire!</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-purple-600">+14%</div>
              <p className="text-sm text-gray-600">This Month</p>
              <div className="flex items-center justify-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Improving</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment History */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment History</CardTitle>
          <CardDescription>Your consultation frequency over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}