import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Crown, Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Welcome back! You've been logged in successfully."
      });
      navigate('/');
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <Crown className="h-12 w-12 text-yellow-500" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-yellow-500">
                  Bindaas
                </span>
                <span className="text-sm text-yellow-600 -mt-1">Genuine Services</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-yellow-400">
            Welcome Back
          </h2>
          <p className="mt-2 text-yellow-100/70">
            Sign in to your account to continue shopping
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-center text-yellow-400">Sign In</CardTitle>
            <CardDescription className="text-center text-yellow-100/60">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-yellow-400">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-black/50 border-yellow-500/30 text-yellow-100 placeholder-yellow-400/60 focus:border-yellow-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-yellow-400">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 bg-black/50 border-yellow-500/30 text-yellow-100 placeholder-yellow-400/60 focus:border-yellow-400"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-yellow-100/70">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-yellow-400 hover:text-yellow-300 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-gray-900/50 rounded-lg p-4 text-center">
          <p className="text-yellow-100/70 text-sm">
            <strong className="text-yellow-400">Demo:</strong> Use any email and password to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;