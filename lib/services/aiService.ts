export interface AIAnalysisRequest {
  images: File[];
  symptoms: string[];
  questionnaire: Record<string, string>;
  modelId: string;
  settings: {
    sensitivity: number;
    includeRecommendations: boolean;
    detailedReport: boolean;
    compareWithDatabase: boolean;
    anonymousMode: boolean;
  };
}

export interface AIAnalysisResult {
  id: string;
  condition: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
  needsConsultation: boolean;
  detectedConditions: {
    name: string;
    confidence: number;
    position?: [number, number, number];
  }[];
  similarCases?: {
    id: string;
    similarity: number;
    outcome: string;
  }[];
}

class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_AI_API_KEY || '';
    this.baseUrl = process.env.NEXT_PUBLIC_AI_API_URL || 'https://api.skinshine.ai';
  }

  async analyzeImages(request: AIAnalysisRequest): Promise<AIAnalysisResult> {
    // Simulate AI processing for demo
    await this.simulateProcessing();

    // In production, replace with actual AI API call
    const formData = new FormData();
    request.images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });
    formData.append('symptoms', JSON.stringify(request.symptoms));
    formData.append('questionnaire', JSON.stringify(request.questionnaire));
    formData.append('modelId', request.modelId);
    formData.append('settings', JSON.stringify(request.settings));

    try {
      // Uncomment for production API call
      // const response = await fetch(`${this.baseUrl}/analyze`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${this.apiKey}`,
      //   },
      //   body: formData
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('AI analysis failed');
      // }
      // 
      // return await response.json();

      // Demo response
      return this.generateDemoResult(request);
    } catch (error) {
      console.error('AI Analysis error:', error);
      throw new Error('Failed to analyze images. Please try again.');
    }
  }

  private async simulateProcessing(): Promise<void> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  private generateDemoResult(request: AIAnalysisRequest): AIAnalysisResult {
    const hasAcne = request.symptoms.includes('Acne/Pimples');
    const hasDrySkin = request.symptoms.includes('Dry Skin');
    const hasRedness = request.symptoms.includes('Redness/Irritation');

    if (hasAcne) {
      return {
        id: `analysis_${Date.now()}`,
        condition: 'Acne Vulgaris',
        confidence: 87,
        severity: 'medium',
        description: 'Based on the AI analysis of your images and symptoms, you appear to have moderate acne vulgaris. This is characterized by inflammatory lesions, clogged pores, and bacterial activity.',
        recommendations: [
          'Use a gentle, non-comedogenic cleanser twice daily',
          'Apply salicylic acid (2%) or benzoyl peroxide (2.5%) treatment',
          'Avoid touching or picking at affected areas',
          'Use oil-free, non-comedogenic moisturizer',
          'Consider professional dermatological consultation for persistent acne'
        ],
        needsConsultation: true,
        detectedConditions: [
          { name: 'Inflammatory Acne', confidence: 87, position: [1.5, 0.5, 1] },
          { name: 'Comedonal Acne', confidence: 72, position: [-1.2, -0.8, 1.2] }
        ],
        similarCases: [
          { id: 'case_001', similarity: 89, outcome: 'Improved with topical retinoids' },
          { id: 'case_002', similarity: 84, outcome: 'Cleared with combination therapy' }
        ]
      };
    } else if (hasDrySkin) {
      return {
        id: `analysis_${Date.now()}`,
        condition: 'Xerosis (Dry Skin)',
        confidence: 92,
        severity: 'low',
        description: 'Your skin analysis indicates xerosis, commonly known as dry skin. This condition is characterized by reduced moisture content and compromised skin barrier function.',
        recommendations: [
          'Use a gentle, fragrance-free cleanser',
          'Apply moisturizer immediately after bathing while skin is damp',
          'Use a humidifier in dry environments',
          'Avoid hot showers and harsh soaps',
          'Consider hyaluronic acid serums for enhanced hydration'
        ],
        needsConsultation: false,
        detectedConditions: [
          { name: 'Dry Patches', confidence: 92, position: [0.8, -0.3, 1.5] },
          { name: 'Flaky Skin', confidence: 78, position: [-0.5, 1.2, 1.1] }
        ]
      };
    } else {
      return {
        id: `analysis_${Date.now()}`,
        condition: 'Healthy Skin with Minor Concerns',
        confidence: 78,
        severity: 'low',
        description: 'Your skin appears to be generally healthy with some minor concerns that can be addressed with proper skincare routine and preventive measures.',
        recommendations: [
          'Maintain a consistent daily skincare routine',
          'Use broad-spectrum sunscreen (SPF 30+) daily',
          'Stay hydrated and maintain a balanced diet',
          'Get adequate sleep for optimal skin repair',
          'Consider regular dermatological check-ups for prevention'
        ],
        needsConsultation: false,
        detectedConditions: [
          { name: 'Minor Texture Issues', confidence: 65, position: [0.2, 0.8, 1.3] }
        ]
      };
    }
  }

  async getAIModels(): Promise<any[]> {
    // In production, fetch from your AI service
    return [
      {
        id: 'derma-ai-v3',
        name: 'DermaAI v3.0',
        description: 'Latest model trained on 100K+ dermatological images',
        accuracy: 94.5,
        speed: 'Fast',
        specialization: ['Acne', 'Eczema', 'Psoriasis', 'Melanoma Detection']
      },
      {
        id: 'skin-expert-pro',
        name: 'SkinExpert Pro',
        description: 'Specialized for Indian skin types and conditions',
        accuracy: 92.8,
        speed: 'Medium',
        specialization: ['Pigmentation', 'Fungal Infections', 'Allergic Reactions']
      }
    ];
  }
}

export const aiService = new AIService();