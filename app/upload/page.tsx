'use client';

import { useState, useRef, useCallback } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  X, 
  Check,
  AlertTriangle,
  Crop,
  RotateCw,
  Download,
  Share2,
  Eye,
  FileText,
  Shield,
  Zap
} from 'lucide-react';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  analysis?: {
    condition: string;
    confidence: number;
    recommendations: string[];
  };
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const MAX_FILES = 5;

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Please upload only JPEG, PNG, or WebP images';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    
    Array.from(selectedFiles).forEach((file) => {
      if (files.length + newFiles.length >= MAX_FILES) {
        toast.error(`Maximum ${MAX_FILES} files allowed`);
        return;
      }

      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return;
      }

      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        status: 'uploading',
        progress: 0
      };

      newFiles.push(uploadedFile);
    });

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      
      // Simulate upload progress
      newFiles.forEach((uploadedFile) => {
        simulateUpload(uploadedFile.id);
      });
    }
  }, [files.length]);

  const simulateUpload = async (fileId: string) => {
    const updateProgress = (progress: number) => {
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    };

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      updateProgress(i);
    }

    // Mark as completed
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { 
        ...f, 
        status: 'completed',
        analysis: {
          condition: 'Mild Acne',
          confidence: Math.floor(Math.random() * 20) + 80,
          recommendations: [
            'Use gentle cleanser twice daily',
            'Apply salicylic acid treatment',
            'Avoid touching affected areas'
          ]
        }
      } : f
    ));

    toast.success('Image uploaded and analyzed successfully!');
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const analyzeAllImages = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    toast.success('All images analyzed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload & Analyze Your Skin Images
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload high-quality images of your skin concerns for AI-powered analysis and expert recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Drop Zone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-6 h-6" />
                  <span>Upload Images</span>
                </CardTitle>
                <CardDescription>
                  Upload up to {MAX_FILES} images (JPEG, PNG, WebP) up to 10MB each
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  ref={dropZoneRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-50 scale-105' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ALLOWED_TYPES.join(',')}
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Drop your images here
                      </h3>
                      <p className="text-gray-600 mb-4">
                        or click to browse from your device
                      </p>
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Supported: JPEG, PNG, WebP • Max size: 10MB • Max files: {MAX_FILES}
                    </div>
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">
                        Uploaded Images ({files.length}/{MAX_FILES})
                      </h4>
                      {files.every(f => f.status === 'completed') && (
                        <Button
                          onClick={analyzeAllImages}
                          disabled={isAnalyzing}
                          size="sm"
                          className="bg-gradient-to-r from-green-600 to-green-700"
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Analyze All
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {files.map((file) => (
                        <Card key={file.id} className="overflow-hidden">
                          <div className="relative">
                            <img
                              src={file.preview}
                              alt="Uploaded skin image"
                              className="w-full h-48 object-cover"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeFile(file.id)}
                              className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            
                            {file.status === 'completed' && (
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-green-600">
                                  <Check className="w-3 h-3 mr-1" />
                                  Analyzed
                                </Badge>
                              </div>
                            )}
                          </div>
                          
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900">
                                  {file.file.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {(file.file.size / 1024 / 1024).toFixed(1)} MB
                                </span>
                              </div>

                              {file.status === 'uploading' && (
                                <div className="space-y-2">
                                  <Progress value={file.progress} className="h-2" />
                                  <p className="text-xs text-gray-600">Uploading... {file.progress}%</p>
                                </div>
                              )}

                              {file.status === 'completed' && file.analysis && (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Detected:</span>
                                    <Badge variant="outline">{file.analysis.condition}</Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Confidence:</span>
                                    <span className="text-sm text-green-600">{file.analysis.confidence}%</span>
                                  </div>
                                </div>
                              )}

                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Eye className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Provide any additional details about your skin concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Describe your symptoms or concerns</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please describe your skin condition, when it started, any triggers you've noticed, previous treatments tried, etc."
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Photo Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Use good lighting (natural light preferred)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Take photos from multiple angles</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Keep the affected area in focus</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Avoid filters or editing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Include reference objects for scale</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">DPDP Act compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Images deleted after analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">No data shared with third parties</span>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    This tool provides preliminary analysis only. Always consult with a qualified dermatologist for proper diagnosis and treatment.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  View Analysis Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Doctor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EnhancedFooter />
    </div>
  );
}