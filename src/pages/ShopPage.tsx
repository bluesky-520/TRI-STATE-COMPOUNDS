import { useState, useEffect, useMemo } from 'react';
import { supabase, mapVariants } from '@/lib/supabase';
import type { ProductWithVariants, ProductVariant } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

interface ShopPageProps {
  searchQuery?: string;
  onQuickAdd: (product: ProductWithVariants, variant: ProductVariant) => void;
  onProductClick: (product: ProductWithVariants) => void;
}

export default function ShopPage({ searchQuery, onQuickAdd, onProductClick }: ShopPageProps) {
  const [products, setProducts] = useState<ProductWithVariants[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .order('sort_order');
      const mapped = (data || []).map(mapVariants);
      setProducts(mapped);
      setLoading(false);
    })();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') result = result.filter(p => p.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false)
      );
    }
    result = result.filter(p => {
      const minPrice = Math.min(...p.variants.map(v => v.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });
    if (sortBy === 'price-low') result.sort((a, b) => Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price)));
    if (sortBy === 'price-high') result.sort((a, b) => Math.min(...b.variants.map(v => v.price)) - Math.min(...a.variants.map(v => v.price)));
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [products, activeCategory, sortBy, priceRange, searchQuery]);

  return (
    <div>
      {/* Page header */}
      <div className="bg-tsc-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-tsc-red font-bold tracking-widest mb-2">SHOP</p>
          <h1 className="text-4xl font-black tracking-tight">ALL PRODUCTS</h1>
          <p className="text-tsc-gray-400 mt-2 max-w-xl">Browse our full catalog of premium research peptides, blends, and accessories.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? 'bg-tsc-red text-white border-tsc-red'
                    : 'bg-white text-tsc-gray-600 border-gray-200 hover:border-tsc-gray-400'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{filtered.length} products</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tsc-red bg-white"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl p-5 sticky top-32">
              <h3 className="font-bold text-sm mb-4">Price Range</h3>
              <div className="space-y-2">
                {[[0, 50], [50, 100], [100, 200], [200, 500], [0, 500]].map(([min, max], i) => (
                  <button
                    key={i}
                    onClick={() => setPriceRange([min, max])}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      priceRange[0] === min && priceRange[1] === max
                        ? 'bg-tsc-red/10 text-tsc-red font-bold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {min === 0 && max === 500 ? 'All Prices' : `$${min} - $${max}`}
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-sm mb-4 mt-6">Research Disclaimer</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                All products are sold for research purposes only and are not intended for human consumption. Must be 21+ to purchase.
              </p>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl aspect-square animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} onQuickAdd={onQuickAdd} onProductClick={onProductClick} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
