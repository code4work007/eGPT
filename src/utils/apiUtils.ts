import { APIRequest, APIResponse, Product } from '../types';

// Mock API function that simulates the API call
export const processStoreData = async (request: APIRequest): Promise<APIResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock response with enhanced product descriptions and images
  const enhancedProducts = request.products.map(product => ({
    product_name: product.product_name,
    updated_description: enhanceDescription(product.short_description, request.user_prompt),
    updated_image_url: getEnhancedImageUrl(product.category.toLowerCase())
  }));

  return {
    brand: {
      ...request.brand,
      logo_svg: generateLogoSVG(request.brand.name),
      seo: {
        title: `${request.brand.name} — ${request.brand.tagline}`
      }
    },
    products: enhancedProducts
  };
};

const enhanceDescription = (originalDesc: string, userPrompt: string): string => {
  // Simple enhancement logic
  const enhancements = [
    'perfect for any occasion',
    'crafted with premium materials',
    'designed for modern lifestyle',
    'exclusively handmade',
    'elegant and sophisticated'
  ];
  
  const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
  return `${originalDesc}, ${randomEnhancement}.`;
};

const getEnhancedImageUrl = (category: string): string => {
  const imageMap: { [key: string]: string } = {
    jewelry: 'https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg',
    clothing: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    accessories: 'https://images.pexels.com/photos/1445528/pexels-photo-1445528.jpeg',
    home: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    default: 'https://images.pexels.com/photos/1300957/pexels-photo-1300957.jpeg'
  };
  
  return imageMap[category] || imageMap.default;
};

const generateLogoSVG = (brandName: string): string => {
  return `<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="40" fill="#2563EB" rx="8"/>
    <text x="50" y="25" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">${brandName}</text>
  </svg>`;
};