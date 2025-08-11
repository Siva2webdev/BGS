# API Contracts for Bindaas Genuine Services

## Overview
This document defines the API contracts between frontend and backend for the Microsoft products reselling and VPS hosting platform.

## Current Mock Data (to be replaced)

### Products (`mockProducts` in mock.js)
- 11 products across 4 categories
- Fields: id, name, category, price, originalPrice, description, features, image, inStock, rating, reviews, isMonthly

### Categories (`mockCategories` in mock.js)
- 4 categories: Office Suite, Operating System, Server License, VPS Hosting
- Fields: id, name, description, icon, count

### User Authentication (`mockUser` in mock.js)
- Fields: id, email, name, isLoggedIn
- Currently stored in localStorage as 'bindaas_user'

### Cart (`mockCart` in mock.js)
- Stored in localStorage as 'bindaas_cart'
- Fields: product details + quantity

### Testimonials (`mockTestimonials` in mock.js)
- 3 customer testimonials
- Fields: id, name, role, content, rating, avatar

## Backend API Endpoints to Implement

### 1. Products API
```
GET /api/products
- Returns all products with pagination
- Query params: category, search, sort, page, limit
- Response: { products: [...], total, page, totalPages }

GET /api/products/:id
- Returns single product details
- Response: { product: {...} }

GET /api/categories
- Returns all product categories
- Response: { categories: [...] }
```

### 2. Authentication API
```
POST /api/auth/register
- Body: { name, email, password }
- Response: { user: {...}, token }

POST /api/auth/login
- Body: { email, password }
- Response: { user: {...}, token }

POST /api/auth/logout
- Headers: Authorization: Bearer token
- Response: { message: "Logged out successfully" }

GET /api/auth/me
- Headers: Authorization: Bearer token
- Response: { user: {...} }
```

### 3. Cart API (User-specific)
```
GET /api/cart
- Headers: Authorization: Bearer token
- Response: { cartItems: [...], total }

POST /api/cart/add
- Headers: Authorization: Bearer token
- Body: { productId, quantity }
- Response: { cartItem: {...}, message }

PUT /api/cart/update/:itemId
- Headers: Authorization: Bearer token
- Body: { quantity }
- Response: { cartItem: {...}, message }

DELETE /api/cart/remove/:itemId
- Headers: Authorization: Bearer token
- Response: { message }

DELETE /api/cart/clear
- Headers: Authorization: Bearer token
- Response: { message }
```

### 4. Orders API
```
POST /api/orders
- Headers: Authorization: Bearer token
- Body: { items, shippingAddress, paymentMethod, paymentDetails }
- Response: { order: {...}, message }

GET /api/orders
- Headers: Authorization: Bearer token
- Response: { orders: [...] }

GET /api/orders/:id
- Headers: Authorization: Bearer token
- Response: { order: {...} }
```

### 5. Testimonials API
```
GET /api/testimonials
- Returns customer testimonials
- Response: { testimonials: [...] }
```

## MongoDB Collections

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'customer'),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Products Collection
```javascript
{
  _id: ObjectId,
  id: String (unique identifier),
  name: String (required),
  category: String (required),
  price: Number (required),
  originalPrice: Number,
  description: String (required),
  features: [String],
  image: String,
  inStock: Boolean (default: true),
  rating: Number (default: 0),
  reviews: Number (default: 0),
  isMonthly: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Categories Collection
```javascript
{
  _id: ObjectId,
  id: String (unique identifier),
  name: String (required),
  description: String,
  icon: String,
  count: Number (calculated field),
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Cart Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  items: [{
    productId: ObjectId (ref: Products),
    quantity: Number (required),
    price: Number (stored at time of adding),
    name: String (stored for reference),
    image: String (stored for reference)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Orders Collection
```javascript
{
  _id: ObjectId,
  orderId: String (unique),
  userId: ObjectId (ref: Users),
  items: [{
    productId: ObjectId (ref: Products),
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: Number,
  status: String (pending, completed, failed),
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentMethod: String (stripe, upi),
  paymentStatus: String (pending, completed, failed),
  paymentDetails: Object, // Store payment gateway response
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Testimonials Collection
```javascript
{
  _id: ObjectId,
  id: Number,
  name: String (required),
  role: String,
  content: String (required),
  rating: Number (1-5),
  avatar: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration Changes

### 1. Replace Mock Data Import
- Remove imports from `../data/mock.js`
- Replace with API calls using axios

### 2. Authentication Context Updates
- Update login/register to call backend APIs
- Store JWT token in localStorage
- Add token to API request headers
- Implement token refresh logic

### 3. Cart Context Updates
- Remove localStorage usage
- Call backend cart APIs
- Handle authentication for cart operations

### 4. Component Updates
- Home.js: Fetch products and testimonials from API
- Products.js: Fetch products with filtering/search from API
- ProductDetail.js: Fetch single product from API
- Cart.js: Use backend cart data
- Checkout.js: Create order via API

### 5. API Integration
- Create `src/services/api.js` for centralized API calls
- Add axios interceptors for token handling
- Implement error handling and loading states

## Authentication Flow
1. User registers/logs in → Backend returns JWT token
2. Token stored in localStorage and added to axios headers
3. Protected routes check for token presence
4. Cart operations require authentication
5. Checkout process requires authentication

## Data Seeding
- Seed initial products from mock data
- Seed categories
- Seed testimonials
- Create sample admin user

## Error Handling
- Standardized error response format
- Frontend error boundaries
- Toast notifications for API errors
- Form validation errors

## Security Considerations
- Password hashing with bcrypt
- JWT token expiration
- Input validation and sanitization
- Rate limiting for API endpoints
- CORS configuration

## Testing Strategy
1. Seed database with mock data
2. Test all API endpoints
3. Test authentication flow
4. Test cart operations
5. Test order creation
6. Test frontend-backend integration