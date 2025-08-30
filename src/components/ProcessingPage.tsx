import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, Zap } from 'lucide-react';
import { Logo } from './Logo';

interface ProcessingPageProps {
  onComplete: () => void;
}

export const ProcessingPage: React.FC<ProcessingPageProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    'Analyzing your business description',
    'Processing product catalog',
    'Enhancing product descriptions',
    'Generating optimized images',
    'Preparing theme options'
  ];

  useEffect(() => {
    const stepDuration = 800;
    const progressInterval = 50;
    const totalDuration = steps.length * stepDuration;

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + (100 / (totalDuration / progressInterval));
        }
        return 100;
      });
    }, progressInterval);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalDuration);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center max-w-6xl mx-auto px-4">
        <Logo className="justify-center mb-8" />
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Zap className="text-blue-600 animate-pulse" size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Creating Your Store
          </h2>
          
          <div className="space-y-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            
            <div className="text-left space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {index < currentStep ? (
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  ) : index === currentStep ? (
                    <Loader2 className="text-blue-600 animate-spin flex-shrink-0" size={20} />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                  )}
                  <span className={`
                    ${index <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'}
                  `}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-600">
          Please wait while we set up your store with AI-enhanced content...
        </p>
      </div>
    </div>
  );
};