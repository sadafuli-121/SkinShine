'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Calendar, MessageCircle, Heart, AlertTriangle, CheckCircle, Clock, User, Stethoscope, Star, Gift, Settings, Trash2, BookMarked as MarkAsRead } from 'lucide-react';

interface Notification {
  id: string;
  type: 'appointment' | 'message' | 'reminder' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  actionText?: string;
  avatar?: string;
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState({
    appointments: true,
    messages: true,
    reminders: true,
    promotions: false,
    system: true,
    email: true,
    push: true,
    sms: false
  });

  useEffect(() => {
    // Load sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'appointment',
        title: 'Appointment Reminder',
        message: 'Your consultation with Dr. Priya Sharma is scheduled for tomorrow at 2:30 PM',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        priority: 'high',
        actionUrl: '/appointments',
        actionText: 'View Details',
        avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: '2',
        type: 'message',
        title: 'New Message from Dr. Kumar',
        message: 'I\'ve reviewed your skin analysis results. Please check the recommendations I\'ve shared.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: false,
        priority: 'medium',
        actionUrl: '/consultations',
        actionText: 'Read Message',
        avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: '3',
        type: 'reminder',
        title: 'Skincare Routine Reminder',
        message: 'Don\'t forget to apply your evening moisturizer and sunscreen for tomorrow!',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        actionUrl: '/profile',
        actionText: 'Update Routine'
      },
      {
        id: '4',
        type: 'system',
        title: 'AI Analysis Complete',
        message: 'Your skin analysis results are ready. We\'ve detected some areas that need attention.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        read: true,
        priority: 'medium',
        actionUrl: '/ai-analysis',
        actionText: 'View Results'
      },
      {
        id: '5',
        type: 'promotion',
        title: 'Special Offer: 20% Off',
        message: 'Get 20% off on your next consultation with our premium dermatologists this week!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        actionUrl: '/find-doctors',
        actionText: 'Book Now'
      }
    ];

    setNotifications(sampleNotifications);
  }, []);

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === 'high' ? 'text-red-600' : priority === 'medium' ? 'text-yellow-600' : 'text-gray-600';
    
    switch (type) {
      case 'appointment':
        return <Calendar className={`w-5 h-5 ${iconClass}`} />;
      case 'message':
        return <MessageCircle className={`w-5 h-5 ${iconClass}`} />;
      case 'reminder':
        return <Clock className={`w-5 h-5 ${iconClass}`} />;
      case 'promotion':
        return <Gift className={`w-5 h-5 ${iconClass}`} />;
      case 'system':
        return <Bell className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Bell className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    toast.success('Marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    toast.success('Notification deleted');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              Stay updated with your appointments, messages, and health reminders
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} unread</Badge>
            )}
            <Button variant="outline" onClick={markAllAsRead}>
              <MarkAsRead className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="appointment">Appointments</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <NotificationsList 
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="unread">
            <NotificationsList 
              notifications={notifications.filter(n => !n.read)}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="appointment">
            <NotificationsList 
              notifications={notifications.filter(n => n.type === 'appointment')}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="message">
            <NotificationsList 
              notifications={notifications.filter(n => n.type === 'message')}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="reminder">
            <NotificationsList 
              notifications={notifications.filter(n => n.type === 'reminder')}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Customize how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Appointment Notifications</Label>
                        <p className="text-sm text-gray-600">Reminders and updates about your appointments</p>
                      </div>
                      <Switch 
                        checked={settings.appointments}
                        onCheckedChange={(checked) => setSettings({...settings, appointments: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Message Notifications</Label>
                        <p className="text-sm text-gray-600">New messages from doctors or patients</p>
                      </div>
                      <Switch 
                        checked={settings.messages}
                        onCheckedChange={(checked) => setSettings({...settings, messages: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Health Reminders</Label>
                        <p className="text-sm text-gray-600">Skincare routine and medication reminders</p>
                      </div>
                      <Switch 
                        checked={settings.reminders}
                        onCheckedChange={(checked) => setSettings({...settings, reminders: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Promotional Offers</Label>
                        <p className="text-sm text-gray-600">Special offers and discounts</p>
                      </div>
                      <Switch 
                        checked={settings.promotions}
                        onCheckedChange={(checked) => setSettings({...settings, promotions: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">System Updates</Label>
                        <p className="text-sm text-gray-600">App updates and maintenance notifications</p>
                      </div>
                      <Switch 
                        checked={settings.system}
                        onCheckedChange={(checked) => setSettings({...settings, system: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Methods</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="font-medium">Email Notifications</Label>
                      <Switch 
                        checked={settings.email}
                        onCheckedChange={(checked) => setSettings({...settings, email: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="font-medium">Push Notifications</Label>
                      <Switch 
                        checked={settings.push}
                        onCheckedChange={(checked) => setSettings({...settings, push: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="font-medium">SMS Notifications</Label>
                      <Switch 
                        checked={settings.sms}
                        onCheckedChange={(checked) => setSettings({...settings, sms: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <EnhancedFooter />
    </div>
  );
}

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationsList({ notifications, onMarkAsRead, onDelete }: NotificationsListProps) {
  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === 'high' ? 'text-red-600' : priority === 'medium' ? 'text-yellow-600' : 'text-gray-600';
    
    switch (type) {
      case 'appointment':
        return <Calendar className={`w-5 h-5 ${iconClass}`} />;
      case 'message':
        return <MessageCircle className={`w-5 h-5 ${iconClass}`} />;
      case 'reminder':
        return <Clock className={`w-5 h-5 ${iconClass}`} />;
      case 'promotion':
        return <Gift className={`w-5 h-5 ${iconClass}`} />;
      case 'system':
        return <Bell className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Bell className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (notifications.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
        <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`hover:shadow-lg transition-shadow ${!notification.read ? 'border-blue-200 bg-blue-50/30' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {notification.avatar ? (
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback>
                      {getNotificationIcon(notification.type, notification.priority)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {getNotificationIcon(notification.type, notification.priority)}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                      <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(notification.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {notification.actionUrl && notification.actionText && (
                  <div className="mt-3">
                    <Button size="sm" variant="outline">
                      {notification.actionText}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}