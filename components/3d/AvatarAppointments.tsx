'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MessageCircle,
  User,
  Stethoscope,
  Star,
  IndianRupee,
  CheckCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar?: string;
  doctorSpecialization: string;
  doctorRating: number;
  date: Date;
  time: string;
  type: 'video' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled';
  symptoms?: string;
  fee: number;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  fee: number;
  avatar?: string;
  availability: string[];
}

export function AvatarAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultationType, setConsultationType] = useState<'video' | 'chat'>('video');
  const [symptoms, setSymptoms] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const sampleDoctors: Doctor[] = [
    {
      id: 'doc1',
      name: 'Dr. Sarah Wilson',
      specialization: 'General Dermatology',
      rating: 4.9,
      fee: 800,
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    },
    {
      id: 'doc2',
      name: 'Dr. Michael Chen',
      specialization: 'Cosmetic Dermatology',
      rating: 4.8,
      fee: 1200,
      avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: ['10:00', '11:00', '15:00', '16:00', '17:00']
    },
    {
      id: 'doc3',
      name: 'Dr. Priya Sharma',
      specialization: 'Pediatric Dermatology',
      rating: 4.9,
      fee: 600,
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: ['09:00', '10:00', '14:00', '15:00']
    }
  ];

  useEffect(() => {
    // Load sample appointments
    const sampleAppointments: Appointment[] = [
      {
        id: '1',
        doctorId: 'doc1',
        doctorName: 'Dr. Sarah Wilson',
        doctorSpecialization: 'General Dermatology',
        doctorRating: 4.9,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        time: '14:30',
        type: 'video',
        status: 'scheduled',
        symptoms: 'Acne concerns on face',
        fee: 800
      },
      {
        id: '2',
        doctorId: 'doc2',
        doctorName: 'Dr. Michael Chen',
        doctorSpecialization: 'Cosmetic Dermatology',
        doctorRating: 4.8,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        time: '10:00',
        type: 'chat',
        status: 'scheduled',
        symptoms: 'Anti-aging consultation',
        fee: 1200
      }
    ];
    setAppointments(sampleAppointments);
  }, []);

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsBooking(true);

    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialization: selectedDoctor.specialization,
      doctorRating: selectedDoctor.rating,
      date: selectedDate,
      time: selectedTime,
      type: consultationType,
      status: 'scheduled',
      symptoms,
      fee: consultationType === 'video' ? selectedDoctor.fee : Math.round(selectedDoctor.fee * 0.7)
    };

    setAppointments(prev => [...prev, newAppointment]);
    setShowBookingForm(false);
    setIsBooking(false);
    
    // Reset form
    setSelectedTime('');
    setSymptoms('');
    
    toast.success('Appointment booked successfully!');
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    );
    toast.success('Appointment cancelled');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-600">Manage your healthcare consultations</p>
        </div>
        <Button
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Booking Form */}
      {showBookingForm && (
        <Card className="border-2 border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="text-lg">Book New Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Select Doctor</Label>
                <div className="space-y-2">
                  {sampleDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedDoctor?.id === doctor.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{doctor.name}</h4>
                          <p className="text-xs text-gray-600">{doctor.specialization}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs">{doctor.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <IndianRupee className="w-3 h-3" />
                              <span className="text-xs">₹{doctor.fee}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-2 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                {selectedDoctor && (
                  <div>
                    <Label className="text-base font-medium mb-2 block">Available Times</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedDoctor.availability.map((time) => (
                        <Button
                          key={time}
                          size="sm"
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="text-xs"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <Label className="text-base font-medium mb-3 block">Consultation Type</Label>
              <RadioGroup value={consultationType} onValueChange={(value: 'video' | 'chat') => setConsultationType(value)}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="flex items-center space-x-2 cursor-pointer">
                      <Video className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Video Call</div>
                        <div className="text-xs text-gray-600">₹{selectedDoctor?.fee || 800}</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="chat" id="chat" />
                    <Label htmlFor="chat" className="flex items-center space-x-2 cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Chat Only</div>
                        <div className="text-xs text-gray-600">₹{Math.round((selectedDoctor?.fee || 800) * 0.7)}</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Symptoms */}
            <div>
              <Label htmlFor="symptoms" className="text-base font-medium">Describe Your Symptoms</Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your skin condition, symptoms, or concerns..."
                rows={3}
                className="mt-2"
              />
            </div>

            {/* Booking Actions */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowBookingForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBookAppointment}
                disabled={isBooking || !selectedDoctor || !selectedDate || !selectedTime}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                {isBooking ? 'Booking...' : `Book for ₹${selectedDoctor ? (consultationType === 'video' ? selectedDoctor.fee : Math.round(selectedDoctor.fee * 0.7)) : 0}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appointments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Appointments</h3>
        
        {appointments.length === 0 ? (
          <Card className="p-8 text-center">
            <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h4>
            <p className="text-gray-600 mb-4">Book your first consultation with our expert dermatologists</p>
            <Button
              onClick={() => setShowBookingForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={appointment.doctorAvatar} alt={appointment.doctorName} />
                      <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{appointment.doctorName}</h4>
                          <p className="text-sm text-blue-600">{appointment.doctorSpecialization}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">{appointment.doctorRating}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{format(appointment.date, 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            {appointment.type === 'video' ? (
                              <Video className="w-4 h-4 text-blue-600" />
                            ) : (
                              <MessageCircle className="w-4 h-4 text-green-600" />
                            )}
                            <span className="capitalize">{appointment.type} consultation</span>
                          </div>
                          <div className="flex items-center space-x-1 text-green-600">
                            <IndianRupee className="w-4 h-4" />
                            <span>₹{appointment.fee}</span>
                          </div>
                        </div>

                        {appointment.symptoms && (
                          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                            <strong>Symptoms:</strong> {appointment.symptoms}
                          </p>
                        )}
                      </div>

                      {appointment.status === 'scheduled' && (
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                            {appointment.type === 'video' ? (
                              <>
                                <Video className="w-3 h-3 mr-1" />
                                Join Call
                              </>
                            ) : (
                              <>
                                <MessageCircle className="w-3 h-3 mr-1" />
                                Open Chat
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}