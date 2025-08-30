import React from 'react';
import { ArrowRight, Zap, ShoppingBag, Sparkles, Clock, Globe, CreditCard } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-xl">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white">eGPT</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles size={16} />
              AI-Powered Store Builder
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              eGPT
            </h1>
            
            <p className="text-2xl md:text-3xl text-blue-200 font-medium mb-8">
              Type, Launch and Sell in 10 mins
            </p>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your business idea into a fully functional online store with AI-powered descriptions, 
              professional themes, and instant deployment.
            </p>
            
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose eGPT?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to launch a successful online store
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center group hover:bg-white/15 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-300">
                Generate your complete online store in under 10 minutes with AI-powered automation
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center group hover:bg-white/15 transition-all duration-300">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Professional Design</h3>
              <p className="text-gray-300">
                Choose from stunning, mobile-responsive themes designed by professionals
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center group hover:bg-white/15 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <CreditCard className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Ready to Sell</h3>
              <p className="text-gray-300">
                Integrated payment processing and order management from day one
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From idea to live store in three simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-3">Describe Your Business</h3>
                  <p className="text-gray-300 text-lg">
                    Tell us about your products, target audience, and brand style. Upload your product catalog in Excel format.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="text-center md:text-right">
                  <h3 className="text-2xl font-bold text-white mb-3">AI Enhancement</h3>
                  <p className="text-gray-300 text-lg">
                    Our AI enhances your product descriptions, generates professional images, and optimizes everything for sales.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-3">Launch & Sell</h3>
                  <p className="text-gray-300 text-lg">
                    Choose your theme, preview your store, and publish it live. Start accepting orders immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Launch Your Store?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of entrepreneurs who've built successful online stores with eGPT
            </p>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
            >
              <Clock size={24} />
              Get Started - 10 Minutes to Launch
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-xl">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">eGPT</h3>
          </div>
          <p className="text-gray-400">
            © 2025 eGPT. All rights reserved. Built with ❤️ for entrepreneurs.
          </p>
        </div>
      </footer>
    </div>
  );
};