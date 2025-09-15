import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/services/aiService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const images: File[] = [];
    const symptoms = JSON.parse(formData.get('symptoms') as string || '[]');
    const questionnaire = JSON.parse(formData.get('questionnaire') as string || '{}');
    const modelId = formData.get('modelId') as string || 'derma-ai-v3';
    const settings = JSON.parse(formData.get('settings') as string || '{}');

    // Extract images from form data
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('image_') && value instanceof File) {
        images.push(value);
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided for analysis' },
        { status: 400 }
      );
    }

    const result = await aiService.analyzeImages({
      images,
      symptoms,
      questionnaire,
      modelId,
      settings
    });

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('AI analysis failed:', error);
    return NextResponse.json(
      { error: error.message || 'AI analysis failed' },
      { status: 500 }
    );
  }
}