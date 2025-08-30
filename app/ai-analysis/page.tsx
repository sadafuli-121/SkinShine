// 'use client';

// import { useState, useRef } from 'react';
// import { useAuth } from '@/components/providers';
// import { Navbar } from '@/components/layout/navbar';
// import { Footer } from '@/components/layout/footer';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { SkinModel } from '@/components/3d/SkinModel';
// import { ChatBot } from '@/components/ai/ChatBot';
// import { FadeIn, SlideIn } from '@/components/layout/page-transition';
// import { useLoading } from '@/hooks/use-loading';
// import { toast } from 'sonner';
// import { 
//   Camera, 
//   Upload, 
//   Brain, 
//   Loader2, 
//   CheckCircle, 
//   AlertTriangle,
//   Eye,
//   Zap,
//   Shield,
//   Star,
//   ArrowRight,
//   RefreshCw
// } from 'lucide-react';

// interface AnalysisResult {
//   condition: string;
//   confidence: number;
//   severity: 'low' | 'medium' | 'high';
//   description: string;
//   recommendations: string[];
//   needsConsultation: boolean;
// }

// export default function AIAnalysisPage() {
//   const { user } = useAuth();
//   const [step, setStep] = useState(1);
//   const [images, setImages] = useState<File[]>([]);
//   const [symptoms, setSymptoms] = useState<string[]>([]);
//   const [questionnaire, setQuestionnaire] = useState<Record<string, string>>({});
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
//   const { isLoading: isAnalyzing, withLoading } = useLoading(false);
//   const [progress, setProgress] = useState(0);
//   const [showChatBot, setShowChatBot] = useState(false);
//   const [chatMinimized, setChatMinimized] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const commonSymptoms = [
//     'Acne/Pimples', 'Dry Skin', 'Oily Skin', 'Redness/Irritation',
//     'Itching', 'Rash', 'Dark Spots', 'Wrinkles/Fine Lines',
//     'Blackheads', 'Sensitive Skin', 'Uneven Skin Tone', 'Enlarged Pores'
//   ];

