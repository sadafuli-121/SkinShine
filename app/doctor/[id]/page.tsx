'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { doctorService, Doctor } from '@/lib/doctors';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { PaymentData } from '@/lib/payment';
import { toast } from 'sonner';
import { 
  Star, 
  MapPin, 
  Clock, 
  Video, 
  MessageCircle,
  Users,
  Award,
  Languages,
  IndianRupee,
  Calendar as CalendarIcon,
  CheckCircle,
  Phone,
  Mail,
  ArrowLeft,
  Heart,
  Share2
} from 'lucide-react';

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'video' | 'chat'>('video');
  const [symptoms, setSymptoms] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    if (params.id) {
      loadDoctor(params.id as string);
    }
  }, [params.id]);

  const loadDoctor = async (doctorId: string) => {
    setLoading(true);
    try {
      const doctorData = await doctorService.getDoctorById(doctorId);
      setDoctor(doctorData);
    } catch (error) {
      console.error('Error loading doctor:', error);
      toast.error('Failed to load doctor profile');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!user) {
      toast.error('Please login to book an appointment');
      router.push('/auth/login');
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    // Prepare payment data
    const amount = consultationType === 'video' ? doctor!.consultationFee : Math.round(doctor!.consultationFee * 0.7);
    const payment: PaymentData = {
      amount,
      currency: 'INR',
      appointmentId: 'temp_' + Date.now(),
      patientId: user.id,
      doctorId: doctor!.id,
      description: `${consultationType} consultation with ${doctor!.name}`
    };
    
    setPaymentData(payment);
    setShowBookingDialog(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentResult: any) => {
    setBookingLoading(true);
    try {
      await doctorService.bookAppointment({
        doctorId: doctor!.id,
        patientId: user!.id,
        date: selectedDate!.toISOString().split('T')[0],
        time: selectedTime,
        type: consultationType,
        symptoms,
        urgency
      });

      toast.success('Appointment booked and payment completed!');
      setShowPaymentModal(false);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Payment successful but booking failed. Please contact support.');
    } finally {
      setBookingLoading(false);
    }
  };

  const getAvailableSlots = () => {
    if (!doctor || !selectedDate) return [];
    
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    return doctor.availability?.[dayName] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h2>
            <Button onClick={() => router.push('/find-doctors')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Doctor Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={doctor.avatar} alt={doctor.name} />
                      <AvatarFallback className="text-2xl">{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {doctor.isOnline && (
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                        <p className="text-lg text-blue-600 mb-2">{doctor.specialization}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>{doctor.experience} years experience</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{doctor.totalConsultations} consultations</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-lg">{doctor.rating}</span>
                        <span className="text-gray-600">({doctor.totalConsultations} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <IndianRupee className="w-5 h-5" />
                        <span className="font-semibold text-lg">₹{doctor.consultationFee}</span>
                        <span className="text-gray-600">per consultation</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.qualifications.map((qual, index) => (
                        <Badge key={index} variant="secondary">
                          {qual}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Languages className="w-4 h-4" />
                      <span>Speaks: {doctor.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About Dr. {doctor.name.split(' ')[1]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {doctor.about}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Specializations</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• {doctor.specialization}</li>
                          <li>• Skin condition diagnosis</li>
                          <li>• Treatment planning</li>
                          <li>• Preventive care</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages.map((lang, index) => (
                            <Badge key={index} variant="outline">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-2 border-blue-200 pl-4">
                        <h4 className="font-semibold text-gray-900">Senior Dermatologist</h4>
                        <p className="text-blue-600">SkinShine Healthcare • 2020 - Present</p>
                        <p className="text-gray-700 mt-2">
                          Leading dermatology consultations and treatments with focus on {doctor.specialization.toLowerCase()}.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-200 pl-4">
                        <h4 className="font-semibold text-gray-900">Dermatologist</h4>
                        <p className="text-gray-600">City Hospital • 2018 - 2020</p>
                        <p className="text-gray-700 mt-2">
                          Provided comprehensive dermatological care and developed expertise in various skin conditions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Reviews</CardTitle>
                    <CardDescription>
                      {doctor.rating} out of 5 stars based on {doctor.totalConsultations} reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Sample reviews */}
                      <div className="border-b pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">Priya S.</span>
                          <span className="text-gray-500 text-sm">2 days ago</span>
                        </div>
                        <p className="text-gray-700">
                          Excellent consultation! Dr. {doctor.name.split(' ')[1]} was very thorough and explained everything clearly. 
                          The treatment plan worked perfectly.
                        </p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">Rahul M.</span>
                          <span className="text-gray-500 text-sm">1 week ago</span>
                        </div>
                        <p className="text-gray-700">
                          Very professional and knowledgeable. The video consultation was smooth and I got exactly 
                          the help I needed for my skin condition.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(doctor.availability || {}).map(([day, slots]) => (
                        <div key={day} className="flex items-center justify-between py-2 border-b">
                          <span className="font-medium text-gray-900">{day}</span>
                          <div className="flex flex-wrap gap-2">
                            {slots.length > 0 ? (
                              slots.map((slot, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {slot}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-500 text-sm">Not available</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Book Appointment</span>
                </CardTitle>
                <CardDescription>
                  Next available: {doctor.nextAvailable}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => {
                      setConsultationType('video');
                      setShowBookingDialog(true);
                    }}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setConsultationType('chat');
                      setShowBookingDialog(true);
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <IndianRupee className="w-4 h-4" />
                    <span className="font-semibold">₹{doctor.consultationFee}</span>
                  </div>
                  <p>Secure payment • Instant confirmation</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>Available during consultation</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Online Consultation</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
            <DialogDescription>
              Choose your preferred date, time, and consultation type
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Available Times</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {getAvailableSlots().map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTime === slot ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(slot)}
                      className="text-xs"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Consultation Type</Label>
                <RadioGroup value={consultationType} onValueChange={(value: 'video' | 'chat') => setConsultationType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Video Call (₹{doctor.consultationFee})</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chat" id="chat" />
                    <Label htmlFor="chat" className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat (₹{Math.round(doctor.consultationFee * 0.7)})</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="urgency" className="text-sm font-medium mb-2 block">Urgency Level</Label>
                <Select value={urgency} onValueChange={(value: 'low' | 'medium' | 'high') => setUrgency(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Routine consultation</SelectItem>
                    <SelectItem value="medium">Medium - Concerning symptoms</SelectItem>
                    <SelectItem value="high">High - Urgent care needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="symptoms" className="text-sm font-medium mb-2 block">
              Describe your symptoms (Optional)
            </Label>
            <Textarea
              id="symptoms"
              placeholder="Please describe your skin condition, symptoms, or concerns..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              Total: ₹{consultationType === 'video' ? doctor.consultationFee : Math.round(doctor.consultationFee * 0.7)}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime || bookingLoading}
              >
                {bookingLoading ? 'Booking...' : 'Book Appointment'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      {paymentData && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          paymentData={paymentData}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <Footer />
    </div>
  );
}