import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Crown, 
  Shield, 
  Award, 
  Users, 
  Clock, 
  Star,
  CheckCircle,
  ArrowRight,
  Target,
  Heart,
  Zap
} from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Award, label: 'Years of Experience', value: '5+' },
    { icon: Shield, label: 'Genuine Products', value: '100%' },
    { icon: Clock, label: 'Support Availability', value: '24/7' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Authenticity',
      description: 'We only deal in 100% genuine Microsoft products with official licenses and full support.'
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Instant delivery of digital licenses and quick setup of VPS hosting services.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. Your success is our success.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from products to support.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Gupta',
      role: 'Founder & CEO',
      description: 'Microsoft certified expert with 10+ years in enterprise software solutions.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Priya Sharma',
      role: 'Technical Director',
      description: 'VPS hosting specialist ensuring 99.9% uptime and optimal performance.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b056c987?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Amit Kumar',
      role: 'Customer Success Manager',
      description: 'Dedicated to ensuring every customer has an exceptional experience.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-yellow-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-yellow-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <Crown className="h-16 w-16 text-yellow-500" />
              <div className="flex flex-col text-left">
                <span className="text-4xl font-bold text-yellow-500">
                  Bindaas
                </span>
                <span className="text-lg text-yellow-600 -mt-2">Genuine Services</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Your Trusted Technology Partner
          </h1>
          
          <p className="text-xl sm:text-2xl text-yellow-100/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Since 2020, we've been helping businesses and individuals access genuine Microsoft products 
            and reliable VPS hosting solutions at competitive prices.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-yellow-100/70">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-yellow-100/80 leading-relaxed">
                Bindaas Genuine Services was founded with a simple mission: to make authentic Microsoft 
                products and reliable hosting services accessible to everyone. We noticed that many 
                businesses and individuals struggled to find genuine software licenses at fair prices.
              </p>
              <p className="text-lg text-yellow-100/80 leading-relaxed">
                Starting as a small team of Microsoft-certified professionals, we've grown into a 
                trusted provider serving thousands of customers across India. Our commitment to 
                authenticity, competitive pricing, and exceptional customer service has made us 
                a preferred choice for businesses of all sizes.
              </p>
              <p className="text-lg text-yellow-100/80 leading-relaxed">
                Today, we continue to expand our offerings while maintaining the same core values 
                that started our journey: trust, quality, and customer satisfaction.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-yellow-500/20 to-gray-700 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Crown className="h-24 w-24 text-yellow-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Since 2020</h3>
                  <p className="text-yellow-100/70">
                    Serving customers with genuine products and exceptional service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-yellow-400" />
                    </div>
                    <CardTitle className="text-yellow-400">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-yellow-100/70">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
              The experts behind Bindaas Genuine Services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30 text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-yellow-400">{member.name}</CardTitle>
                  <CardDescription className="text-yellow-500">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-100/70">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
              Why Choose Bindaas Genuine Services?
            </h2>
            <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
              Here's what sets us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">100% Authentic Products</h3>
                  <p className="text-yellow-100/70">All our Microsoft products come with genuine licenses and official support.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Competitive Pricing</h3>
                  <p className="text-yellow-100/70">Get the best value for your money with our competitive rates and special offers.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Instant Delivery</h3>
                  <p className="text-yellow-100/70">Digital products are delivered instantly after payment confirmation.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Expert Support</h3>
                  <p className="text-yellow-100/70">Our Microsoft-certified team provides expert guidance and 24/7 support.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Reliable VPS Hosting</h3>
                  <p className="text-yellow-100/70">99.9% uptime guarantee with enterprise-grade infrastructure and security.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Secure Transactions</h3>
                  <p className="text-yellow-100/70">SSL-encrypted payments through trusted providers like Stripe and UPI.</p>
                </div>
              </div>
            </div>
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
            Join thousands of satisfied customers and experience the Bindaas difference today.
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
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;