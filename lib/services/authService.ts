import jwt from 'jsonwebtoken';
import connectDB from '@/lib/database/connection';
import User, { IUser } from '@/lib/database/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

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
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  specialization?: string;
  experience?: number;
  qualifications?: string[];
}

export interface AuthResponse {
  user: Omit<IUser, 'password'>;
  token: string;
}

class AuthService {
  private generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  private sanitizeUser(user: IUser): Omit<IUser, 'password'> {
    const { password, ...sanitizedUser } = user.toObject();
    return sanitizedUser;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      phone: userData.phone,
      ...(userData.role === 'patient' && {
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : undefined,
        gender: userData.gender,
        medicalHistory: [],
      }),
      ...(userData.role === 'doctor' && {
        specialization: userData.specialization,
        experience: userData.experience,
        qualifications: userData.qualifications || [],
        consultationFee: 500, // Default fee
        languages: ['English', 'Hindi'],
        rating: 0,
        totalConsultations: 0,
        availability: {
          'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
          'Wednesday': ['09:00', '10:00', '14:00', '15:00', '16:00'],
          'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          'Friday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
          'Saturday': ['09:00', '10:00', '11:00']
        },
        isOnline: false,
      }),
    });

    await newUser.save();

    const token = this.generateToken(newUser._id.toString());
    
    return {
      user: this.sanitizeUser(newUser),
      token,
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(credentials.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user._id.toString());

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async getCurrentUser(token: string): Promise<Omit<IUser, 'password'> | null> {
    try {
      await connectDB();

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return null;
      }

      return this.sanitizeUser(user);
    } catch (error) {
      return null;
    }
  }

  async updateProfile(userId: string, updates: Partial<IUser>): Promise<Omit<IUser, 'password'>> {
    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return this.sanitizeUser(user);
  }

  async getDoctors(filters?: {
    specialization?: string;
    language?: string;
    minRating?: number;
    maxFee?: number;
    search?: string;
  }): Promise<Omit<IUser, 'password'>[]> {
    await connectDB();

    let query: any = { role: 'doctor' };

    if (filters) {
      if (filters.specialization && filters.specialization !== 'all') {
        query.specialization = new RegExp(filters.specialization, 'i');
      }
      if (filters.language && filters.language !== 'all') {
        query.languages = { $in: [new RegExp(filters.language, 'i')] };
      }
      if (filters.minRating) {
        query.rating = { $gte: filters.minRating };
      }
      if (filters.maxFee) {
        query.consultationFee = { $lte: filters.maxFee };
      }
      if (filters.search) {
        query.$or = [
          { name: new RegExp(filters.search, 'i') },
          { specialization: new RegExp(filters.search, 'i') },
          { qualifications: { $in: [new RegExp(filters.search, 'i')] } },
        ];
      }
    }

    const doctors = await User.find(query)
      .select('-password')
      .sort({ rating: -1, totalConsultations: -1 });

    return doctors;
  }

  async getDoctorById(id: string): Promise<Omit<IUser, 'password'> | null> {
    await connectDB();

    const doctor = await User.findOne({ _id: id, role: 'doctor' }).select('-password');
    return doctor;
  }
}

export const authService = new AuthService();