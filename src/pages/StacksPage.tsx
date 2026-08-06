import type { Page } from '@/App';
import type { ProductWithVariants, ProductVariant } from '@/lib/supabase';

interface StacksPageProps {
  onNavigate: (page: Page) => void;
  onQuickAdd: (product: ProductWithVariants, variant: ProductVariant) => void;
}

interface Stack {
  name: string;
  goal: string;
  description: string;
  products: string[];
  price: number;
  originalPrice: number;
  color: string;
  img: string;
}

const stacks: Stack[] = [
  {
    name: 'Recovery Stack',
    goal: 'Muscle Recovery',
    description: 'A powerful combination designed to support tissue repair, reduce inflammation, and accelerate recovery between training sessions.',
    products: ['TB-500', 'Glow Blend', 'Reconstitution Solution'],
    price: 199.99,
    originalPrice: 249.97,
    color: 'from-blue-600 to-blue-800',
    img: 'https://images.pexels.com/photos/36238538/pexels-photo-36238538.jpeg?auto=compress&cs=tinysrgb&h=400&w=600&fit=crop',
  },
  {
    name: 'Performance Stack',
    goal: 'Growth & Performance',
    description: 'Synergistic GH-releasing compounds formulated to support lean mass development and performance research.',
    products: ['CJC-1295 / IPA', 'Ipamorelin', 'Tesamorelin'],
    price: 249.99,
    originalPrice: 319.97,
    color: 'from-tsc-red to-tsc-red-dark',
    img: 'https://images.pexels.com/photos/13779115/pexels-photo-13779115.jpeg?auto=compress&cs=tinysrgb&h=400&w=600&fit=crop',
  },
  {
    name: 'Longevity Stack',
    goal: 'Anti-Aging Research',
    description: 'Cellular optimization compounds supporting mitochondrial function, skin elasticity, and longevity research.',
    products: ['NAD+', 'Glow Blend', 'ARA-290'],
    price: 179.99,
    originalPrice: 219.97,
    color: 'from-emerald-600 to-emerald-800',
    img: 'https://images.pexels.com/photos/13779105/pexels-photo-13779105.jpeg?auto=compress&cs=tinysrgb&h=400&w=600&fit=crop',
  },
  {
    name: 'TSC Complete Stack',
    goal: 'Full Spectrum',
    description: 'Our most comprehensive research stack. Everything you need for a complete research protocol.',
    products: ['TSC-RT3', 'CJC-1295 / IPA', 'NAD+', 'TB-500'],
    price: 399.99,
    originalPrice: 519.96,
    color: 'from-tsc-gray-700 to-tsc-black',
    img: 'https://images.pexels.com/photos/8544939/pexels-photo-8544939.jpeg?auto=compress&cs=tinysrgb&h=400&w=600&fit=crop',
  },
];

export default function StacksPage({ onNavigate, onQuickAdd }: StacksPageProps) {
  const handleAddStack = (stack: Stack) => {
    // Dispatch event for each product in stack
    stack.products.forEach(p => {
      window.dispatchEvent(new CustomEvent('tsc_stack_add', { detail: { name: p } }));
    });
  };

  return (
    <div>
      <div className="bg-tsc-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-tsc-red font-bold tracking-widest mb-2">STACKS</p>
          <h1 className="text-4xl font-black tracking-tight">RESEARCH STACKS</h1>
          <p className="text-tsc-gray-400 mt-2 max-w-xl">Curated combinations of our premium peptides, formulated for synergistic research protocols. Save up to 25% versus buying individually.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {stacks.map(stack => (
            <div key={stack.name} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className={`bg-gradient-to-br ${stack.color} relative aspect-[16/9] overflow-hidden`}>
                <img src={stack.img} alt={stack.name} className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <p className="text-xs font-bold tracking-widest opacity-80 mb-1">{stack.goal}</p>
                  <h2 className="text-2xl font-black tracking-tight">{stack.name}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{stack.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Includes:</p>
                  {stack.products.map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      {p}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-2xl font-black text-tsc-black">${stack.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">${stack.originalPrice}</span>
                    <p className="text-xs text-tsc-red font-bold">SAVE ${(stack.originalPrice - stack.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleAddStack(stack)}
                    className="btn-primary bg-tsc-red hover:bg-tsc-red-dark text-white font-bold px-6 py-3 rounded-lg text-sm"
                  >
                    ADD STACK
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-tsc-gray-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-black tracking-tight mb-2">Not sure which stack is right for your research?</h3>
          <p className="text-sm text-gray-600 mb-4">Our team can help you select the right compounds for your protocol.</p>
          <button onClick={() => onNavigate('contact')} className="btn-primary bg-tsc-black text-white font-bold px-6 py-3 rounded-lg text-sm">
            CONTACT OUR TEAM
          </button>
        </div>
      </div>
    </div>
  );
}
