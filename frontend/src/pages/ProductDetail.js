import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { 
  Star, 
  Shield, 
  Truck, 
  RotateCcw, 
  CheckCircle,
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react';
import { mockProducts } from '../data/mock';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-yellow-400 mb-4">Product Not Found</h1>
          <Button asChild className="bg-yellow-500 hover:bg-yellow-400 text-black">
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user.isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    addToCart(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${product.name} (${quantity}x) added to your cart`
    });
  };

  const handleBuyNow = () => {
    if (!user.isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with purchase",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-black text-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-yellow-500/20 to-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
                {product.name}
              </h1>
              <p className="text-yellow-100/80 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} 
                  />
                ))}
                <span className="text-yellow-100/70 ml-2">{product.rating}</span>
              </div>
              <span className="text-yellow-100/50">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-yellow-400">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-yellow-100/50 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.isMonthly && (
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                    /month
                  </Badge>
                )}
              </div>
              {product.originalPrice > product.price && (
                <p className="text-green-400 text-sm">
                  You save ₹{(product.originalPrice - product.price).toLocaleString()} 
                  ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-medium">In Stock</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-yellow-100">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-yellow-100 px-4 py-2 bg-yellow-500/10 rounded min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                onClick={handleBuyNow}
              >
                Buy Now - ₹{(product.price * quantity).toLocaleString()}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="flex-1 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Features List */}
            <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-900 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-yellow-100/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-100/80 text-sm">100% Genuine</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                <Truck className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-100/80 text-sm">Instant Delivery</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                <RotateCcw className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-100/80 text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;