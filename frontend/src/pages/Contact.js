import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  Loader2
} from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours."
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@bindaasservices.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 9876543210',
      description: 'Mon-Fri 9AM-6PM IST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Business District, Technology Hub\nMumbai, Maharashtra 400001',
      description: 'Our office location'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9:00 AM - 6:00 PM\nSat-Sun: 10:00 AM - 4:00 PM',
      description: 'IST (Indian Standard Time)'
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'General Inquiries',
      description: 'Questions about products, pricing, or services'
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description: 'Help with installation, setup, or troubleshooting'
    },
    {
      icon: Mail,
      title: 'Sales Support',
      description: 'Custom quotes and enterprise solutions'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help with all your Microsoft product and VPS hosting needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-2xl">Send us a Message</CardTitle>
                <CardDescription className="text-yellow-100/60">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-yellow-400">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-yellow-400">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-yellow-400">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-yellow-400">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-yellow-400">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="bg-gradient-to-br from-yellow-500/5 to-gray-800 border-yellow-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                            {info.title}
                          </h3>
                          <p className="text-yellow-100 mb-2 whitespace-pre-line">
                            {info.details}
                          </p>
                          <p className="text-yellow-100/60 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Support Options */}
            <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400">How Can We Help?</CardTitle>
                <CardDescription className="text-yellow-100/60">
                  Choose the type of support you need
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-black/30 rounded-lg">
                      <IconComponent className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-yellow-400 font-medium mb-1">
                          {option.title}
                        </h4>
                        <p className="text-yellow-100/70 text-sm">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Response Info */}
            <Card className="bg-gradient-to-r from-green-500/10 to-yellow-500/10 border-green-500/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Quick Response Guarantee
                </h3>
                <p className="text-yellow-100/70 text-sm">
                  We typically respond to all inquiries within 24 hours. 
                  For urgent matters, call us directly for immediate assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;