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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { appointmentService, AppointmentWithDetails } from '@/lib/services/appointmentService';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  Video, 
  MessageCircle,
  User,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  XCircle,
  Phone,
  FileText,
  Star,
  MapPin
} from 'lucide-react';

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithDetails | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

  const loadAppointments = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await appointmentService.getAppointments(user.id, user.role);
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!user) return;
    
    setCancellingId(appointmentId);
    try {
      await appointmentService.cancelAppointment(appointmentId, user.id);
      toast.success('Appointment cancelled successfully');
      loadAppointments();
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel appointment');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'in-progress':
        return <Video className="w-4 h-4 text-purple-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const filterAppointments = (status?: string) => {
    if (!status) return appointments;
    return appointments.filter(apt => apt.status === status);
  };

  const upcomingAppointments = filterAppointments('scheduled');
  const completedAppointments = filterAppointments('completed');
  const cancelledAppointments = filterAppointments('cancelled');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Please log in to view appointments</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">
            {user.role === 'patient' 
              ? 'Manage your consultations and medical appointments'
              : 'View and manage your patient consultations'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">All appointments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled appointments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedAppointments.length}</div>
              <p className="text-xs text-muted-foreground">Finished consultations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter(apt => 
                  new Date(apt.date).getMonth() === new Date().getMonth()
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">Current month</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <AppointmentsList 
              appointments={appointments} 
              loading={loading}
              onCancel={handleCancelAppointment}
              cancellingId={cancellingId}
              onViewDetails={setSelectedAppointment}
              userRole={user.role}
            />
          </TabsContent>

          <TabsContent value="upcoming">
            <AppointmentsList 
              appointments={upcomingAppointments} 
              loading={loading}
              onCancel={handleCancelAppointment}
              cancellingId={cancellingId}
              onViewDetails={setSelectedAppointment}
              userRole={user.role}
            />
          </TabsContent>

          <TabsContent value="completed">
            <AppointmentsList 
              appointments={completedAppointments} 
              loading={loading}
              onCancel={handleCancelAppointment}
              cancellingId={cancellingId}
              onViewDetails={setSelectedAppointment}
              userRole={user.role}
            />
          </TabsContent>

          <TabsContent value="cancelled">
            <AppointmentsList 
              appointments={cancelledAppointments} 
              loading={loading}
              onCancel={handleCancelAppointment}
              cancellingId={cancellingId}
              onViewDetails={setSelectedAppointment}
              userRole={user.role}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Complete information about this consultation
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <AppointmentDetails appointment={selectedAppointment} userRole={user.role} />
          )}
        </DialogContent>
      </Dialog>

      <EnhancedFooter />
    </div>
  );
}

interface AppointmentsListProps {
  appointments: AppointmentWithDetails[];
  loading: boolean;
  onCancel: (id: string) => void;
  cancellingId: string | null;
  onViewDetails: (appointment: AppointmentWithDetails) => void;
  userRole: 'patient' | 'doctor';
}

function AppointmentsList({ 
  appointments, 
  loading, 
  onCancel, 
  cancellingId, 
  onViewDetails,
  userRole 
}: AppointmentsListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'in-progress':
        return <Video className="w-4 h-4 text-purple-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
        <p className="text-gray-600">
          {userRole === 'patient' 
            ? "You haven't booked any appointments yet."
            : "You don't have any appointments scheduled."
          }
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const otherUser = userRole === 'patient' ? appointment.doctor : appointment.patient;
        
        return (
          <Card key={appointment._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={otherUser?.avatar} alt={otherUser?.name} />
                    <AvatarFallback>{otherUser?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {userRole === 'patient' ? `Dr. ${otherUser?.name}` : otherUser?.name}
                      </h3>
                      <Badge className={getStatusColor(appointment.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(appointment.status)}
                          <span className="capitalize">{appointment.status}</span>
                        </div>
                      </Badge>
                    </div>

                    {userRole === 'patient' && appointment.doctor?.specialization && (
                      <p className="text-sm text-blue-600 mb-2">{appointment.doctor.specialization}</p>
                    )}

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {appointment.type === 'video' ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <MessageCircle className="w-4 h-4" />
                        )}
                        <span className="capitalize">{appointment.type} consultation</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className={getUrgencyColor(appointment.urgency)}>
                        {appointment.urgency} priority
                      </Badge>
                      <span className="text-sm text-gray-600">₹{appointment.amount}</span>
                    </div>

                    {appointment.symptoms && (
                      <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        <strong>Symptoms:</strong> {appointment.symptoms}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(appointment)}
                  >
                    View Details
                  </Button>
                  
                  {appointment.status === 'scheduled' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {appointment.type === 'video' ? (
                          <>
                            <Video className="w-4 h-4 mr-1" />
                            Join Call
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Open Chat
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancel(appointment._id)}
                        disabled={cancellingId === appointment._id}
                        className="text-red-600 hover:text-red-700"
                      >
                        {cancellingId === appointment._id ? 'Cancelling...' : 'Cancel'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface AppointmentDetailsProps {
  appointment: AppointmentWithDetails;
  userRole: 'patient' | 'doctor';
}

function AppointmentDetails({ appointment, userRole }: AppointmentDetailsProps) {
  const otherUser = userRole === 'patient' ? appointment.doctor : appointment.patient;

  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={otherUser?.avatar} alt={otherUser?.name} />
          <AvatarFallback className="text-lg">{otherUser?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">
            {userRole === 'patient' ? `Dr. ${otherUser?.name}` : otherUser?.name}
          </h3>
          {userRole === 'patient' && appointment.doctor?.specialization && (
            <p className="text-blue-600">{appointment.doctor.specialization}</p>
          )}
          {userRole === 'patient' && appointment.doctor?.rating && (
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm">{appointment.doctor.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Date & Time</label>
          <p className="text-sm text-gray-900">
            {format(new Date(appointment.date), 'EEEE, MMMM dd, yyyy')} at {appointment.time}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Consultation Type</label>
          <p className="text-sm text-gray-900 capitalize">{appointment.type} consultation</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <p className="text-sm text-gray-900 capitalize">{appointment.status}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <p className="text-sm text-gray-900 capitalize">{appointment.urgency}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <p className="text-sm text-gray-900">₹{appointment.amount}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Payment Status</label>
          <p className="text-sm text-gray-900 capitalize">{appointment.paymentStatus}</p>
        </div>
      </div>

      {/* Symptoms */}
      {appointment.symptoms && (
        <div>
          <label className="text-sm font-medium text-gray-700">Symptoms/Concerns</label>
          <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded mt-1">
            {appointment.symptoms}
          </p>
        </div>
      )}

      {/* Notes */}
      {appointment.notes && (
        <div>
          <label className="text-sm font-medium text-gray-700">Doctor's Notes</label>
          <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded mt-1">
            {appointment.notes}
          </p>
        </div>
      )}

      {/* Prescription */}
      {appointment.prescription && (
        <div>
          <label className="text-sm font-medium text-gray-700">Prescription</label>
          <p className="text-sm text-gray-900 bg-green-50 p-3 rounded mt-1">
            {appointment.prescription}
          </p>
        </div>
      )}

      {/* Room ID for joining consultation */}
      {appointment.status === 'scheduled' && appointment.consultationRoomId && (
        <div>
          <label className="text-sm font-medium text-gray-700">Consultation Room</label>
          <p className="text-sm text-gray-600">Room ID: {appointment.consultationRoomId}</p>
        </div>
      )}
    </div>
  );
}