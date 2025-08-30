export interface Product {
  product_name: string;
  short_description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  updated_description?: string;
  updated_image_url?: string;
}

export interface Brand {
  name: string;
  tagline: string;
  logo_svg?: string;
  seo?: {
    title: string;
  };
}

export interface APIRequest {
  brand: Brand;
  user_prompt: string;
  products: Product[];
  options: {
    locale: string;
    currency: string;
    image_generation: {
      enable: boolean;
      prompt_style: string;
      use_user_image_as_reference: boolean;
    };
    max_products: number;
  };
}

export interface APIResponse {
  brand: Brand;
  products: Array<{
    product_name: string;
    updated_description: string;
    updated_image_url: string;
  }>;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  preview_image: string;
  style: {
    primary_color: string;
    secondary_color: string;
    font_family: string;
    layout_type: 'grid' | 'list' | 'masonry';
  };
}