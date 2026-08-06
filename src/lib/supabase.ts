import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProductVariant {
  id: string;
  product_id: string;
  dose_label: string;
  price: number;
  is_default: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category: string;
  featured: boolean;
  sort_order: number;
  product_variants: ProductVariant[];
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}

export function mapVariants(p: Product): ProductWithVariants {
  return { ...p, variants: p.product_variants || [] };
}

export interface CartItem {
  product: ProductWithVariants;
  variant: ProductVariant;
  quantity: number;
}
