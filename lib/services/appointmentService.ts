import connectDB from '@/lib/database/connection';
import Appointment, { IAppointment } from '@/lib/database/models/Appointment';
import User from '@/lib/database/models/User';
import mongoose from 'mongoose';

export interface BookingData {
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  type: 'video' | 'chat';
  symptoms?: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface AppointmentWithDetails extends IAppointment {
  doctor?: any;
  patient?: any;
}

class AppointmentService {
  async bookAppointment(bookingData: BookingData): Promise<IAppointment> {
    await connectDB();

    // Get doctor to calculate amount
    const doctor = await User.findById(bookingData.doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Calculate amount based on consultation type
    const baseAmount = doctor.consultationFee || 500;
    const amount = bookingData.type === 'video' ? baseAmount : Math.round(baseAmount * 0.7);

    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId: bookingData.doctorId,
      date: new Date(bookingData.date),
      time: bookingData.time,
      status: { $in: ['scheduled', 'in-progress'] }
    });

    if (existingAppointment) {
      throw new Error('This time slot is already booked');
    }

    // Create appointment
    const appointment = new Appointment({
      doctorId: new mongoose.Types.ObjectId(bookingData.doctorId),
      patientId: new mongoose.Types.ObjectId(bookingData.patientId),
      date: new Date(bookingData.date),
      time: bookingData.time,
      type: bookingData.type,
      symptoms: bookingData.symptoms,
      urgency: bookingData.urgency,
      amount,
      paymentStatus: 'pending',
      consultationRoomId: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    await appointment.save();
    return appointment;
  }

  async getAppointments(userId: string, role: 'patient' | 'doctor'): Promise<AppointmentWithDetails[]> {
    await connectDB();

    const query = role === 'patient' 
      ? { patientId: new mongoose.Types.ObjectId(userId) }
      : { doctorId: new mongoose.Types.ObjectId(userId) };

    const appointments = await Appointment.find(query)
      .populate('doctorId', 'name specialization avatar rating')
      .populate('patientId', 'name avatar dateOfBirth gender')
      .sort({ date: -1, time: -1 });

    return appointments.map(apt => ({
      ...apt.toObject(),
      doctor: apt.doctorId,
      patient: apt.patientId,
    }));
  }

  async getAppointmentById(appointmentId: string): Promise<AppointmentWithDetails | null> {
    await connectDB();

    const appointment = await Appointment.findById(appointmentId)
      .populate('doctorId', 'name specialization avatar rating')
      .populate('patientId', 'name avatar dateOfBirth gender');

    if (!appointment) {
      return null;
    }

    return {
      ...appointment.toObject(),
      doctor: appointment.doctorId,
      patient: appointment.patientId,
    };
  }

  async updateAppointmentStatus(
    appointmentId: string, 
    status: IAppointment['status'],
    updates?: Partial<IAppointment>
  ): Promise<IAppointment | null> {
    await connectDB();

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status, ...updates, updatedAt: new Date() },
      { new: true }
    );

    return appointment;
  }

  async cancelAppointment(appointmentId: string, userId: string): Promise<void> {
    await connectDB();

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Check if user has permission to cancel
    const canCancel = appointment.patientId.toString() === userId || 
                     appointment.doctorId.toString() === userId;
    
    if (!canCancel) {
      throw new Error('You do not have permission to cancel this appointment');
    }

    // Check if appointment can be cancelled (not in past or already completed)
    const appointmentDateTime = new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.time}`);
    const now = new Date();
    
    if (appointmentDateTime < now && appointment.status !== 'scheduled') {
      throw new Error('Cannot cancel past or completed appointments');
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
      status: 'cancelled',
      updatedAt: new Date(),
    });
  }

  async getDoctorAvailability(doctorId: string, date: string): Promise<string[]> {
    await connectDB();

    const doctor = await User.findById(doctorId);
    if (!doctor || !doctor.availability) {
      return [];
    }

    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const availableSlots = doctor.availability.get(dayName) || [];

    // Get booked slots for the date
    const bookedAppointments = await Appointment.find({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      date: new Date(date),
      status: { $in: ['scheduled', 'in-progress'] }
    });

    const bookedSlots = bookedAppointments.map(apt => apt.time);

    // Return available slots that are not booked
    return availableSlots.filter(slot => !bookedSlots.includes(slot));
  }
}

export const appointmentService = new AppointmentService();