import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { 
  CreditCard, 
  Smartphone, 
  Lock, 
  CheckCircle,
  ArrowLeft,
  Loader2
} from 'lucide-react';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [formData, setFormData] = useState({
    email: user.email || '',
    firstName: user.name ? user.name.split(' ')[0] : '',
    lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and show success message
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive your licenses via email shortly."
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    }

    setIsProcessing(false);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
            onClick={() => navigate('/cart')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">Checkout</h1>
          <p className="text-yellow-100/70">Complete your order securely</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="bg-gradient-to-br from-yellow-500/5 to-gray-800 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-yellow-400">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-yellow-400">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-yellow-400">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-yellow-400">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="bg-gradient-to-br from-yellow-500/5 to-gray-800 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-yellow-400">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-yellow-400">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-yellow-400">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-yellow-400">PIN Code</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-gradient-to-br from-yellow-500/5 to-gray-800 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'stripe' 
                          ? 'border-yellow-500 bg-yellow-500/10' 
                          : 'border-yellow-500/30 bg-black/20'
                      }`}
                      onClick={() => setPaymentMethod('stripe')}
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-6 w-6 text-yellow-400" />
                        <div>
                          <div className="font-semibold text-yellow-400">Credit/Debit Card</div>
                          <div className="text-sm text-yellow-100/60">Powered by Stripe</div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'upi' 
                          ? 'border-yellow-500 bg-yellow-500/10' 
                          : 'border-yellow-500/30 bg-black/20'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-6 w-6 text-yellow-400" />
                        <div>
                          <div className="font-semibold text-yellow-400">UPI</div>
                          <div className="text-sm text-yellow-100/60">Google Pay, PhonePe, etc.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form Fields */}
                  {paymentMethod === 'stripe' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-yellow-400">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate" className="text-yellow-400">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                            className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-yellow-400">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div>
                      <Label htmlFor="upiId" className="text-yellow-400">UPI ID</Label>
                      <Input
                        id="upiId"
                        name="upiId"
                        placeholder="your-upi-id@paytm"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Order Summary</CardTitle>
                  <CardDescription className="text-yellow-100/60">
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <h4 className="text-yellow-400 text-sm font-medium">{item.name}</h4>
                          <p className="text-yellow-100/60 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-400 font-semibold">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-yellow-500/20" />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-yellow-100/80">
                      <span>Subtotal</span>
                      <span>₹{getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-yellow-100/80">
                      <span>Tax</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between text-yellow-100/80">
                      <span>Processing Fee</span>
                      <span>₹0</span>
                    </div>
                    <Separator className="bg-yellow-500/20" />
                    <div className="flex justify-between text-xl font-bold text-yellow-400">
                      <span>Total</span>
                      <span>₹{getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Place Order - ₹{getCartTotal().toLocaleString()}
                      </>
                    )}
                  </Button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-yellow-100/60 pt-4">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>SSL Encrypted & Secure Payment</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;