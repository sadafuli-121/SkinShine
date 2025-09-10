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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { SkinModel } from '@/components/3d/SkinModel';
import { ChatBot } from '@/components/ai/ChatBot';
import { toast } from 'sonner';
import { 
  Brain, 
  Camera, 
  Upload, 
  Zap, 
  Eye,
  Microscope,
  Cpu,
  Database,
  TrendingUp,
  Shield,
  Sparkles,
  Settings,
  Download,
  Share2
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  speed: string;
  specialization: string[];
}

interface AnalysisSettings {
  sensitivity: number;
  includeRecommendations: boolean;
  detailedReport: boolean;
  compareWithDatabase: boolean;
  anonymousMode: boolean;
}

export default function AdvancedAIPage() {
  const { user } = useAuth();
  const [selectedModel, setSelectedModel] = useState('derma-ai-v3');
  const [analysisSettings, setAnalysisSettings] = useState<AnalysisSettings>({
    sensitivity: 75,
    includeRecommendations: true,
    detailedReport: true,
    compareWithDatabase: true,
    anonymousMode: false
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aiModels: AIModel[] = [
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
    },
    {
      id: 'cosmetic-analyzer',
      name: 'Cosmetic Analyzer',
      description: 'Focused on cosmetic and aesthetic concerns',
      accuracy: 89.2,
      speed: 'Fast',
      specialization: ['Aging', 'Wrinkles', 'Dark Spots', 'Skin Texture']
    }
  ];

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
    },
    {
      id: '3',
      name: 'Hyperpigmentation',
      position: [0.8, -0.3, 1.5] as [number, number, number],
      severity: 'medium' as const,
      description: 'Dark spots likely caused by sun exposure'
    }
  ];

  const handleAdvancedAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);

    const steps = [
      'Initializing AI model...',
      'Preprocessing images with advanced filters...',
      'Running deep learning analysis...',
      'Cross-referencing with medical database...',
      'Generating detailed recommendations...',
      'Preparing 3D visualization...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress((i + 1) * (100 / steps.length));
      toast.info(steps[i]);
    }

    setIsAnalyzing(false);
    toast.success('Advanced AI analysis completed!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced AI Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience next-generation skin analysis with our most advanced AI models, 
            3D visualization, and comprehensive reporting.
          </p>
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="3d-view">3D Visualization</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-6 h-6" />
                    <span>Upload & Analyze</span>
                  </CardTitle>
                  <CardDescription>
                    Upload high-quality images for advanced AI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Images</h3>
                    <p className="text-gray-600 mb-4">
                      Support for multiple angles and lighting conditions
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Choose Files
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
                        <span className="text-sm font-medium">AI Processing...</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-gray-600 text-center">
                        Using {aiModels.find(m => m.id === selectedModel)?.name}
                      </p>
                    </div>
                  )}

                  <Button 
                    onClick={handleAdvancedAnalysis}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Start Advanced Analysis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-6 h-6" />
                    <span>Analysis Results</span>
                  </CardTitle>
                  <CardDescription>
                    Comprehensive AI-powered skin assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">94.5%</div>
                      <div className="text-sm text-gray-600">Confidence</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">Low</div>
                      <div className="text-sm text-gray-600">Risk Level</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Detected Conditions:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Mild Acne</span>
                        <Badge variant="secondary">87% confidence</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Dry Skin</span>
                        <Badge variant="secondary">72% confidence</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Models Tab */}
          <TabsContent value="models">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiModels.map((model) => (
                <Card key={model.id} className={`cursor-pointer transition-all ${
                  selectedModel === model.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
                }`} onClick={() => setSelectedModel(model.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      {selectedModel === model.id && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span className="font-medium">{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Processing Speed</span>
                      <Badge variant="outline">{model.speed}</Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {model.specialization.map((spec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 3D Visualization Tab */}
          <TabsContent value="3d-view">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3D</span>
                  </div>
                  <span>Interactive 3D Skin Model</span>
                </CardTitle>
                <CardDescription>
                  Explore detected conditions on an interactive 3D model with detailed annotations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg">
                  <SkinModel 
                    conditions={sampleConditions}
                    onConditionClick={(condition) => {
                      toast.info(`Viewing: ${condition.name} - ${condition.description}`);
                    }}
                  />
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sampleConditions.map((condition) => (
                    <Card key={condition.id} className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          condition.severity === 'high' ? 'bg-red-500' :
                          condition.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <h4 className="font-medium text-sm">{condition.name}</h4>
                      </div>
                      <p className="text-xs text-gray-600">{condition.description}</p>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-6 h-6" />
                    <span>Analysis Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Customize your AI analysis preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Analysis Sensitivity: {analysisSettings.sensitivity}%</Label>
                    <Slider
                      value={[analysisSettings.sensitivity]}
                      onValueChange={(value) => setAnalysisSettings({
                        ...analysisSettings,
                        sensitivity: value[0]
                      })}
                      max={100}
                      min={50}
                      step={5}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-600">
                      Higher sensitivity detects more subtle conditions
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Include Recommendations</Label>
                        <p className="text-sm text-gray-600">Get treatment suggestions</p>
                      </div>
                      <Switch 
                        checked={analysisSettings.includeRecommendations}
                        onCheckedChange={(checked) => setAnalysisSettings({
                          ...analysisSettings,
                          includeRecommendations: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Detailed Report</Label>
                        <p className="text-sm text-gray-600">Generate comprehensive analysis</p>
                      </div>
                      <Switch 
                        checked={analysisSettings.detailedReport}
                        onCheckedChange={(checked) => setAnalysisSettings({
                          ...analysisSettings,
                          detailedReport: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Database Comparison</Label>
                        <p className="text-sm text-gray-600">Compare with similar cases</p>
                      </div>
                      <Switch 
                        checked={analysisSettings.compareWithDatabase}
                        onCheckedChange={(checked) => setAnalysisSettings({
                          ...analysisSettings,
                          compareWithDatabase: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Anonymous Mode</Label>
                        <p className="text-sm text-gray-600">Don't store personal data</p>
                      </div>
                      <Switch 
                        checked={analysisSettings.anonymousMode}
                        onCheckedChange={(checked) => setAnalysisSettings({
                          ...analysisSettings,
                          anonymousMode: checked
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="w-6 h-6" />
                    <span>AI Performance</span>
                  </CardTitle>
                  <CardDescription>
                    Real-time AI model performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">99.2%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1.2s</div>
                      <div className="text-sm text-gray-600">Avg Response</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">GPU Utilization</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">2.1 GB</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">AI Insights</span>
                    </div>
                    <p className="text-xs text-blue-800">
                      Model confidence is highest for frontal face images with good lighting. 
                      Consider multiple angles for better analysis.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Models Tab */}
          <TabsContent value="models">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available AI Models</CardTitle>
                  <CardDescription>
                    Choose the best AI model for your specific needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aiModels.map((model) => (
                      <Card key={model.id} className={`cursor-pointer transition-all ${
                        selectedModel === model.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
                      }`} onClick={() => setSelectedModel(model.id)}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{model.name}</CardTitle>
                            {selectedModel === model.id && (
                              <Badge variant="default">Active</Badge>
                            )}
                          </div>
                          <CardDescription>{model.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Accuracy</span>
                              <span className="font-medium">{model.accuracy}%</span>
                            </div>
                            <Progress value={model.accuracy} className="h-2" />
                          </div>

                          <div className="flex justify-between text-sm">
                            <span>Speed</span>
                            <Badge variant="outline">{model.speed}</Badge>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-2">Specializations:</p>
                            <div className="flex flex-wrap gap-1">
                              {model.specialization.map((spec, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 3D Visualization Tab */}
          <TabsContent value="3d-view">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Microscope className="w-6 h-6" />
                  <span>3D Skin Analysis Visualization</span>
                </CardTitle>
                <CardDescription>
                  Interactive 3D model showing detected conditions and analysis results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg mb-6">
                  <SkinModel 
                    conditions={sampleConditions}
                    onConditionClick={(condition) => {
                      toast.info(`Analyzing: ${condition.name}`);
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-red-50 border-red-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <h4 className="font-medium text-sm">High Priority</h4>
                    </div>
                    <p className="text-xs text-gray-600">Conditions requiring immediate attention</p>
                  </Card>

                  <Card className="p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <h4 className="font-medium text-sm">Medium Priority</h4>
                    </div>
                    <p className="text-xs text-gray-600">Conditions to monitor and treat</p>
                  </Card>

                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h4 className="font-medium text-sm">Low Priority</h4>
                    </div>
                    <p className="text-xs text-gray-600">Minor concerns with simple care</p>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Preferences</CardTitle>
                  <CardDescription>
                    Customize how AI analyzes your skin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Analysis Sensitivity: {analysisSettings.sensitivity}%</Label>
                    <Slider
                      value={[analysisSettings.sensitivity]}
                      onValueChange={(value) => setAnalysisSettings({
                        ...analysisSettings,
                        sensitivity: value[0]
                      })}
                      max={100}
                      min={50}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Include Recommendations</Label>
                        <p className="text-sm text-gray-600">Get AI-powered treatment suggestions</p>
                      </div>
                      <Switch 
                        checked={analysisSettings.includeRecommendations}
                        onCheckedChange={(checked) => setAnalysisSettings({
                          ...analysisSettings,
                          includeRecommendations: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Detailed Report</Label>
                        <p className="text-sm text-gray-600">Generate comprehensive analysis report</p>
                      </div>
                      <Switch 
                        checked={analysisSettings.detailedReport}
                        onCheckedChange={(checked) => setAnalysisSettings({
                          ...analysisSettings,
                          detailedReport: checked
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Data</CardTitle>
                  <CardDescription>
                    Control how your data is used for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Anonymous Mode</Label>
                        <p className="text-sm text-gray-600">Don't store personal identifiers</p>
                      </div>
                      <Switch 
                        checked={analysisSettings.anonymousMode}
                        onCheckedChange={(checked) => setAnalysisSettings({
                          ...analysisSettings,
                          anonymousMode: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Database Comparison</Label>
                        <p className="text-sm text-gray-600">Compare with anonymized cases</p>
                      </div>
                      <Switch 
                        checked={analysisSettings.compareWithDatabase}
                        onCheckedChange={(checked) => setAnalysisSettings({
                          ...analysisSettings,
                          compareWithDatabase: checked
                        })}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Data Protection</span>
                    </div>
                    <p className="text-xs text-blue-800">
                      All analysis is performed with end-to-end encryption. Your images are processed 
                      securely and deleted after analysis unless you choose to save them.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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