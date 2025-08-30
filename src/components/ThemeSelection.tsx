import React, { useState } from 'react';
import { Check, Eye } from 'lucide-react';
import { Logo } from './Logo';
import { themes } from '../data/themes';
import { Theme, Product } from '../types';

interface ThemeSelectionProps {
  products: Product[];
  onThemeSelect: (theme: Theme) => void;
}

export const ThemeSelection: React.FC<ThemeSelectionProps> = ({ products, onThemeSelect }) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme.id);
    setTimeout(() => {
      onThemeSelect(theme);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Logo className="justify-center mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Store Theme
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a theme that best represents your brand and products
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`
                  bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer group
                  ${selectedTheme === theme.id 
                    ? 'ring-4 ring-blue-500 scale-105' 
                    : 'hover:shadow-xl hover:scale-102'
                  }
                `}
                onClick={() => handleThemeSelect(theme)}
              >
                <div className="relative">
                  <img
                    src={theme.preview_image}
                    alt={theme.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                  </div>
                  {selectedTheme === theme.id && (
                    <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-2">
                      <Check className="text-white" size={16} />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{theme.name}</h3>
                  <p className="text-gray-600 mb-4">{theme.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: theme.style.primary_color }}
                      ></div>
                      <span className="text-sm text-gray-700">Primary Color</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {theme.style.font_family.split(',')[0]}
                      </span>
                      <span className="text-sm text-gray-500">Font</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-medium capitalize">
                        {theme.style.layout_type}
                      </span>
                      <span className="text-sm text-gray-500">Layout</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preview with Your Products ({products.length} items)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Product Image</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">{product.product_name}</p>
                  <p className="text-sm text-gray-600">₹{product.price}</p>
                </div>
              ))}
            </div>
            {products.length > 4 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                +{products.length - 4} more products
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};