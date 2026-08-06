import { useState } from 'react';
import type { ProductWithVariants, ProductVariant } from '@/lib/supabase';

interface ProductCardProps {
  product: ProductWithVariants;
  onQuickAdd: (product: ProductWithVariants, variant: ProductVariant) => void;
  onProductClick: (product: ProductWithVariants) => void;
}

export default function ProductCard({ product, onQuickAdd, onProductClick }: ProductCardProps) {
  const defaultVariant = product.variants.find(v => v.is_default) || product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(defaultVariant);
  const [adding, setAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    onQuickAdd(product, selectedVariant);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="product-card bg-white rounded-xl overflow-hidden cursor-pointer group" onClick={() => onProductClick(product)}>
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-tsc-gray-100 to-gray-200 overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-black text-tsc-gray-400 tracking-tighter">{product.name.slice(0, 3).toUpperCase()}</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-tsc-red text-white text-[10px] font-bold px-2 py-1 rounded tracking-wide">FEATURED</span>
        )}
        {product.variants.length > 1 && (
          <span className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wide">
            {product.variants.length} OPTIONS
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] text-tsc-gray-600 uppercase tracking-widest font-semibold mb-1">{product.category}</p>
        <h3 className="font-bold text-sm text-tsc-black truncate">{product.name}</h3>

        {/* Variant selector */}
        {product.variants.length > 1 ? (
          <div className="flex gap-2 mt-2 flex-wrap">
            {product.variants.map(v => (
              <button
                key={v.id}
                onClick={(e) => { e.stopPropagation(); setSelectedVariant(v); }}
                className={`text-[11px] font-semibold px-2 py-1 rounded border transition-colors ${
                  selectedVariant.id === v.id
                    ? 'bg-tsc-black text-white border-tsc-black'
                    : 'bg-white text-tsc-gray-600 border-gray-200 hover:border-tsc-gray-400'
                }`}
              >
                {v.dose_label}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 mt-1">{defaultVariant.dose_label}</p>
        )}

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-black text-tsc-black">${selectedVariant.price.toFixed(2)}</span>
          <button
            onClick={handleQuickAdd}
            className={`btn-primary text-xs font-bold px-4 py-2 rounded-lg tracking-wide transition-colors ${
              adding ? 'bg-green-600 text-white' : 'bg-tsc-red hover:bg-tsc-red-dark text-white'
            }`}
          >
            {adding ? 'ADDED!' : 'QUICK ADD'}
          </button>
        </div>
      </div>
    </div>
  );
}