//   const questions = [
//     {
//       id: 'duration',
//       question: 'How long have you been experiencing this condition?',
//       options: ['Less than 1 week', '1-4 weeks', '1-6 months', 'More than 6 months']
//     },
//     {
//       id: 'triggers',
//       question: 'Have you noticed any triggers that worsen the condition?',
//       options: ['Sun exposure', 'Stress', 'Certain foods', 'Weather changes', 'Cosmetic products', 'None identified']
//     },
//     {
//       id: 'previous_treatment',
//       question: 'Have you tried any treatments for this condition?',
//       options: ['Over-the-counter creams', 'Prescription medication', 'Home remedies', 'Professional treatment', 'No treatment yet']
//     },
//     {
//       id: 'family_history',
//       question: 'Do you have a family history of skin conditions?',
//       options: ['Yes, similar condition', 'Yes, other skin conditions', 'No family history', 'Not sure']
//     }
//   ];

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length > 0) {
//       setImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
//       toast.success(`${files.length} image(s) uploaded successfully`);
//     }
//   };

//   const removeImage = (index: number) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSymptomToggle = (symptom: string) => {
//     setSymptoms(prev => 
//       prev.includes(symptom) 
//         ? prev.filter(s => s !== symptom)
//         : [...prev, symptom]
//     );
//   };

//   const handleQuestionnaireChange = (questionId: string, answer: string) => {
//     setQuestionnaire(prev => ({ ...prev, [questionId]: answer }));
//   };

//   const simulateAIAnalysis = async (): Promise<AnalysisResult> => {
//     // Simulate AI processing with progress updates
//     const steps = [
//       'Preprocessing images...',
//       'Analyzing skin texture...',
//       'Detecting patterns...',
//       'Comparing with database...',
//       'Generating recommendations...'
//     ];

//     for (let i = 0; i < steps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setProgress((i + 1) * 20);
//     }

//     // Simulate analysis based on symptoms
//     const hasAcne = symptoms.includes('Acne/Pimples');
//     const hasDrySkin = symptoms.includes('Dry Skin');
//     const hasRedness = symptoms.includes('Redness/Irritation');

//     if (hasAcne) {
//       return {
//         condition: 'Acne Vulgaris',
//         confidence: 87,
//         severity: 'medium',
//         description: 'Based on the analysis, you appear to have moderate acne vulgaris. This is a common skin condition characterized by clogged pores, inflammation, and bacterial growth.',
//         recommendations: [
//           'Use a gentle, non-comedogenic cleanser twice daily',
//           'Apply salicylic acid or benzoyl peroxide treatment',
//           'Avoid touching or picking at affected areas',
//           'Use oil-free, non-comedogenic moisturizer',
//           'Consider professional treatment for persistent acne'
//         ],
//         needsConsultation: true
//       };
//     } else if (hasDrySkin) {
//       return {
//         condition: 'Xerosis (Dry Skin)',
//         confidence: 92,
//         severity: 'low',
//         description: 'Your skin shows signs of dryness and dehydration. This is often caused by environmental factors, genetics, or skincare routine.',
//         recommendations: [
//           'Use a gentle, fragrance-free cleanser',
//           'Apply moisturizer while skin is still damp',
//           'Use a humidifier in dry environments',
//           'Avoid hot showers and harsh soaps',
//           'Consider hyaluronic acid serums for extra hydration'
//         ],
//         needsConsultation: false
//       };
//     } else {
//       return {
//         condition: 'Healthy Skin with Minor Concerns',
//         confidence: 78,
//         severity: 'low',
//         description: 'Your skin appears to be generally healthy with some minor concerns that can be addressed with proper skincare routine.',
//         recommendations: [
//           'Maintain a consistent daily skincare routine',
//           'Use broad-spectrum sunscreen daily',
//           'Stay hydrated and eat a balanced diet',
//           'Get adequate sleep for skin repair',
//           'Consider regular dermatological check-ups'
//         ],
//         needsConsultation: false
//       };
//     }
//   };

//   const handleAnalysis = async () => {
//     if (images.length === 0) {
//       toast.error('Please upload at least one image');
//       return;
//     }

//     setProgress(0);

//     await withLoading(async () => {
//       const result = await simulateAIAnalysis();
//       setAnalysisResult(result);
//       setStep(4);
//       toast.success('Analysis completed successfully!');
//     });
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'high': return 'text-red-600 bg-red-100';
//       case 'medium': return 'text-yellow-600 bg-yellow-100';
//       case 'low': return 'text-green-600 bg-green-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const sampleConditions = [
//     {
//       id: '1',
//       name: 'Mild Acne',
//       position: [1.5, 0.5, 1] as [number, number, number],
//       severity: 'medium' as const,
//       description: 'Small inflammatory lesions detected in the cheek area'
//     },
//     {
//       id: '2',
//       name: 'Dry Patch',
//       position: [-1.2, -0.8, 1.2] as [number, number, number],
//       severity: 'low' as const,
//       description: 'Area of skin dryness requiring moisturization'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <FadeIn>
//           <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             AI Skin Analysis
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Get instant, AI-powered analysis of your skin condition. Upload photos and answer a few questions 
//             to receive personalized recommendations from our advanced dermatology AI.
//           </p>
//           </div>
//         </FadeIn>

//         {/* Progress Indicator */}
//         <SlideIn direction="down">
//           <div className="flex items-center justify-center space-x-4 mb-8">
//           {[1, 2, 3, 4].map((stepNum) => (
//             <div key={stepNum} className="flex items-center">
//               <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
//                 step >= stepNum 
//                   ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
//                   : 'bg-gray-200 text-gray-600'
//               }`}>
//                 {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
//               </div>
//               {stepNum < 4 && (
//                 <div className={`w-16 h-1 mx-2 ${
//                   step > stepNum ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
//                 }`}></div>
//               )}
//             </div>
//           ))}
//           </div>
//         </SlideIn>

//         {/* Step Content */}
//         <FadeIn delay={0.2}>
//           <div className="max-w-4xl mx-auto">
//           {/* Step 1: Image Upload */}
//           {step === 1 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Camera className="w-6 h-6" />
//                   <span>Upload Skin Images</span>
//                 </CardTitle>
//                 <CardDescription>
//                   Upload clear, well-lit photos of the affected area. You can upload up to 5 images for better analysis.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleImageUpload}
//                     accept="image/*"
//                     multiple
//                     className="hidden"
//                   />
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Images</h3>
//                   <p className="text-gray-600 mb-4">
//                     Drag and drop your images here, or click to browse
//                   </p>
//                   <Button onClick={() => fileInputRef.current?.click()}>
//                     Choose Files
//                   </Button>
//                 </div>

//                 {images.length > 0 && (
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {images.map((image, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={URL.createObjectURL(image)}
//                           alt={`Upload ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-lg"
//                         />
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => removeImage(index)}
//                           className="absolute top-2 right-2 h-6 w-6 p-0"
//                         >
//                           ×
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <div className="text-sm text-gray-600">
//                     {images.length}/5 images uploaded
//                   </div>
//                   <Button 
//                     onClick={() => setStep(2)} 
//                     disabled={images.length === 0}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   >
//                     Next: Describe Symptoms
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 2: Symptoms */}
//           {step === 2 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Eye className="w-6 h-6" />
//                   <span>Describe Your Symptoms</span>
//                 </CardTitle>
//                 <CardDescription>
//                   Select all symptoms you're experiencing. This helps our AI provide more accurate analysis.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {commonSymptoms.map((symptom) => (
//                     <div key={symptom} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={symptom}
//                         checked={symptoms.includes(symptom)}
//                         onCheckedChange={() => handleSymptomToggle(symptom)}
//                       />
//                       <Label htmlFor={symptom} className="text-sm cursor-pointer">
//                         {symptom}
//                       </Label>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="additional-symptoms">Additional Symptoms or Concerns</Label>
//                   <Textarea
//                     id="additional-symptoms"
//                     placeholder="Describe any other symptoms, concerns, or details about your skin condition..."
//                     rows={4}
//                   />
//                 </div>

//                 <div className="flex justify-between">
//                   <Button variant="outline" onClick={() => setStep(1)}>
//                     Back
//                   </Button>
//                   <Button 
//                     onClick={() => setStep(3)}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   >
//                     Next: Answer Questions
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 3: Questionnaire */}
//           {step === 3 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Brain className="w-6 h-6" />
//                   <span>Medical Questionnaire</span>
//                 </CardTitle>
//                 <CardDescription>
//                   Answer these questions to help our AI understand your condition better.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-8">
//                 {questions.map((question) => (
//                   <div key={question.id} className="space-y-3">
//                     <Label className="text-base font-medium">{question.question}</Label>
//                     <RadioGroup
//                       value={questionnaire[question.id] || ''}
//                       onValueChange={(value) => handleQuestionnaireChange(question.id, value)}
//                     >
//                       {question.options.map((option) => (
//                         <div key={option} className="flex items-center space-x-2">
//                           <RadioGroupItem value={option} id={`${question.id}-${option}`} />
//                           <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer">
//                             {option}
//                           </Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </div>
//                 ))}

//                 <div className="flex justify-between">
//                   <Button variant="outline" onClick={() => setStep(2)}>
//                     Back
//                   </Button>
//                   <Button 
//                     onClick={handleAnalysis}
//                     disabled={isAnalyzing || Object.keys(questionnaire).length < questions.length}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Analyzing...
//                       </>
//                     ) : (
//                       <>
//                         Start AI Analysis
//                         <Zap className="w-4 h-4 ml-2" />
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Analysis Progress */}
//           {isAnalyzing && (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Brain className="w-6 h-6 animate-pulse" />
//                   <span>AI Analysis in Progress</span>
//                 </CardTitle>
//                 <CardDescription>
//                   Our advanced AI is analyzing your images and symptoms...
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="text-center">
//                   <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Brain className="w-12 h-12 text-white animate-pulse" />
//                   </div>
//                   <Progress value={progress} className="w-full mb-4" />
//                   <p className="text-sm text-gray-600">
//                     Processing {images.length} image(s) and {symptoms.length} symptom(s)...
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 4: Results */}
//           {step === 4 && analysisResult && (
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <CheckCircle className="w-6 h-6 text-green-600" />
//                     <span>Analysis Complete</span>
//                   </CardTitle>
//                   <CardDescription>
//                     Here are your personalized results based on AI analysis
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-gray-900">{analysisResult.confidence}%</div>
//                       <div className="text-sm text-gray-600">Confidence Level</div>
//                     </div>
//                     <div className="text-center">
//                       <Badge className={getSeverityColor(analysisResult.severity)}>
//                         {analysisResult.severity} severity
//                       </Badge>
//                       <div className="text-sm text-gray-600 mt-1">Condition Level</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-lg font-semibold text-gray-900">{analysisResult.condition}</div>
//                       <div className="text-sm text-gray-600">Detected Condition</div>
//                     </div>
//                   </div>

