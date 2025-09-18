'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/layout/enhanced-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { DoctorCardSkeleton } from '@/components/ui/skeleton-loader';
import { FadeIn, SlideIn } from '@/components/layout/page-transition';
import { useLoading } from '@/hooks/use-loading';
import { useDebounce, PerformanceOptimizer } from '@/lib/optimizations';
import { doctorService, Doctor } from '@/lib/doctors';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Video, 
  MessageCircle,
  Users,
  Award,
  Languages,
  IndianRupee,
  Calendar,
  CheckCircle
} from 'lucide-react';

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { isLoading: loading, withLoading } = useLoading(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [filters, setFilters] = useState({
    specialization: 'all',
    language: 'all',
    minRating: 0,
    maxFee: 2000,
    availability: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    searchDoctors();
  }, [filters, debouncedSearchTerm]);

  const searchDoctors = async () => {
    const cacheKey = `doctors_${JSON.stringify(filters)}_${debouncedSearchTerm}`;
    const cached = PerformanceOptimizer.getCache(cacheKey);
    
    if (cached) {
      setDoctors(cached);
      return;
    }

    await withLoading(async () => {
      const results = await doctorService.searchDoctors({
        search: debouncedSearchTerm,
        specialization: filters.specialization,
        language: filters.language,
        minRating: filters.minRating,
        maxFee: filters.maxFee,
        availability: filters.availability
      });
      setDoctors(results);
      PerformanceOptimizer.setCache(cacheKey, results, 2); // Cache for 2 minutes
    });
  };

  const handleDoctorClick = (doctorId: string) => {
    router.push(`/doctor/${doctorId}`);
  };

  const specializations = [
    { value: 'all', label: 'All Specializations' },
    { value: 'general', label: 'General Dermatology' },
    { value: 'pediatric', label: 'Pediatric Dermatology' },
    { value: 'cosmetic', label: 'Cosmetic Dermatology' },
    { value: 'surgery', label: 'Dermatologic Surgery' },
    { value: 'pathology', label: 'Dermatopathology' }
  ];

  const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'punjabi', label: 'Punjabi' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Dermatologists</h1>
          <p className="text-gray-600">Connect with certified skin specialists for expert consultation</p>
          </div>
        </FadeIn>

        {/* Search and Filters */}
        <SlideIn direction="up">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by doctor name, specialization, or qualification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Specialization</label>
                <Select value={filters.specialization} onValueChange={(value) => setFilters({...filters, specialization: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map(spec => (
                      <SelectItem key={spec.value} value={spec.value}>{spec.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
                <Select value={filters.language} onValueChange={(value) => setFilters({...filters, language: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Max Fee: ₹{filters.maxFee}
                </label>
                <Slider
                  value={[filters.maxFee]}
                  onValueChange={(value) => setFilters({...filters, maxFee: value[0]})}
                  max={2000}
                  min={200}
                  step={100}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Availability</label>
                <Select value={filters.availability} onValueChange={(value) => setFilters({...filters, availability: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    <SelectItem value="online">Available Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          </div>
        </SlideIn>

        {/* Results */}
        <FadeIn delay={0.2}>
          <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {loading ? 'Searching...' : `${doctors.length} doctors found`}
          </p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="experience">Sort by Experience</SelectItem>
              <SelectItem value="fee-low">Fee: Low to High</SelectItem>
              <SelectItem value="fee-high">Fee: High to Low</SelectItem>
            </SelectContent>
          </Select>
          </div>
        </FadeIn>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))
          ) : doctors.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-all cursor-pointer" onClick={() => handleDoctorClick(doctor.id)}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {doctor.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                          <p className="text-sm text-blue-600 mb-2">{doctor.specialization}</p>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500">({doctor.totalConsultations})</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{doctor.experience} years exp</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Languages className="w-4 h-4" />
                          <span>{doctor.languages.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {doctor.qualifications.slice(0, 3).map((qual, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {qual}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 text-green-600">
                            <IndianRupee className="w-4 h-4" />
                            <span className="font-medium">₹{doctor.consultationFee}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{doctor.nextAvailable}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm">
                            <Video className="w-4 h-4 mr-1" />
                            Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {!loading && doctors.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Doctors
            </Button>
          </div>
        )}
      </div>

      <EnhancedFooter />
    </div>
  );
}