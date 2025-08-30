import React from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface StorePreviewProps {
  onBack: () => void;
  onBackToHome: () => void;
}

export const StorePreview: React.FC<StorePreviewProps> = ({ onBack, onBackToHome }) => {
  const handlePublishStore = () => {
    // Open external URL in new tab
    window.open('https://complete-handmade-je-kfih.bolt.host/', '_blank');
    // Close current tab after 1 second
    setTimeout(() => {
      window.close();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Logo className="justify-center mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Store is Ready!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preview your generated store and publish it when you're ready
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                
                <button
                  onClick={onBackToHome}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                  Start Over
                </button>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Live Preview
                </div>
                
                <button
                  onClick={handlePublishStore}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ExternalLink size={18} />
                  Publish Store
                </button>
              </div>
            </div>
            
            <div className="relative">
              <iframe
                src="https://complete-handmade-je-kfih.bolt.host/"
                className="w-full h-[800px] border-0"
                title="Generated Store Preview"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Love what you see? Publish your store to make it live for customers.
            </p>
            <button
              onClick={handlePublishStore}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ExternalLink size={24} />
              Publish Store Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};