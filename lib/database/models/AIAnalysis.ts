import mongoose, { Document, Schema } from 'mongoose';

export interface IAIAnalysis extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  images: string[];
  symptoms: string[];
  questionnaire: {
    question: string;
    answer: string;
  }[];
  analysis: {
    condition: string;
    confidence: number;
    description: string;
    recommendations: string[];
    severity: 'low' | 'medium' | 'high';
  };
  status: 'processing' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const AIAnalysisSchema = new Schema<IAIAnalysis>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  symptoms: [{
    type: String,
  }],
  questionnaire: [{
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  }],
  analysis: {
    condition: {
      type: String,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
    },
    recommendations: [{
      type: String,
    }],
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
    },
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing',
  },
}, {
  timestamps: true,
});

// Create indexes
AIAnalysisSchema.index({ userId: 1, createdAt: -1 });
AIAnalysisSchema.index({ status: 1 });

export default mongoose.models.AIAnalysis || mongoose.model<IAIAnalysis>('AIAnalysis', AIAnalysisSchema);