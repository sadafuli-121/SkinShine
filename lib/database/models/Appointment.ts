// import mongoose, { Document, Schema } from 'mongoose';

// export interface IAppointment extends Document {
//   _id: string;
//   doctorId: mongoose.Types.ObjectId;
//   patientId: mongoose.Types.ObjectId;
//   date: Date;
//   time: string;
//   type: 'video' | 'chat';
//   status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
//   symptoms?: string;
//   urgency: 'low' | 'medium' | 'high';
//   notes?: string;
//   prescription?: string;
//   amount: number;
//   paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
//   paymentId?: string;
//   consultationRoomId?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const AppointmentSchema = new Schema<IAppointment>({
//   doctorId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   patientId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ['video', 'chat'],
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['scheduled', 'completed', 'cancelled', 'in-progress'],
//     default: 'scheduled',
//   },
//   symptoms: {
//     type: String,
//   },
//   urgency: {
//     type: String,
//     enum: ['low', 'medium', 'high'],
//     default: 'medium',
//   },
//   notes: {
//     type: String,
//   },
//   prescription: {
//     type: String,
//   },
//   amount: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'completed', 'failed', 'refunded'],
//     default: 'pending',
//   },
//   paymentId: {
//     type: String,
//   },
//   consultationRoomId: {
//     type: String,
//   },
// }, {
//   timestamps: true,
// });

// // Create indexes
// AppointmentSchema.index({ doctorId: 1, date: 1 });
// AppointmentSchema.index({ patientId: 1, date: -1 });
// AppointmentSchema.index({ status: 1 });
// AppointmentSchema.index({ date: 1, time: 1 });

// export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for the Appointment document
export interface IAppointment extends Document {
  _id: string;
  doctorId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  type: 'video' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  symptoms?: string;
  urgency: 'low' | 'medium' | 'high';
  notes?: string;
  prescription?: string;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentId?: string;
  consultationRoomId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema for the Appointment
const AppointmentSchema = new Schema<IAppointment>({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'chat'],
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'in-progress'],
    default: 'scheduled',
  },
  symptoms: {
    type: String,
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  notes: {
    type: String,
  },
  prescription: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentId: {
    type: String,
  },
  consultationRoomId: {
    type: String,
  },
}, {
  timestamps: true,
});

// Create indexes
AppointmentSchema.index({ doctorId: 1, date: 1 });
AppointmentSchema.index({ patientId: 1, date: -1 });
AppointmentSchema.index({ status: 1 });
AppointmentSchema.index({ date: 1, time: 1 });

// Check if the model already exists before defining it
// This prevents the OverwriteModelError in hot-reloading environments
const Appointment: Model<IAppointment> = (mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema)) as Model<IAppointment>;

export default Appointment;