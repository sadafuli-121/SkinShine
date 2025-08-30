export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  qualifications: string[];
  consultationFee: number;
  languages: string[];
  rating: number;
  totalConsultations: number;
  avatar?: string;
  about?: string;
  availability?: {
    [key: string]: string[]; // day: time slots
  };
  nextAvailable?: string;
  isOnline?: boolean;
}

export interface BookingData {
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  type: 'video' | 'chat';
  symptoms?: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  type: 'video' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  symptoms?: string;
  urgency: 'low' | 'medium' | 'high';
  notes?: string;
  prescription?: string;
  createdAt: string;
}

// Simulated backend storage
const DOCTORS_KEY = 'skinshine_doctors';
const APPOINTMENTS_KEY = 'skinshine_appointments';

class DoctorService {
  private getDoctors(): Doctor[] {
    if (typeof window === 'undefined') return [];
    const doctors = localStorage.getItem(DOCTORS_KEY);
    return doctors ? JSON.parse(doctors) : this.getDefaultDoctors();
  }

  private saveDoctors(doctors: Doctor[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
  }

  private getAppointments(): Appointment[] {
    if (typeof window === 'undefined') return [];
    const appointments = localStorage.getItem(APPOINTMENTS_KEY);
    return appointments ? JSON.parse(appointments) : [];
  }

  private saveAppointments(appointments: Appointment[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private getDefaultDoctors(): Doctor[] {
    const doctors = [
      {
        id: 'doc1',
        name: 'Dr. Priya Sharma',
        email: 'dr.sharma@skinshine.com',
        specialization: 'General Dermatology',
        experience: 8,
        qualifications: ['MBBS', 'MD Dermatology', 'Fellowship in Cosmetic Dermatology'],
        consultationFee: 800,
        languages: ['English', 'Hindi', 'Marathi'],
        rating: 4.8,
        totalConsultations: 1250,
        avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150',
        about: 'Dr. Priya Sharma is a renowned dermatologist with over 8 years of experience in treating various skin conditions. She specializes in acne treatment, anti-aging procedures, and cosmetic dermatology.',
        availability: {
          'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
          'Wednesday': ['09:00', '10:00', '14:00', '15:00', '16:00'],
          'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          'Friday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
          'Saturday': ['09:00', '10:00', '11:00']
        },
        nextAvailable: 'Today 2:00 PM',
        isOnline: true
      },
      {
        id: 'doc2',
        name: 'Dr. Rajesh Kumar',
        email: 'dr.kumar@skinshine.com',
        specialization: 'Pediatric Dermatology',
        experience: 12,
        qualifications: ['MBBS', 'MD Dermatology', 'Pediatric Dermatology Certification'],
        consultationFee: 600,
        languages: ['English', 'Hindi', 'Tamil'],
        rating: 4.9,
        totalConsultations: 2100,
        avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150',
        about: 'Dr. Rajesh Kumar specializes in pediatric dermatology with 12 years of experience. He is known for his gentle approach with children and expertise in treating childhood skin conditions.',
        availability: {
          'Monday': ['10:00', '11:00', '15:00', '16:00', '17:00'],
          'Tuesday': ['10:00', '11:00', '15:00', '16:00'],
          'Wednesday': ['10:00', '11:00', '15:00', '16:00', '17:00'],
          'Thursday': ['10:00', '11:00', '15:00', '16:00'],
          'Friday': ['10:00', '11:00', '15:00', '16:00', '17:00'],
          'Saturday': ['10:00', '11:00']
        },
        nextAvailable: 'Tomorrow 10:00 AM',
        isOnline: false
      },
      {
        id: 'doc3',
        name: 'Dr. Anjali Patel',
        email: 'dr.patel@skinshine.com',
        specialization: 'Cosmetic Dermatology',
        experience: 6,
        qualifications: ['MBBS', 'MD Dermatology', 'Advanced Aesthetics Certification'],
        consultationFee: 1200,
        languages: ['English', 'Hindi', 'Gujarati'],
        rating: 4.7,
        totalConsultations: 890,
        avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150',
        about: 'Dr. Anjali Patel is a cosmetic dermatology expert specializing in advanced aesthetic procedures, laser treatments, and anti-aging solutions.',
        availability: {
          'Monday': ['11:00', '14:00', '15:00', '16:00'],
          'Tuesday': ['11:00', '14:00', '15:00', '16:00', '17:00'],
          'Wednesday': ['11:00', '14:00', '15:00'],
          'Thursday': ['11:00', '14:00', '15:00', '16:00', '17:00'],
          'Friday': ['11:00', '14:00', '15:00', '16:00'],
          'Saturday': ['11:00', '14:00']
        },
        nextAvailable: 'Today 4:00 PM',
        isOnline: true
      },
      {
        id: 'doc4',
        name: 'Dr. Vikram Singh',
        email: 'dr.singh@skinshine.com',
        specialization: 'Dermatologic Surgery',
        experience: 15,
        qualifications: ['MBBS', 'MD Dermatology', 'Fellowship in Mohs Surgery'],
        consultationFee: 1500,
        languages: ['English', 'Hindi', 'Punjabi'],
        rating: 4.9,
        totalConsultations: 1800,
        avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150',
        about: 'Dr. Vikram Singh is a highly experienced dermatologic surgeon specializing in skin cancer treatment, Mohs surgery, and complex dermatological procedures.',
        availability: {
          'Monday': ['09:00', '10:00', '14:00', '15:00'],
          'Tuesday': ['09:00', '10:00', '14:00', '15:00'],
          'Wednesday': ['09:00', '10:00', '14:00'],
          'Thursday': ['09:00', '10:00', '14:00', '15:00'],
          'Friday': ['09:00', '10:00', '14:00'],
          'Saturday': ['09:00', '10:00']
        },
        nextAvailable: 'Dec 28 9:00 AM',
        isOnline: false
      }
    ];
    
    this.saveDoctors(doctors);
    return doctors;
  }

  async searchDoctors(filters?: {
    specialization?: string;
    language?: string;
    minRating?: number;
    maxFee?: number;
    availability?: string;
    search?: string;
  }): Promise<Doctor[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let doctors = this.getDoctors();

    if (filters) {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        doctors = doctors.filter(d => 
          d.name.toLowerCase().includes(searchTerm) ||
          d.specialization.toLowerCase().includes(searchTerm) ||
          d.qualifications.some(q => q.toLowerCase().includes(searchTerm))
        );
      }

      if (filters.specialization && filters.specialization !== 'all') {
        doctors = doctors.filter(d => 
          d.specialization.toLowerCase().includes(filters.specialization!.toLowerCase())
        );
      }

      if (filters.language && filters.language !== 'all') {
        doctors = doctors.filter(d => 
          d.languages.some(lang => 
            lang.toLowerCase().includes(filters.language!.toLowerCase())
          )
        );
      }

      if (filters.minRating) {
        doctors = doctors.filter(d => d.rating >= filters.minRating!);
      }

      if (filters.maxFee) {
        doctors = doctors.filter(d => d.consultationFee <= filters.maxFee!);
      }

      if (filters.availability === 'online') {
        doctors = doctors.filter(d => d.isOnline);
      }
    }

    return doctors.sort((a, b) => b.rating - a.rating);
  }

  async getDoctorById(id: string): Promise<Doctor | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const doctors = this.getDoctors();
    return doctors.find(d => d.id === id) || null;
  }

  async bookAppointment(bookingData: BookingData): Promise<Appointment> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const appointment: Appointment = {
      id: this.generateId(),
      ...bookingData,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    const appointments = this.getAppointments();
    appointments.push(appointment);
    this.saveAppointments(appointments);

    return appointment;
  }

  async getAppointments(userId: string, role: 'patient' | 'doctor'): Promise<Appointment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const appointments = this.getAppointments();
    
    if (role === 'patient') {
      return appointments.filter(a => a.patientId === userId);
    } else {
      return appointments.filter(a => a.doctorId === userId);
    }
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const appointments = this.getAppointments();
    const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
    
    if (appointmentIndex !== -1) {
      appointments[appointmentIndex].status = 'cancelled';
      this.saveAppointments(appointments);
    }
  }
}

export const doctorService = new DoctorService();