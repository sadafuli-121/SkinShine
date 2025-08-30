import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/authService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      specialization: searchParams.get('specialization') || undefined,
      language: searchParams.get('language') || undefined,
      minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
      maxFee: searchParams.get('maxFee') ? parseInt(searchParams.get('maxFee')!) : undefined,
      search: searchParams.get('search') || undefined,
    };

    const doctors = await authService.getDoctors(filters);
    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}