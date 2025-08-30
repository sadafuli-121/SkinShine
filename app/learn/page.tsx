import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User,
  Heart,
  Shield,
  Sun,
  Droplets,
  AlertTriangle,
  Star
} from 'lucide-react';

export default function LearnPage() {
  const categories = [
    {
      title: 'Skin Conditions',
      description: 'Learn about common skin problems and their treatments',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      articles: 12
    },
    {
      title: 'Daily Skincare',
      description: 'Essential routines for healthy, glowing skin',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600',
      articles: 8
    },
    {
      title: 'Sun Protection',
      description: 'Protect your skin from harmful UV rays',
      icon: Sun,
      color: 'bg-yellow-100 text-yellow-600',
      articles: 6
    },
    {
      title: 'Hydration & Moisturizing',
      description: 'Keep your skin healthy and hydrated',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-600',
      articles: 10
    }
  ];

  const featuredArticles = [
    {
      title: 'Understanding Acne: Causes and Treatments',
      description: 'A comprehensive guide to managing acne for Indian skin types',
      readTime: '5 min read',
      category: 'Skin Conditions',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'The Perfect Skincare Routine for Monsoon',
      description: 'How to adapt your skincare routine during the rainy season',
      readTime: '7 min read',
      category: 'Daily Skincare',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Sunscreen Guide for Indian Climate',
      description: 'Choosing the right SPF and application techniques',
      readTime: '4 min read',
      category: 'Sun Protection',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Learn About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skin Care
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert-backed articles, tips, and guides to help you understand and care for your skin. 
              Written by certified dermatologists for Indian skin types and climate.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search for skin conditions, treatments, or tips..."
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">Explore our comprehensive library of skin care knowledge</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary">{category.articles} articles</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Articles</h2>
              <p className="text-gray-600">Most popular and helpful content from our experts</p>
            </div>
            <Button variant="outline">View All Articles</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{article.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Read Article</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">Need Personalized Advice?</h2>
          <p className="text-xl text-blue-100">
            While our articles provide general guidance, every skin is unique. 
            Get personalized recommendations from certified dermatologists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/ai-analysis">Try AI Analysis</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/find-doctors">Consult a Doctor</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}