//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-blue-900 mb-2">Analysis Summary</h4>
//                     <p className="text-blue-800">{analysisResult.description}</p>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-3">Recommended Actions</h4>
//                     <ul className="space-y-2">
//                       {analysisResult.recommendations.map((rec, index) => (
//                         <li key={index} className="flex items-start space-x-2">
//                           <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
//                           <span className="text-gray-700">{rec}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {analysisResult.needsConsultation && (
//                     <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
//                       <div className="flex items-start space-x-2">
//                         <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
//                         <div>
//                           <h4 className="font-semibold text-yellow-800">Professional Consultation Recommended</h4>
//                           <p className="text-yellow-700 mt-1">
//                             Based on the analysis, we recommend consulting with a dermatologist for proper diagnosis and treatment plan.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <Button 
//                       onClick={() => {
//                         setStep(1);
//                         setImages([]);
//                         setSymptoms([]);
//                         setQuestionnaire({});
//                         setAnalysisResult(null);
//                       }}
//                       variant="outline"
//                       className="flex-1"
//                     >
//                       <RefreshCw className="w-4 h-4 mr-2" />
//                       New Analysis
//                     </Button>
//                     <Button 
//                       className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                       onClick={() => window.open('/find-doctors', '_blank')}
//                     >
//                       Book Consultation
//                       <ArrowRight className="w-4 h-4 ml-2" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* 3D Skin Model */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
//                       <span className="text-white text-xs font-bold">3D</span>
//                     </div>
//                     <span>Interactive 3D Skin Model</span>
//                   </CardTitle>
//                   <CardDescription>
//                     Explore the detected conditions on an interactive 3D model. Click on markers to see details.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-96 bg-gray-100 rounded-lg">
//                     <SkinModel 
//                       conditions={sampleConditions}
//                       onConditionClick={(condition) => {
//                         toast.info(`Viewing: ${condition.name}`);
//                       }}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//           </div>
//         </FadeIn>

