export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor';
  avatar?: string;
  isVerified: boolean;
  phone?: string;
  createdAt: string;
  // Patient specific fields
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  medicalHistory?: string[];
  // Doctor specific fields
  specialization?: string;
  experience?: number;
  qualifications?: string[];
  consultationFee?: number;
  languages?: string[];
  rating?: number;
  totalConsultations?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  phone?: string;
  // Additional fields based on role
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  specialization?: string;
  experience?: number;
  qualifications?: string[];
}

// Simulated backend storage
const STORAGE_KEY = 'skinshine_users';
const TOKEN_KEY = 'skinshine_token';

class AuthService {
  private getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private generateToken(user: User): string {
    // In a real app, this would be a proper JWT
    return btoa(JSON.stringify({ userId: user.id, email: user.email, role: user.role }));
  }

  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = this.getUsers();
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      throw new Error('User not found');
    }

    // In a real app, you'd hash and compare passwords
    if (credentials.password.length < 6) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken(user);
    localStorage.setItem(TOKEN_KEY, token);

    return user;
  }

  async register(userData: RegisterData): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const users = this.getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User already exists with this email');
    }

    const newUser: User = {
      id: this.generateId(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      isVerified: false,
      phone: userData.phone,
      createdAt: new Date().toISOString(),
      // Patient specific fields
      ...(userData.role === 'patient' && {
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        medicalHistory: []
      }),
      // Doctor specific fields
      ...(userData.role === 'doctor' && {
        specialization: userData.specialization,
        experience: userData.experience,
        qualifications: userData.qualifications || [],
        consultationFee: 500, // Default fee
        languages: ['English', 'Hindi'],
        rating: 0,
        totalConsultations: 0
      })
    };

    users.push(newUser);
    this.saveUsers(users);

    const token = this.generateToken(newUser);
    localStorage.setItem(TOKEN_KEY, token);

    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token));
      const users = this.getUsers();
      return users.find(u => u.id === decoded.userId) || null;
    } catch {
      return null;
    }
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    this.saveUsers(users);

    return users[userIndex];
  }

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  }

  // Doctor-specific methods
  async getDoctors(filters?: {
    specialization?: string;
    language?: string;
    minRating?: number;
    maxFee?: number;
  }): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let doctors = this.getUsers().filter(u => u.role === 'doctor');

    if (filters) {
      if (filters.specialization) {
        doctors = doctors.filter(d => d.specialization?.toLowerCase().includes(filters.specialization!.toLowerCase()));
      }
      if (filters.language) {
        doctors = doctors.filter(d => d.languages?.some(lang => lang.toLowerCase().includes(filters.language!.toLowerCase())));
      }
      if (filters.minRating) {
        doctors = doctors.filter(d => (d.rating || 0) >= filters.minRating!);
      }
      if (filters.maxFee) {
        doctors = doctors.filter(d => (d.consultationFee || 0) <= filters.maxFee!);
      }
    }

    return doctors;
  }

  async getDoctorById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const users = this.getUsers();
    const doctor = users.find(u => u.id === id && u.role === 'doctor');
    return doctor || null;
  }
}

export const authService = new AuthService();

// Initialize with some sample doctors
if (typeof window !== 'undefined') {
  const existingUsers = localStorage.getItem(STORAGE_KEY);
  if (!existingUsers) {
    const sampleDoctors: User[] = [
      {
        id: 'doc1',
        email: 'dr.sharma@skinshine.com',
        name: 'Dr. Priya Sharma',
        role: 'doctor',
        isVerified: true,
        phone: '+91 98765 43210',
        createdAt: '2024-01-01T00:00:00Z',
        specialization: 'Dermatology',
        experience: 8,
        qualifications: ['MBBS', 'MD Dermatology', 'Fellowship in Cosmetic Dermatology'],
        consultationFee: 800,
        languages: ['English', 'Hindi', 'Marathi'],
        rating: 4.8,
        totalConsultations: 1250,
        avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 'doc2',
        email: 'dr.kumar@skinshine.com',
        name: 'Dr. Rajesh Kumar',
        role: 'doctor',
        isVerified: true,
        phone: '+91 98765 43211',
        createdAt: '2024-01-01T00:00:00Z',
        specialization: 'Pediatric Dermatology',
        experience: 12,
        qualifications: ['MBBS', 'MD Dermatology', 'Pediatric Dermatology Certification'],
        consultationFee: 600,
        languages: ['English', 'Hindi', 'Tamil'],
        rating: 4.9,
        totalConsultations: 2100,
        avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 'doc3',
        email: 'dr.patel@skinshine.com',
        name: 'Dr. Anjali Patel',
        role: 'doctor',
        isVerified: true,
        phone: '+91 98765 43212',
        createdAt: '2024-01-01T00:00:00Z',
        specialization: 'Cosmetic Dermatology',
        experience: 6,
        qualifications: ['MBBS', 'MD Dermatology', 'Advanced Aesthetics Certification'],
        consultationFee: 1200,
        languages: ['English', 'Hindi', 'Gujarati'],
        rating: 4.7,
        totalConsultations: 890,
        avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleDoctors));
  }
}