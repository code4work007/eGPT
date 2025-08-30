import React from 'react';
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';
import { Theme, Product, APIResponse } from '../types';

interface GeneratedStoreProps {
  theme: Theme;
  products: Product[];
  apiResponse: APIResponse;
  onBack: () => void;
}

export const GeneratedStore: React.FC<GeneratedStoreProps> = ({ 
  theme, 
  products, 
  apiResponse, 
  onBack 
}) => {
  const enhancedProducts = products.map(product => {
    const apiProduct = apiResponse.products.find(p => p.product_name === product.product_name);
    return {
      ...product,
      description: apiProduct?.updated_description || product.short_description,
      image_url: apiProduct?.updated_image_url || product.image_url
    };
  });

  const getLayoutClass = () => {
    switch (theme.style.layout_type) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
      case 'list':
        return 'space-y-6';
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
    }
  };

  const getProductCardClass = () => {
    if (theme.style.layout_type === 'masonry') {
      return 'break-inside-avoid mb-6';
    }
    return '';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.style.secondary_color }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Themes
            </button>
            
            <div className="flex items-center gap-3">
              {apiResponse.brand.logo_svg && (
                <div dangerouslySetInnerHTML={{ __html: apiResponse.brand.logo_svg }} />
              )}
              <div>
                <h1 className="text-xl font-bold" style={{ color: theme.style.primary_color }}>
                  {apiResponse.brand.name}
                </h1>
                <p className="text-sm text-gray-600">{apiResponse.brand.tagline}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Heart size={20} />
              </button>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: theme.style.font_family }}>
            Discover Amazing Products
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Handcrafted with love, designed for you
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: theme.style.font_family }}>
            Our Products
          </h3>
          <p className="text-gray-600">
            Showing {enhancedProducts.length} amazing products
          </p>
        </div>

        <div className={getLayoutClass()}>
          {enhancedProducts.map((product, index) => (
            <div
              key={index}
              className={`
                bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300
                ${getProductCardClass()}
                ${theme.style.layout_type === 'list' ? 'flex gap-6' : ''}
              `}
            >
              <div className={`
                relative overflow-hidden
                ${theme.style.layout_type === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}
              `}>
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className={`
                    object-cover group-hover:scale-105 transition-transform duration-300
                    ${theme.style.layout_type === 'list' ? 'w-full h-48' : 'w-full h-64'}
                  `}
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className={`p-6 ${theme.style.layout_type === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900" style={{ fontFamily: theme.style.font_family }}>
                    {product.product_name}
                  </h4>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold" style={{ color: theme.style.primary_color }}>
                      ₹{product.price}
                    </span>
                    <div className="text-sm text-gray-500">
                      {product.stock} in stock
                    </div>
                  </div>
                  
                  <button 
                    className="px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: theme.style.primary_color }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {apiResponse.brand.logo_svg && (
              <div dangerouslySetInnerHTML={{ __html: apiResponse.brand.logo_svg }} />
            )}
            <div>
              <h3 className="text-xl font-bold">{apiResponse.brand.name}</h3>
              <p className="text-gray-400">{apiResponse.brand.tagline}</p>
            </div>
          </div>
          <p className="text-gray-400">
            © 2025 {apiResponse.brand.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};