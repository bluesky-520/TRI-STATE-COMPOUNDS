import { useState, useCallback } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import type { ProductWithVariants, ProductVariant } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import StacksPage from '@/pages/StacksPage';
import COAPage from '@/pages/COAPage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import CheckoutPage from '@/pages/CheckoutPage';

export type Page = 'home' | 'shop' | 'stacks' | 'coa' | 'about' | 'faq' | 'contact' | 'checkout';

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalProduct, setModalProduct] = useState<ProductWithVariants | null>(null);
  const { addItem, openCart } = useCart();

  const handleNavigate = useCallback((p: Page) => {
    setPage(p);
  }, []);

  const handleQuickAdd = useCallback((product: ProductWithVariants, variant: ProductVariant) => {
    addItem(product, variant);
    // Persist to localStorage for header count
    try {
      const cart = JSON.parse(localStorage.getItem('tsc_cart') || '[]');
      const existing = cart.find((i: { productId: string; variantId: string }) => i.productId === product.id && i.variantId === variant.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          slug: product.slug,
          doseLabel: variant.dose_label,
          price: variant.price,
          quantity: 1,
        });
      }
      localStorage.setItem('tsc_cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('tsc_cart_update'));
      window.dispatchEvent(new CustomEvent('tsc_open_cart'));
    } catch { /* noop */ }
  }, [addItem]);

  const handleProductClick = useCallback((product: ProductWithVariants) => {
    setModalProduct(product);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={handleNavigate} onQuickAdd={handleQuickAdd} onProductClick={handleProductClick} />;
      case 'shop': return <ShopPage searchQuery={searchQuery} onQuickAdd={handleQuickAdd} onProductClick={handleProductClick} />;
      case 'stacks': return <StacksPage onNavigate={handleNavigate} onQuickAdd={handleQuickAdd} />;
      case 'coa': return <COAPage />;
      case 'about': return <AboutPage onNavigate={handleNavigate} />;
      case 'faq': return <FAQPage onNavigate={handleNavigate} />;
      case 'contact': return <ContactPage />;
      case 'checkout': return <CheckoutPage onNavigate={handleNavigate} />;
      default: return <HomePage onNavigate={handleNavigate} onQuickAdd={handleQuickAdd} onProductClick={handleProductClick} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage={page} onNavigate={handleNavigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <CartDrawer onNavigate={handleNavigate} />
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onQuickAdd={handleQuickAdd} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
