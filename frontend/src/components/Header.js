import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  Menu, 
  X,
  Crown
} from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <header className="bg-black border-b border-yellow-600/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Crown className="h-8 w-8 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-yellow-500 group-hover:text-yellow-400 transition-colors">
                Bindaas
              </span>
              <span className="text-xs text-yellow-600 -mt-1">Genuine Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-yellow-100 hover:text-yellow-400 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-yellow-100 hover:text-yellow-400 transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="text-yellow-100 hover:text-yellow-400 transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-yellow-100 hover:text-yellow-400 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cart')}
              className="relative text-yellow-100 hover:text-yellow-400 hover:bg-yellow-500/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user.isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-100 text-sm">
                  Hello, {user.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-yellow-100 hover:text-yellow-400 hover:bg-yellow-500/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-yellow-100 hover:text-yellow-400 hover:bg-yellow-500/10"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-yellow-100 hover:text-yellow-400 hover:bg-yellow-500/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-yellow-600/20 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-yellow-100 hover:text-yellow-400 transition-colors font-medium px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-yellow-100 hover:text-yellow-400 transition-colors font-medium px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-yellow-100 hover:text-yellow-400 transition-colors font-medium px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-yellow-100 hover:text-yellow-400 transition-colors font-medium px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="flex items-center justify-between px-2 pt-4 border-t border-yellow-600/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {navigate('/cart'); setIsMobileMenuOpen(false);}}
                  className="relative text-yellow-100 hover:text-yellow-400 hover:bg-yellow-500/10"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {cartItemsCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="ml-2 bg-yellow-500 text-black hover:bg-yellow-400"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>

                {user.isLoggedIn ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-100 text-sm">
                      {user.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-yellow-100 hover:text-yellow-400 hover:bg-yellow-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {navigate('/login'); setIsMobileMenuOpen(false);}}
                      className="text-yellow-100 hover:text-yellow-400 hover:bg-yellow-500/10"
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {navigate('/register'); setIsMobileMenuOpen(false);}}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;