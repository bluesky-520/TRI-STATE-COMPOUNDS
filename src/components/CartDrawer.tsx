import { useState, useEffect, useCallback } from 'react';
import type { Page } from '@/App';

interface CartDrawerProps {
  onNavigate: (page: Page) => void;
}

interface CartEntry {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  doseLabel: string;
  price: number;
  quantity: number;
}

export default function CartDrawer({ onNavigate }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartEntry[]>([]);

  const loadCart = useCallback(() => {
    try {
      setItems(JSON.parse(localStorage.getItem('tsc_cart') || '[]'));
    } catch { setItems([]); }
  }, []);

  useEffect(() => {
    loadCart();
    const openHandler = () => { loadCart(); setIsOpen(true); };
    const updateHandler = () => loadCart();
    window.addEventListener('tsc_open_cart', openHandler);
    window.addEventListener('tsc_cart_update', updateHandler);
    return () => {
      window.removeEventListener('tsc_open_cart', openHandler);
      window.removeEventListener('tsc_cart_update', updateHandler);
    };
  }, [loadCart]);

  const persist = (next: CartEntry[]) => {
    setItems(next);
    localStorage.setItem('tsc_cart', JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('tsc_cart_update'));
  };

  const updateQty = (productId: string, variantId: string, delta: number) => {
    const next = items.map(i =>
      i.productId === productId && i.variantId === variantId
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
    );
    persist(next);
  };

  const removeItem = (productId: string, variantId: string) => {
    persist(items.filter(i => !(i.productId === productId && i.variantId === variantId)));
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsOpen(false);
    onNavigate('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <div className={`cart-panel fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-black tracking-tight">YOUR CART ({totalItems})</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <div>
                <p className="font-bold text-gray-700">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-1">Add some products to get started.</p>
              </div>
              <button
                onClick={() => { setIsOpen(false); onNavigate('shop'); }}
                className="btn-primary bg-tsc-red hover:bg-tsc-red-dark text-white font-bold px-6 py-3 rounded-lg text-sm tracking-wide"
              >
                SHOP PRODUCTS
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.productId + item.variantId} className="flex gap-4 border-b pb-4">
                  <div className="w-16 h-16 bg-tsc-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-tsc-gray-600">{item.name.slice(0, 3).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.doseLabel}</p>
                    <p className="text-sm font-semibold text-tsc-red mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border rounded-lg">
                        <button onClick={() => updateQty(item.productId, item.variantId, -1)} className="px-2 py-1 text-sm hover:bg-gray-100">−</button>
                        <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQty(item.productId, item.variantId, 1)} className="px-2 py-1 text-sm hover:bg-gray-100">+</button>
                      </div>
                      <button onClick={() => removeItem(item.productId, item.variantId)} className="text-xs text-gray-400 hover:text-tsc-red transition-colors">Remove</button>
                    </div>
                  </div>
                  <p className="font-bold text-sm whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2 text-center">
                Add ${(150 - subtotal).toFixed(2)} more for FREE shipping
              </p>
            )}
            <div className="flex justify-between text-base font-black border-t pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="btn-primary w-full bg-tsc-red hover:bg-tsc-red-dark text-white font-bold py-4 rounded-lg text-sm tracking-wide"
            >
              CHECKOUT
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
