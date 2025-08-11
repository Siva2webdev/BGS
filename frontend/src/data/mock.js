// Mock data for Bindaas Genuine Services

export const mockProducts = [
  // Microsoft Office Products
  {
    id: 'office-365-personal',
    name: 'Microsoft Office 365 Personal',
    category: 'Office Suite',
    price: 4200,
    originalPrice: 5200,
    description: 'Complete Office suite with Word, Excel, PowerPoint, Outlook, and 1TB OneDrive storage for 1 user.',
    features: ['1 User License', '1TB OneDrive Storage', 'Premium Office Apps', 'Mobile & Web Apps', '1 Year Subscription'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.8,
    reviews: 245
  },
  {
    id: 'office-365-family',
    name: 'Microsoft Office 365 Family',
    category: 'Office Suite', 
    price: 5200,
    originalPrice: 6500,
    description: 'Office 365 for up to 6 users with premium apps, 1TB OneDrive storage per user, and advanced security.',
    features: ['6 User Licenses', '1TB OneDrive per User', 'Premium Office Apps', 'Advanced Security', '1 Year Subscription'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.9,
    reviews: 189
  },
  {
    id: 'office-2021-home',
    name: 'Microsoft Office 2021 Home & Student',
    category: 'Office Suite',
    price: 8900,
    originalPrice: 10500,
    description: 'One-time purchase of Office 2021 with Word, Excel, PowerPoint for home and student use.',
    features: ['Lifetime License', 'Word, Excel, PowerPoint', 'OneNote Included', 'Windows & Mac Compatible', 'No Subscription Required'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'office-2021-professional',
    name: 'Microsoft Office 2021 Professional',
    category: 'Office Suite',
    price: 18500,
    originalPrice: 22000,
    description: 'Complete Office 2021 suite with all applications including Access and Publisher for professional use.',
    features: ['Lifetime License', 'All Office Apps', 'Access & Publisher', 'Commercial Use', 'Advanced Features'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.8,
    reviews: 98
  },

  // Windows Operating Systems
  {
    id: 'windows-11-home',
    name: 'Windows 11 Home',
    category: 'Operating System',
    price: 7500,
    originalPrice: 9500,
    description: 'Latest Windows 11 Home edition with enhanced security, productivity features, and modern design.',
    features: ['Genuine License Key', 'Lifetime Activation', 'Latest Security Updates', 'Microsoft Support', 'Digital Download'],
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.6,
    reviews: 312
  },
  {
    id: 'windows-11-pro',
    name: 'Windows 11 Professional',
    category: 'Operating System',
    price: 12500,
    originalPrice: 15000,
    description: 'Windows 11 Pro with advanced business features, BitLocker encryption, and domain join capabilities.',
    features: ['Business Features', 'BitLocker Encryption', 'Domain Join', 'Remote Desktop', 'Hyper-V Support'],
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.7,
    reviews: 198
  },
  {
    id: 'windows-10-pro',
    name: 'Windows 10 Professional',
    category: 'Operating System',
    price: 8900,
    originalPrice: 11000,
    description: 'Reliable Windows 10 Pro with proven stability and extensive software compatibility.',
    features: ['Proven Stability', 'Wide Compatibility', 'Business Features', 'Regular Updates', 'Lifetime License'],
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.8,
    reviews: 445
  },

  // Server Products
  {
    id: 'windows-server-2022',
    name: 'Windows Server 2022 Standard',
    category: 'Server License',
    price: 45000,
    originalPrice: 55000,
    description: 'Latest Windows Server 2022 with enhanced security, hybrid capabilities, and container support.',
    features: ['16 Core License', 'Hybrid Cloud Ready', 'Enhanced Security', 'Container Support', 'Official License'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.5,
    reviews: 67
  },

  // VPS Hosting
  {
    id: 'vps-starter',
    name: 'VPS Starter Plan',
    category: 'VPS Hosting',
    price: 1200,
    originalPrice: 1500,
    description: 'Perfect starter VPS with SSD storage, dedicated resources, and 99.9% uptime guarantee.',
    features: ['2 CPU Cores', '4GB RAM', '50GB SSD Storage', '1TB Bandwidth', '99.9% Uptime', 'Linux/Windows'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.4,
    reviews: 89,
    isMonthly: true
  },
  {
    id: 'vps-business',
    name: 'VPS Business Plan',
    category: 'VPS Hosting',
    price: 2500,
    originalPrice: 3000,
    description: 'Business-grade VPS with enhanced performance, more resources, and priority support.',
    features: ['4 CPU Cores', '8GB RAM', '100GB SSD Storage', '2TB Bandwidth', 'Priority Support', 'Daily Backups'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.6,
    reviews: 134,
    isMonthly: true
  },
  {
    id: 'vps-enterprise',
    name: 'VPS Enterprise Plan',
    category: 'VPS Hosting',
    price: 4500,
    originalPrice: 5500,
    description: 'High-performance VPS for demanding applications with maximum resources and dedicated support.',
    features: ['8 CPU Cores', '16GB RAM', '200GB SSD Storage', '5TB Bandwidth', 'Dedicated Support', 'Custom Configuration'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    inStock: true,
    rating: 4.7,
    reviews: 76,
    isMonthly: true
  }
];

export const mockCategories = [
  {
    id: 'office-suite',
    name: 'Office Suite',
    description: 'Microsoft Office applications and subscriptions',
    icon: 'FileText',
    count: 4
  },
  {
    id: 'operating-system',
    name: 'Operating System',
    description: 'Windows OS licenses for home and business',
    icon: 'Monitor',
    count: 3
  },
  {
    id: 'server-license',
    name: 'Server License',
    description: 'Windows Server and enterprise solutions',
    icon: 'Server',
    count: 1
  },
  {
    id: 'vps-hosting',
    name: 'VPS Hosting',
    description: 'Virtual Private Server hosting solutions',
    icon: 'Cloud',
    count: 3
  }
];

export const mockUser = {
  id: null,
  email: '',
  name: '',
  isLoggedIn: false
};

export const mockCart = [];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'IT Manager, TechCorp Solutions',
    content: 'Excellent service! Got genuine Microsoft licenses at competitive prices. The support team was very helpful throughout the process.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Business Owner',
    content: 'VPS hosting is reliable with great uptime. Perfect for my e-commerce business. Highly recommend Bindaas Genuine Services!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b056c987?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Software Developer',
    content: 'Fast delivery and authentic products. Got my Office 2021 license instantly after payment. Great experience overall!',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  }
];