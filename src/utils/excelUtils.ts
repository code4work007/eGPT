import * as XLSX from 'xlsx';
import { Product } from '../types';

export const generateSampleExcel = (): void => {
  const sampleData = [
    {
      'Product Name': 'Bohemian Necklace',
      'Short Description': 'Handmade necklace with beads and stones',
      'Price': 1200,
      'Category': 'Jewelry',
      'Stock': 50,
      'Image URL': 'https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg'
    },
    {
      'Product Name': 'Beaded Earrings',
      'Short Description': 'Colorful handmade earrings with beads',
      'Price': 800,
      'Category': 'Jewelry',
      'Stock': 40,
      'Image URL': 'https://images.pexels.com/photos/1445528/pexels-photo-1445528.jpeg'
    },
    {
      'Product Name': 'Silver Ring',
      'Short Description': 'Elegant silver ring with gemstone',
      'Price': 1500,
      'Category': 'Jewelry',
      'Stock': 25,
      'Image URL': 'https://images.pexels.com/photos/1300957/pexels-photo-1300957.jpeg'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  // Add instructions sheet
  const instructions = [
    {
      'Field': 'Product Name',
      'Description': 'The name of your product',
      'Example': 'Bohemian Necklace'
    },
    {
      'Field': 'Short Description',
      'Description': 'Brief description of the product',
      'Example': 'Handmade necklace with beads and stones'
    },
    {
      'Field': 'Price',
      'Description': 'Product price (numbers only)',
      'Example': '1200'
    },
    {
      'Field': 'Category',
      'Description': 'Product category',
      'Example': 'Jewelry'
    },
    {
      'Field': 'Stock',
      'Description': 'Available quantity',
      'Example': '50'
    },
    {
      'Field': 'Image URL',
      'Description': 'Link to product image',
      'Example': 'https://example.com/image.jpg'
    }
  ];

  const instructionsSheet = XLSX.utils.json_to_sheet(instructions);
  XLSX.utils.book_append_sheet(workbook, instructionsSheet, 'Instructions');

  XLSX.writeFile(workbook, 'egpt-product-template.xlsx');
};

export const parseExcelFile = (file: File): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const products: Product[] = jsonData.map((row: any) => ({
          product_name: row['Product Name'] || '',
          short_description: row['Short Description'] || '',
          price: Number(row['Price']) || 0,
          category: row['Category'] || '',
          stock: Number(row['Stock']) || 0,
          image_url: row['Image URL'] || ''
        }));

        resolve(products);
      } catch (error) {
        reject(new Error('Failed to parse Excel file. Please check the format.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const validateProducts = (products: Product[]): string[] => {
  const errors: string[] = [];
  
  products.forEach((product, index) => {
    if (!product.product_name.trim()) {
      errors.push(`Row ${index + 2}: Product name is required`);
    }
    if (!product.short_description.trim()) {
      errors.push(`Row ${index + 2}: Description is required`);
    }
    if (product.price <= 0) {
      errors.push(`Row ${index + 2}: Price must be greater than 0`);
    }
    if (!product.category.trim()) {
      errors.push(`Row ${index + 2}: Category is required`);
    }
    if (product.stock < 0) {
      errors.push(`Row ${index + 2}: Stock cannot be negative`);
    }
  });

  return errors;
};