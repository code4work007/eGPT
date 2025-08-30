import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { HomePage } from './components/HomePage';
import { ProcessingPage } from './components/ProcessingPage';
import { StorePreview } from './components/StorePreview';
import { ThemeSelection } from './components/ThemeSelection';
import { GeneratedStore } from './components/GeneratedStore';
import { Product, Theme, APIResponse } from './types';
import { processStoreData } from './utils/apiUtils';

type AppState = 'landing' | 'home' | 'processing' | 'preview' | 'themes' | 'store';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [userPrompt, setUserPrompt] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);

  const handleGetStarted = () => {
    setCurrentState('home');
  };

  const handleLandingSubmit = async (prompt: string, uploadedProducts: Product[]) => {
    setUserPrompt(prompt);
    setProducts(uploadedProducts);
    setCurrentState('processing');

    try {
      const request = {
        brand: {
          name: "Egpt",
          tagline: "Type, Launch, and Sell in 10 mins"
        },
        user_prompt: prompt,
        products: uploadedProducts,
        options: {
          locale: "en-IN",
          currency: "INR",
          image_generation: {
            enable: true,
            prompt_style: "product photo on white background, soft shadows",
            use_user_image_as_reference: true
          },
          max_products: 100
        }
      };

      const response = await processStoreData(request);
      setApiResponse(response);
    } catch (error) {
      console.error('Failed to process store data:', error);
    }
  };

  const handleProcessingComplete = () => {
    setCurrentState('preview');
  };

  const handleBackFromPreview = () => {
    setCurrentState('home');
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentState('store');
  };

  const handleBackToThemes = () => {
    setCurrentState('themes');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
  };

  switch (currentState) {
    case 'landing':
      return <LandingPage onGetStarted={handleGetStarted} />;
    
    case 'home':
      return <HomePage onSubmit={handleLandingSubmit} />;
    
    case 'processing':
      return <ProcessingPage onComplete={handleProcessingComplete} />;
    
    case 'preview':
      return <StorePreview onBack={handleBackFromPreview} onBackToHome={handleBackToHome} />;
    
    case 'themes':
      return <ThemeSelection products={products} onThemeSelect={handleThemeSelect} />;
    
    case 'store':
      return selectedTheme && apiResponse ? (
        <GeneratedStore 
          theme={selectedTheme}
          products={products}
          apiResponse={apiResponse}
          onBack={handleBackToThemes}
        />
      ) : null;
    
    default:
      return <LandingPage onGetStarted={handleGetStarted} />;
  }
}

export default App;