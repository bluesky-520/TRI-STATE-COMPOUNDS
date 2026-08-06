import { useState, useEffect } from 'react';
import type { ProductWithVariants, ProductVariant } from '@/lib/supabase';

interface ProductModalProps {
  product: ProductWithVariants | null;
  onClose: () => void;
  onQuickAdd: (product: ProductWithVariants, variant: ProductVariant) => void;
}

export default function ProductModal({ product, onClose, onQuickAdd }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      const def = product.variants.find(v => v.is_default) || product.variants[0];
      setSelectedVariant(def);
      setQuantity(1);
    }
  }, [product]);

  if (!product || !selectedVariant) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-gray-100 flex items-center justify-center shadow-md" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-tsc-gray-100 to-gray-200 flex items-center justify-center">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl font-black text-tsc-gray-400 tracking-tighter">{product.name.slice(0, 3).toUpperCase()}</span>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-xs text-tsc-gray-600 uppercase tracking-widest font-semibold mb-1">{product.category}</p>
            <h2 className="text-2xl font-black tracking-tight mb-2">{product.name}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{product.description}</p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Select Option</p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-sm font-semibold px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedVariant.id === v.id
                          ? 'border-tsc-black bg-tsc-black text-white'
                          : 'border-gray-200 text-tsc-gray-600 hover:border-tsc-gray-400'
                      }`}
                    >
                      {v.dose_label} - ${v.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-3xl font-black text-tsc-black mb-4">${selectedVariant.price.toFixed(2)}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Qty</span>
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-lg hover:bg-gray-50">−</button>
                <span className="px-4 font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-lg hover:bg-gray-50">+</button>
              </div>
            </div>

            <button
              onClick={() => { onQuickAdd(product, selectedVariant); onClose(); }}
              className="btn-primary w-full bg-tsc-red hover:bg-tsc-red-dark text-white font-bold py-4 rounded-lg text-sm tracking-wide"
            >
              ADD TO CART - ${(selectedVariant.price * quantity).toFixed(2)}
            </button>

            <div className="mt-6 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg> 99%+ purity, third-party tested</div>
              <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Made in the USA</div>
              <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2"><path d="M1 4h22v16H1zM1 10h22"/></svg> Free shipping on orders over $150</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
