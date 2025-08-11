import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  HeadphonesIcon, 
  Star, 
  CheckCircle,
  FileText,
  Monitor,
  Server,
  Cloud
} from 'lucide-react';
import { mockProducts, mockTestimonials } from '../data/mock';

const Home = () => {
  const featuredProducts = mockProducts.slice(0, 8);
  const categories = [
    {
      id: 'office-suite',
      name: 'Office Suite',
      description: 'Microsoft Office applications and subscriptions',
      icon: FileText,
      count: mockProducts.filter(p => p.category === 'Office Suite').length,
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      id: 'operating-system',
      name: 'Operating System',
      description: 'Windows OS licenses for home and business',
      icon: Monitor,
      count: mockProducts.filter(p => p.category === 'Operating System').length,
      gradient: 'from-yellow-500/20 to-blue-500/20'
    },
    {
      id: 'server-license',
      name: 'Server License',
      description: 'Windows Server and enterprise solutions',
      icon: Server,
      count: mockProducts.filter(p => p.category === 'Server License').length,
      gradient: 'from-yellow-500/20 to-green-500/20'
    },
    {
      id: 'vps-hosting',
      name: 'VPS Hosting',
      description: 'Virtual Private Server hosting solutions',
      icon: Cloud,
      count: mockProducts.filter(p => p.category === 'VPS Hosting').length,
      gradient: 'from-yellow-500/20 to-purple-500/20'
    }
  ];

  return (
    <div className="bg-black text-yellow-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-yellow-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 mb-6">
              ✨ Trusted by 10,000+ Customers
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Genuine Microsoft Products
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">& Premium VPS Hosting</span>
            </h1>
            <p className="text-xl sm:text-2xl text-yellow-100/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get authentic Microsoft licenses and reliable hosting solutions at unbeatable prices. 
              Your trusted partner for all software and hosting needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 px-8 py-4 text-lg"
              asChild
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 bg-yellow-500/5 rounded-xl border border-yellow-500/20">
              <Shield className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">100% Genuine</h3>
              <p className="text-yellow-100/70">Authentic Microsoft licenses with official support</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-yellow-500/5 rounded-xl border border-yellow-500/20">
              <Zap className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Instant Delivery</h3>
              <p className="text-yellow-100/70">Get your licenses immediately after payment</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-yellow-500/5 rounded-xl border border-yellow-500/20">
              <HeadphonesIcon className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">24/7 Support</h3>
              <p className="text-yellow-100/70">Expert assistance whenever you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
              Our Product Categories
            </h2>
            <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
              Choose from our wide range of genuine Microsoft products and hosting solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-yellow-400" />
                    </div>
                    <CardTitle className="text-yellow-400 group-hover:text-yellow-300 transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-yellow-100/60">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                      {category.count} Products
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
              Discover our most popular Microsoft products and VPS hosting plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="bg-gradient-to-br from-yellow-500/5 to-gray-800 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 group">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-gray-700 rounded-t-lg flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-yellow-400 text-lg mb-2 group-hover:text-yellow-300 transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-yellow-100/60 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-yellow-400">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-yellow-100/50 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {product.isMonthly && (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 text-xs">
                        /month
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-yellow-100/70">{product.rating}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                      asChild
                    >
                      <Link to={`/product/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
              asChild
            >
              <Link to="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their software and hosting needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-yellow-100/80 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-yellow-400 font-semibold">{testimonial.name}</p>
                      <p className="text-yellow-100/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-yellow-100/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and get your genuine Microsoft products and VPS hosting today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4"
              asChild
            >
              <Link to="/products">
                Browse Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 px-8 py-4"
              asChild
            >
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;