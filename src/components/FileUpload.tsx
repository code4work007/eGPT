import React, { useRef, useState } from 'react';
import { Upload, Download, FileSpreadsheet, X, AlertCircle } from 'lucide-react';
import { generateSampleExcel, parseExcelFile, validateProducts } from '../utils/excelUtils';
import { Product } from '../types';

interface FileUploadProps {
  onProductsLoaded: (products: Product[]) => void;
  products: Product[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onProductsLoaded, products }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setErrors(['Please upload an Excel file (.xlsx or .xls)']);
      return;
    }

    setUploading(true);
    setErrors([]);

    try {
      const parsedProducts = await parseExcelFile(file);
      const validationErrors = validateProducts(parsedProducts);
      
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
      } else {
        onProductsLoaded(parsedProducts);
        setErrors([]);
      }
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to process file']);
    } finally {
      setUploading(false);
    }
  };

  const clearProducts = () => {
    onProductsLoaded([]);
    setErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Product Catalog</h3>
        <button
          onClick={generateSampleExcel}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <Download size={16} />
          Download Sample
        </button>
      </div>

      {products.length === 0 ? (
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
            ${dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              {uploading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              ) : (
                <Upload className="text-gray-400" size={48} />
              )}
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900">
                {uploading ? 'Processing your file...' : 'Upload your product catalog'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag and drop your Excel file here, or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supports .xlsx and .xls files
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileSpreadsheet className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-green-900">
                  {products.length} products loaded successfully
                </p>
                <p className="text-sm text-green-700">
                  Ready to process and generate your store
                </p>
              </div>
            </div>
            <button
              onClick={clearProducts}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-medium text-red-900 mb-2">Please fix the following errors:</p>
              <ul className="space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700">• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};