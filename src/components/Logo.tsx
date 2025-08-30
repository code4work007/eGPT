import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
        <ShoppingBag className="text-white" size={24} />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">eGPT</h1>
    </div>
  );
};