import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-yellow-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-yellow-500" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-yellow-500">
                  Bindaas
                </span>
                <span className="text-xs text-yellow-600 -mt-1">Genuine Services</span>
              </div>
            </div>
            <p className="text-yellow-100/80 text-sm leading-relaxed">
              Your trusted partner for genuine Microsoft products and reliable VPS hosting solutions. 
              We provide authentic licenses and premium hosting services at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-yellow-600 hover:text-yellow-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-yellow-600 hover:text-yellow-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-yellow-600 hover:text-yellow-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-yellow-600 hover:text-yellow-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                All Products
              </Link>
              <Link to="/about" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                Contact Us
              </Link>
              <Link to="/privacy" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Our Products</h3>
            <div className="space-y-2">
              <Link to="/products?category=office-suite" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                Microsoft Office Suite
              </Link>
              <Link to="/products?category=operating-system" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                Windows Operating Systems
              </Link>
              <Link to="/products?category=server-license" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                Server Licenses
              </Link>
              <Link to="/products?category=vps-hosting" className="block text-yellow-100/80 hover:text-yellow-400 transition-colors text-sm">
                VPS Hosting
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-100/80 text-sm">support@bindaasservices.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-100/80 text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-yellow-600 mt-0.5" />
                <span className="text-yellow-100/80 text-sm">
                  Business District, Technology Hub<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-yellow-600/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-yellow-100/60 text-sm">
              © 2025 Bindaas Genuine Services. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-yellow-100/60 text-sm">
                Secure payments powered by
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 font-semibold text-sm">Stripe</span>
                <span className="text-yellow-100/60">•</span>
                <span className="text-yellow-500 font-semibold text-sm">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;