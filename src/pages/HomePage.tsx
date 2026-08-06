import { useState, useEffect } from 'react';
import { supabase, mapVariants } from '@/lib/supabase';
import type { ProductWithVariants, ProductVariant } from '@/lib/supabase';
import type { Page } from '@/App';
import ProductCard from '@/components/ProductCard';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onQuickAdd: (product: ProductWithVariants, variant: ProductVariant) => void;
  onProductClick: (product: ProductWithVariants) => void;
}

export default function HomePage({ onNavigate, onQuickAdd, onProductClick }: HomePageProps) {
  const [featured, setFeatured] = useState<ProductWithVariants[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: products } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .eq('featured', true)
        .order('sort_order')
        .limit(8);
      const mapped = (products || []).map(mapVariants);
      setFeatured(mapped);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-tsc-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/8533139/pexels-photo-8533139.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" alt="Research laboratory" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,0.4) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(204,0,0,0.15) 0%, transparent 50%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-tsc-red text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest mb-6">PREMIUM RESEARCH PEPTIDES</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              ELEVATE YOUR<br />
              <span className="text-tsc-red">RESEARCH</span><br />
              WITH TSC
            </h1>
            <p className="text-lg text-tsc-gray-400 mt-6 max-w-lg leading-relaxed">
              Third-party tested, 99%+ purity peptides manufactured in the USA. Trusted by researchers nationwide for uncompromising quality.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => onNavigate('shop')}
                className="btn-primary bg-tsc-red hover:bg-tsc-red-dark text-white font-bold px-8 py-4 rounded-lg text-sm tracking-wide"
              >
                SHOP ALL PRODUCTS
              </button>
              <button
                onClick={() => onNavigate('stacks')}
                className="btn-primary bg-transparent border-2 border-tsc-gray-600 hover:border-white text-white font-bold px-8 py-4 rounded-lg text-sm tracking-wide transition-colors"
              >
                EXPLORE STACKS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z', title: '99%+ PURITY', sub: 'Third-party tested' },
              { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', title: 'MADE IN USA', sub: 'Manufactured domestically' },
              { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z', title: 'CERTIFIED COA', sub: 'Batch testing available' },
              { icon: 'M1 4h22v16H1zM1 10h22', title: 'FAST SHIPPING', sub: 'Free over $150' },
            ].map(b => (
              <div key={b.title} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-tsc-red/10 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2"><path d={b.icon}/></svg>
                </div>
                <div>
                  <p className="font-black text-sm tracking-tight">{b.title}</p>
                  <p className="text-xs text-gray-500">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-tsc-red font-bold tracking-widest mb-1">BEST SELLERS</p>
            <h2 className="text-3xl font-black tracking-tight">FEATURED PRODUCTS</h2>
          </div>
          <button onClick={() => onNavigate('shop')} className="text-sm font-bold text-tsc-red hover:text-tsc-red-dark tracking-wide hidden sm:block">
            VIEW ALL →
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} onQuickAdd={onQuickAdd} onProductClick={onProductClick} />
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <button onClick={() => onNavigate('shop')} className="btn-primary bg-tsc-red text-white font-bold px-6 py-3 rounded-lg text-sm">VIEW ALL PRODUCTS</button>
        </div>
      </section>

      {/* Category banner */}
      <section className="bg-tsc-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'PEPTIDES', desc: 'Single-compound research peptides for targeted studies.', page: 'shop' as Page, img: 'https://images.pexels.com/photos/36238538/pexels-photo-36238538.jpeg?auto=compress&cs=tinysrgb&h=400&w=600&fit=crop' },
              { title: 'BLENDS & STACKS', desc: 'Multi-compound formulations for synergistic research.', page: 'stacks' as Page, img: 'https://images.pexels.com/photos/8544939/pexels-photo-8544939.jpeg?auto=compress&cs=tinysrgb&h=400&w=600&fit=crop' },
              { title: 'ACCESSORIES', desc: 'Reconstitution supplies and research tools.', page: 'shop' as Page, img: 'https://images.pexels.com/photos/14820694/pexels-photo-14820694.jpeg?auto=compress&cs=tinysrgb&h=400&w=600&fit=crop' },
            ].map(cat => (
              <button
                key={cat.title}
                onClick={() => onNavigate(cat.page)}
                className="text-left bg-tsc-gray-900 hover:bg-tsc-gray-800 rounded-xl overflow-hidden transition-colors group relative"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black tracking-tight mb-2">{cat.title}</h3>
                  <p className="text-sm text-tsc-gray-400 mb-4">{cat.desc}</p>
                  <span className="text-tsc-red font-bold text-sm group-hover:translate-x-1 inline-block transition-transform">EXPLORE →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-tsc-red to-tsc-red-dark rounded-2xl p-8 md:p-12 text-white text-center">
          <p className="text-xs font-bold tracking-widest opacity-80 mb-2">EXCLUSIVE OFFER</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">10% OFF YOUR FIRST ORDER</h2>
          <p className="mt-3 text-white/90">Use code <span className="font-black bg-white/20 px-3 py-1 rounded">TSC10</span> at checkout.</p>
          <button onClick={() => onNavigate('shop')} className="btn-primary mt-6 bg-white text-tsc-red font-bold px-8 py-4 rounded-lg text-sm tracking-wide hover:bg-gray-100">
            START SHOPPING
          </button>
        </div>
      </section>
    </div>
  );
}
