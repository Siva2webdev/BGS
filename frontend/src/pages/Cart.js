import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  ShoppingCart
} from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast({
      title: "Item Removed",
      description: `${productName} removed from cart`
    });
  };

  const handleCheckout = () => {
    if (!user.isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to proceed to checkout",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-gradient-to-br from-yellow-500/10 to-gray-900 rounded-lg p-12 border border-yellow-500/20">
            <ShoppingBag className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Your Cart is Empty</h2>
            <p className="text-yellow-100/70 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button 
              asChild 
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
            >
              <Link to="/products">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">Shopping Cart</h1>
          <p className="text-yellow-100/70">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="bg-gradient-to-br from-yellow-500/5 to-gray-800 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs mb-2">
                            {item.category}
                          </Badge>
                          <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-yellow-100/60 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 self-start"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-100/70 text-sm">Qty:</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 w-8 h-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-yellow-100 px-3 py-1 bg-yellow-500/10 rounded min-w-[2.5rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 w-8 h-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xl font-bold text-yellow-400">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-sm text-yellow-100/60">
                            ₹{item.price.toLocaleString()} each
                            {item.isMonthly && <span className="ml-1">/month</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  clearCart();
                  toast({
                    title: "Cart Cleared",
                    description: "All items removed from cart"
                  });
                }}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30 sticky top-8">
              <CardHeader>
                <CardTitle className="text-yellow-400">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <Separator className="bg-yellow-500/20" />
                  <div className="flex justify-between text-xl font-bold text-yellow-400">
                    <span>Total</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                  asChild
                >
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t border-yellow-500/20">
                  <div className="flex items-center space-x-2 text-sm text-yellow-100/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>100% Genuine Products</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-yellow-100/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Instant Digital Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-yellow-100/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>24/7 Customer Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;