import { NextResponse } from 'next/server';
import connectDB from '@/lib/database/connection';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Database connection failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}