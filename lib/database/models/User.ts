import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Patient specific fields
  dateOfBirth?: Date;
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
  about?: string;
  availability?: {
    [key: string]: string[];
  };
  isOnline?: boolean;
  
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['patient', 'doctor'],
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  
  // Patient fields
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  medicalHistory: [{
    type: String,
  }],
  
  // Doctor fields
  specialization: {
    type: String,
  },
  experience: {
    type: Number,
    min: 0,
  },
  qualifications: [{
    type: String,
  }],
  consultationFee: {
    type: Number,
    min: 0,
  },
  languages: [{
    type: String,
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  totalConsultations: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
  },
  availability: {
    type: Map,
    of: [String],
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ specialization: 1 });
UserSchema.index({ rating: -1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);