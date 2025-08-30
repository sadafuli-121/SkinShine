import { NextRequest, NextResponse } from 'next/server';
import { appointmentService } from '@/lib/services/appointmentService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function getUserFromToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('No token provided');
  
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return decoded.userId;
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserFromToken(request);
    const body = await request.json();
    
    const appointment = await appointmentService.bookAppointment({
      ...body,
      patientId: userId
    });
    
    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to book appointment' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserFromToken(request);
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role') as 'patient' | 'doctor';
    
    const appointments = await appointmentService.getAppointments(userId, role);
    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}