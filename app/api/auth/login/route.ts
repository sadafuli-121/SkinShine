import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/authService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, token } = await authService.login(body);
    
    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}