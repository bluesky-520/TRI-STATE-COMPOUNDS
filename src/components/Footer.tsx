import type { Page } from '@/App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-tsc-black text-tsc-gray-400">
      {/* Newsletter */}
      <div className="border-b border-tsc-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-black tracking-tight">JOIN THE TSC COMMUNITY</h3>
              <p className="text-sm mt-1">Get exclusive offers, new product alerts, and research updates.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-tsc-gray-900 text-white placeholder-tsc-gray-600 border border-tsc-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red flex-1 md:w-72"
              />
              <button type="submit" className="btn-primary bg-tsc-red hover:bg-tsc-red-dark text-white font-bold px-6 py-3 rounded-lg whitespace-nowrap">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-tsc-red rounded-full flex items-center justify-center font-black text-sm text-white">TSC</div>
              <div>
                <div className="text-sm font-black text-white tracking-tight leading-none">TRI-STATE</div>
                <div className="text-[10px] tracking-[0.2em] leading-none mt-0.5">COMPOUNDS</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed">Premium research peptides. Third-party tested. Made in the USA.</p>
            <div className="flex gap-3 mt-4">
              {['instagram', 'facebook', 'twitter'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full bg-tsc-gray-800 hover:bg-tsc-red flex items-center justify-center transition-colors" aria-label={s}>
                  <span className="text-xs">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">SHOP</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">All Products</button></li>
              <li><button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">Peptides</button></li>
              <li><button onClick={() => handleNav('stacks')} className="hover:text-white transition-colors">Stacks</button></li>
              <li><button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">Accessories</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">COMPANY</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNav('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => handleNav('coa')} className="hover:text-white transition-colors">Certificates of Analysis</button></li>
              <li><button onClick={() => handleNav('faq')} className="hover:text-white transition-colors">FAQ</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-tsc-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2026 Tri-State Compounds. All rights reserved. These products are intended for research purposes only.</p>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-tsc-gray-600">SECURE PAYMENTS:</span>
            <span className="text-tsc-gray-400 font-semibold">VISA</span>
            <span className="text-tsc-gray-400 font-semibold">MC</span>
            <span className="text-tsc-gray-400 font-semibold">AMEX</span>
            <span className="text-tsc-gray-400 font-semibold">DISC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
