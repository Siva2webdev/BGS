import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Star, Search, Filter } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mock';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-black text-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-4">
            All Products
          </h1>
          <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
            Browse our complete collection of genuine Microsoft products and VPS hosting solutions
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-gray-900/50 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/50 border-yellow-500/30 text-yellow-100 placeholder-yellow-400/60 focus:border-yellow-400"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-yellow-500/30">
                <SelectItem value="all" className="text-yellow-100 focus:bg-yellow-500/20">All Categories</SelectItem>
                <SelectItem value="office-suite" className="text-yellow-100 focus:bg-yellow-500/20">Office Suite</SelectItem>
                <SelectItem value="operating-system" className="text-yellow-100 focus:bg-yellow-500/20">Operating System</SelectItem>
                <SelectItem value="server-license" className="text-yellow-100 focus:bg-yellow-500/20">Server License</SelectItem>
                <SelectItem value="vps-hosting" className="text-yellow-100 focus:bg-yellow-500/20">VPS Hosting</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-black/50 border-yellow-500/30 text-yellow-100 focus:border-yellow-400">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-yellow-500/30">
                <SelectItem value="name" className="text-yellow-100 focus:bg-yellow-500/20">Name (A-Z)</SelectItem>
                <SelectItem value="price-low" className="text-yellow-100 focus:bg-yellow-500/20">Price (Low to High)</SelectItem>
                <SelectItem value="price-high" className="text-yellow-100 focus:bg-yellow-500/20">Price (High to Low)</SelectItem>
                <SelectItem value="rating" className="text-yellow-100 focus:bg-yellow-500/20">Rating (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <p className="text-yellow-100/70">
            Showing {filteredAndSortedProducts.length} of {mockProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
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
                  {product.inStock && (
                    <Badge variant="secondary" className="ml-2 bg-green-500/20 text-green-400 text-xs">
                      In Stock
                    </Badge>
                  )}
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

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-yellow-100/70">{product.rating}</span>
                    <span className="text-xs text-yellow-100/50">({product.reviews})</span>
                  </div>
                </div>

                <Button 
                  size="sm" 
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                  asChild
                >
                  <Link to={`/product/${product.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-yellow-500/10 to-gray-900 rounded-lg p-12 max-w-md mx-auto">
              <Filter className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">No Products Found</h3>
              <p className="text-yellow-100/70 mb-4">
                Try adjusting your search criteria or browse all categories.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('name');
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;