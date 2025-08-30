import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean lines, plenty of white space, and contemporary typography',
    preview_image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
    style: {
      primary_color: '#2563EB',
      secondary_color: '#F8FAFC',
      font_family: 'Inter, sans-serif',
      layout_type: 'grid'
    }
  },
  {
    id: 'classic',
    name: 'Classic Elegance',
    description: 'Timeless design with sophisticated colors and traditional layouts',
    preview_image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg',
    style: {
      primary_color: '#059669',
      secondary_color: '#F0FDF4',
      font_family: 'Playfair Display, serif',
      layout_type: 'list'
    }
  },
  {
    id: 'vibrant',
    name: 'Vibrant Creative',
    description: 'Bold colors, dynamic layouts, and creative typography',
    preview_image: 'https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg',
    style: {
      primary_color: '#EA580C',
      secondary_color: '#FFF7ED',
      font_family: 'Poppins, sans-serif',
      layout_type: 'masonry'
    }
  }
];