import { useState, useEffect, useRef, useCallback } from 'react';
import type { Page } from '@/App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync cart count from localStorage
  useEffect(() => {
    const updateCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('tsc_cart') || '[]');
        setCartCount(cart.reduce((s: number, i: { quantity: number }) => s + i.quantity, 0));
      } catch { setCartCount(0); }
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('tsc_cart_update', updateCount);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('tsc_cart_update', updateCount);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Stacks', page: 'stacks' },
    { label: 'COA', page: 'coa' },
    { label: 'About', page: 'about' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop');
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleNavigate = useCallback((page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [onNavigate]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-tsc-red text-white text-center text-xs py-2 px-4 tracking-wide font-medium">
        FREE SHIPPING ON ORDERS OVER $150 · USE CODE TSC10 FOR 10% OFF YOUR FIRST ORDER
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-tsc-black/95 backdrop-blur-md shadow-lg' : 'bg-tsc-black'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white p-2 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
              </svg>
            </button>

            {/* Logo */}
            <button onClick={() => handleNavigate('home')} className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 bg-tsc-red rounded-full flex items-center justify-center font-black text-sm tracking-tighter">TSC</div>
              <div className="hidden sm:block">
                <div className="text-sm font-black tracking-tight leading-none">TRI-STATE</div>
                <div className="text-[10px] tracking-[0.2em] text-tsc-gray-400 leading-none mt-0.5">COMPOUNDS</div>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => handleNavigate(link.page)}
                  className={`nav-link text-sm font-semibold tracking-wide uppercase ${currentPage === link.page ? 'text-white' : 'text-tsc-gray-400 hover:text-white'}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-tsc-red transition-colors p-2"
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>

              <button
                onClick={() => handleNavigate('shop')}
                className="text-white hover:text-tsc-red transition-colors p-2 hidden sm:block"
                aria-label="Account"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('tsc_open_cart'))}
                className="relative text-white hover:text-tsc-red transition-colors p-2"
                aria-label="Cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-tsc-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="pb-4">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-tsc-gray-900 text-white placeholder-tsc-gray-600 border border-tsc-gray-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-tsc-red"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-tsc-gray-400 hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden bg-tsc-dark border-t border-tsc-gray-800 px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => handleNavigate(link.page)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide ${currentPage === link.page ? 'bg-tsc-red text-white' : 'text-tsc-gray-400 hover:bg-tsc-gray-800'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
