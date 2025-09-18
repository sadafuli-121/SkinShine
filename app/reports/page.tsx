'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  FileText, 
  Download, 
  Share2, 
  Calendar as CalendarIcon,
  Filter,
  Search,
  Eye,
  Printer,
  Mail,
  Star,
  TrendingUp,
  Activity,
  Heart,
  Brain,
  Stethoscope
} from 'lucide-react';

interface MedicalReport {
  id: string;
  type: 'consultation' | 'analysis' | 'prescription' | 'lab';
  title: string;
  doctorName?: string;
  date: Date;
  status: 'completed' | 'pending' | 'draft';
  summary: string;
  tags: string[];
  downloadUrl?: string;
}

export default function ReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<MedicalReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load sample reports
    const sampleReports: MedicalReport[] = [
      {
        id: '1',
        type: 'analysis',
        title: 'AI Skin Analysis Report',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'completed',
        summary: 'Comprehensive AI analysis detected mild acne with 87% confidence. Recommended treatment plan included.',
        tags: ['Acne', 'AI Analysis', 'Facial Skin'],
        downloadUrl: '#'
      },
      {
        id: '2',
        type: 'consultation',
        title: 'Dermatology Consultation Report',
        doctorName: 'Dr. Priya Sharma',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'completed',
        summary: 'Video consultation for acne treatment. Prescribed topical retinoid and advised lifestyle changes.',
        tags: ['Consultation', 'Acne Treatment', 'Prescription'],
        downloadUrl: '#'
      },
      {
        id: '3',
        type: 'prescription',
        title: 'Digital Prescription',
        doctorName: 'Dr. Rajesh Kumar',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: 'completed',
        summary: 'Prescribed medications for eczema treatment with detailed usage instructions.',
        tags: ['Prescription', 'Eczema', 'Medication'],
        downloadUrl: '#'
      },
      {
        id: '4',
        type: 'lab',
        title: 'Skin Patch Test Results',
        doctorName: 'Dr. Anjali Patel',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        status: 'completed',
        summary: 'Allergy patch test results showing sensitivity to certain cosmetic ingredients.',
        tags: ['Lab Test', 'Allergy', 'Patch Test'],
        downloadUrl: '#'
      }
    ];

    setReports(sampleReports);
    setFilteredReports(sampleReports);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = reports;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(report => report.type === filterType);
    }

    // Filter by date range
    if (dateRange.from) {
      filtered = filtered.filter(report => report.date >= dateRange.from!);
    }
    if (dateRange.to) {
      filtered = filtered.filter(report => report.date <= dateRange.to!);
    }

    setFilteredReports(filtered);
  }, [reports, searchTerm, filterType, dateRange]);

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'analysis':
        return <Brain className="w-5 h-5 text-purple-600" />;
      case 'prescription':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'lab':
        return <Activity className="w-5 h-5 text-orange-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (report: MedicalReport) => {
    toast.success(`Downloading ${report.title}...`);
    // In real app, this would trigger actual download
  };

  const handleShare = (report: MedicalReport) => {
    toast.success('Share link copied to clipboard');
    // In real app, this would generate shareable link
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Reports</h1>
          <p className="text-gray-600">
            Access all your medical reports, prescriptions, and analysis results in one place
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="consultation">Consultations</SelectItem>
                  <SelectItem value="analysis">AI Analysis</SelectItem>
                  <SelectItem value="prescription">Prescriptions</SelectItem>
                  <SelectItem value="lab">Lab Results</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, 'MMM dd') : 'From date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange({...dateRange, from: date})}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, 'MMM dd') : 'To date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange({...dateRange, to: date})}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getReportIcon(report.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      {report.doctorName && (
                        <CardDescription>{report.doctorName}</CardDescription>
                      )}
                    </div>
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">{report.summary}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {report.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{format(report.date, 'MMM dd, yyyy')}</span>
                  <span className="capitalize">{report.type} report</span>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleDownload(report)}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleShare(report)}>
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && !loading && (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">
              {searchTerm || filterType !== 'all' || dateRange.from || dateRange.to
                ? 'Try adjusting your search criteria'
                : 'Your medical reports will appear here after consultations and analyses'
              }
            </p>
          </Card>
        )}
      </div>

      <EnhancedFooter />
    </div>
  );
}