//         {/* Features Grid */}
//         {step === 1 && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//             <Card className="text-center">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Brain className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <CardTitle className="text-lg">Advanced AI Analysis</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Our AI has been trained on thousands of dermatological cases to provide accurate analysis.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Shield className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <CardTitle className="text-lg">Secure & Private</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Your images and data are encrypted and processed securely with DPDP Act compliance.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Star className="w-6 h-6 text-green-600" />
//                 </div>
//                 <CardTitle className="text-lg">Expert Validated</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   All AI recommendations are based on guidelines from certified dermatologists.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>

//       {/* AI Chatbot */}
//       <ChatBot 
//         isOpen={showChatBot} 
//         onToggle={() => setShowChatBot(!showChatBot)}
//         isMinimized={chatMinimized}
//         onMinimize={() => setChatMinimized(!chatMinimized)}
//       />

//       <Footer />
//     </div>
//   );
// }

'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SkinModel } from '@/components/3d/SkinModel';
import { ChatBot } from '@/components/ai/ChatBot';
import { FadeIn, SlideIn } from '@/components/layout/page-transition';
import { useLoading } from '@/hooks/use-loading';
import { toast } from 'sonner';
import {
  Camera,
  Upload,
  Brain,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Eye,
  Zap,
  Shield,
  Star,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface AnalysisResult {
  condition: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
  needsConsultation: boolean;
}

export default function AIAnalysisPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Record<string, string>>({});
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { isLoading: isAnalyzing, withLoading } = useLoading(false);
  const [progress, setProgress] = useState(0);
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const commonSymptoms = [
    'Acne/Pimples', 'Dry Skin', 'Oily Skin', 'Redness/Irritation',
    'Itching', 'Rash', 'Dark Spots', 'Wrinkles/Fine Lines',
    'Blackheads', 'Sensitive Skin', 'Uneven Skin Tone', 'Enlarged Pores'
  ];

  const questions = [
    {
      id: 'duration',
      question: 'How long have you been experiencing this condition?',
      options: ['Less than 1 week', '1-4 weeks', '1-6 months', 'More than 6 months']
    },
    {
      id: 'triggers',
      question: 'Have you noticed any triggers that worsen the condition?',
      options: ['Sun exposure', 'Stress', 'Certain foods', 'Weather changes', 'Cosmetic products', 'None identified']
    },
    {
      id: 'previous_treatment',
      question: 'Have you tried any treatments for this condition?',
      options: ['Over-the-counter creams', 'Prescription medication', 'Home remedies', 'Professional treatment', 'No treatment yet']
    },
    {
      id: 'family_history',
      question: 'Do you have a family history of skin conditions?',
      options: ['Yes, similar condition', 'Yes, other skin conditions', 'No family history', 'Not sure']
    }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
      toast.success(`${files.length} image(s) uploaded successfully`);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleQuestionnaireChange = (questionId: string, answer: string) => {
    setQuestionnaire(prev => ({ ...prev, [questionId]: answer }));
  };

  const simulateAIAnalysis = async (): Promise<AnalysisResult> => {
    // Simulate AI processing with progress updates
    const steps = [
      'Preprocessing images...',
      'Analyzing skin texture...',
      'Detecting patterns...',
      'Comparing with database...',
      'Generating recommendations...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 20);
    }

    // Simulate analysis based on symptoms
    const hasAcne = symptoms.includes('Acne/Pimples');
    const hasDrySkin = symptoms.includes('Dry Skin');

    if (hasAcne) {
      return {
        condition: 'Acne Vulgaris',
        confidence: 87,
        severity: 'medium',
        description: 'Based on the analysis, you appear to have moderate acne vulgaris. This is a common skin condition characterized by clogged pores, inflammation, and bacterial growth.',
        recommendations: [
          'Use a gentle, non-comedogenic cleanser twice daily',
          'Apply salicylic acid or benzoyl peroxide treatment',
          'Avoid touching or picking at affected areas',
          'Use oil-free, non-comedogenic moisturizer',
          'Consider professional treatment for persistent acne'
        ],
        needsConsultation: true
      };
    } else if (hasDrySkin) {
      return {
        condition: 'Xerosis (Dry Skin)',
        confidence: 92,
        severity: 'low',
        description: 'Your skin shows signs of dryness and dehydration. This is often caused by environmental factors, genetics, or skincare routine.',
        recommendations: [
          'Use a gentle, fragrance-free cleanser',
          'Apply moisturizer while skin is still damp',
          'Use a humidifier in dry environments',
          'Avoid hot showers and harsh soaps',
          'Consider hyaluronic acid serums for extra hydration'
        ],
        needsConsultation: false
      };
    } else {
      return {
        condition: 'Healthy Skin with Minor Concerns',
        confidence: 78,
        severity: 'low',
        description: 'Your skin appears to be generally healthy with some minor concerns that can be addressed with proper skincare routine.',
        recommendations: [
          'Maintain a consistent daily skincare routine',
          'Use broad-spectrum sunscreen daily',
          'Stay hydrated and eat a balanced diet',
          'Get adequate sleep for skin repair',
          'Consider regular dermatological check-ups'
        ],
        needsConsultation: false
      };
    }
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setProgress(0);

    await withLoading(async () => {
      const result = await simulateAIAnalysis();
      setAnalysisResult(result);
      setStep(4);
      toast.success('Analysis completed successfully!');
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const sampleConditions = [
    {
      id: '1',
      name: 'Mild Acne',
      position: [1.5, 0.5, 1] as [number, number, number],
      severity: 'medium' as const,
      description: 'Small inflammatory lesions detected in the cheek area'
    },
    {
      id: '2',
      name: 'Dry Patch',
      position: [-1.2, -0.8, 1.2] as [number, number, number],
      severity: 'low' as const,
      description: 'Area of skin dryness requiring moisturization'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Skin Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant, AI-powered analysis of your skin condition. Upload photos and answer a few questions
              to receive personalized recommendations from our advanced dermatology AI.
            </p>
          </div>
        </FadeIn>

        {/* Progress Indicator */}
        <SlideIn direction="down">
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </SlideIn>

        {/* Step Content */}
        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Image Upload */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-6 h-6" />
                    <span>Upload Skin Images</span>
                  </CardTitle>
                  <CardDescription>
                    Upload clear, well-lit photos of the affected area. You can upload up to 5 images for better analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Images</h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your images here, or click to browse
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Choose Files
                    </Button>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">
                      {images.length}/5 images uploaded
                    </div>
                    <Button
                      onClick={() => setStep(2)}
                      disabled={images.length === 0}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Next: Describe Symptoms
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Symptoms */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-6 h-6" />
                    <span>Describe Your Symptoms</span>
                  </CardTitle>
                  <CardDescription>
                    Select all symptoms you're experiencing. This helps our AI provide more accurate analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {commonSymptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={symptoms.includes(symptom)}
                          onCheckedChange={() => handleSymptomToggle(symptom)}
                        />
                        <Label htmlFor={symptom} className="text-sm cursor-pointer">
                          {symptom}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-symptoms">Additional Symptoms or Concerns</Label>
                    <Textarea
                      id="additional-symptoms"
                      placeholder="Describe any other symptoms, concerns, or details about your skin condition..."
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Next: Answer Questions
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Questionnaire */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-6 h-6" />
                    <span>Medical Questionnaire</span>
                  </CardTitle>
                  <CardDescription>
                    Answer these questions to help our AI understand your condition better.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {questions.map((question) => (
                    <div key={question.id} className="space-y-3">
                      <Label className="text-base font-medium">{question.question}</Label>
                      <RadioGroup
                        value={questionnaire[question.id] || ''}
                        onValueChange={(value) => handleQuestionnaireChange(question.id, value)}
                      >
                        {question.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                            <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      onClick={handleAnalysis}
                      disabled={isAnalyzing || Object.keys(questionnaire).length < questions.length}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Start AI Analysis
                          <Zap className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Progress */}
            {isAnalyzing && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-6 h-6 animate-pulse" />
                    <span>AI Analysis in Progress</span>
                  </CardTitle>
                  <CardDescription>
                    Our advanced AI is analyzing your images and symptoms...
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-12 h-12 text-white animate-pulse" />
                    </div>
                    <Progress value={progress} className="w-full mb-4" />
                    <p className="text-sm text-gray-600">
                      Processing {images.length} image(s) and {symptoms.length} symptom(s)...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Results */}
            {step === 4 && analysisResult && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span>Analysis Complete</span>
                    </CardTitle>
                    <CardDescription>
                      Here are your personalized results based on AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{analysisResult.confidence}%</div>
                        <div className="text-sm text-gray-600">Confidence Level</div>
                      </div>
                      <div className="text-center">
                        <Badge className={getSeverityColor(analysisResult.severity)}>
                          {analysisResult.severity} severity
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">Condition Level</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{analysisResult.condition}</div>
                        <div className="text-sm text-gray-600">Detected Condition</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Analysis Summary</h4>
                      <p className="text-blue-800">{analysisResult.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Recommended Actions</h4>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {analysisResult.needsConsultation && (
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-800">Professional Consultation Recommended</h4>
                            <p className="text-yellow-700 mt-1">
                              Based on the analysis, we recommend consulting with a dermatologist for proper diagnosis and treatment plan.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => {
                          setStep(1);
                          setImages([]);
                          setSymptoms([]);
                          setQuestionnaire({});
                          setAnalysisResult(null);
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        New Analysis
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => window.open('/find-doctors', '_blank')}
                      >
                        Book Consultation
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* 3D Skin Model */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">3D</span>
                      </div>
                      <span>Interactive 3D Skin Model</span>
                    </CardTitle>
                    <CardDescription>
                      Explore the detected conditions on an interactive 3D model. Click on markers to see details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-gray-100 rounded-lg">
                      <SkinModel
                        conditions={sampleConditions}
                        onConditionClick={(condition) => {
                          toast.info(`Viewing: ${condition.name}`);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Features Grid */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Advanced AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI has been trained on thousands of dermatological cases to provide accurate analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your images and data are encrypted and processed securely with DPDP Act compliance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Expert Validated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All AI recommendations are based on guidelines from certified dermatologists.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* AI Chatbot */}
      <ChatBot
        isOpen={showChatBot}
        onToggle={() => setShowChatBot(!showChatBot)}
        isMinimized={chatMinimized}
        onMinimize={() => setChatMinimized(!chatMinimized)}
      />

      <Footer />
    </div>
  );
}