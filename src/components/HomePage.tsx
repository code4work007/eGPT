import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { FileUpload } from './FileUpload';
import { Product } from '../types';

interface HomePageProps {
  onSubmit: (prompt: string, products: Product[]) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && products.length > 0) {
      onSubmit(prompt, products);
    }
  };

  const isValid = prompt.trim() && products.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Logo className="justify-center mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Online Store in Minutes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your business, upload your products, and launch a beautiful online store instantly
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="prompt" className="block text-lg font-semibold text-gray-900 mb-3">
                    Describe Your Business
                  </label>
                  <div className="relative">
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Example: I sell handmade jewelry for young women, price range ₹500-3000, bohemian style, based in Jaipur"
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      required
                    />
                    <Sparkles className="absolute top-4 right-4 text-gray-400" size={20} />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Be specific about your target audience, style, price range, and location
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <FileUpload onProductsLoaded={setProducts} products={products} />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!isValid}
                className={`
                  inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200
                  ${isValid
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Generate My Store
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">How It Works</h3>
            <p className="text-gray-600">Simple steps to launch your online store</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Describe & Upload</h4>
              <p className="text-gray-600">Tell us about your business and upload your product catalog</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Choose Theme</h4>
              <p className="text-gray-600">Select from beautiful, professionally designed themes</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Launch Store</h4>
              <p className="text-gray-600">Your store is ready to accept orders and payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};