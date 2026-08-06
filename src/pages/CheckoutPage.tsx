import { useState, useEffect, useCallback } from 'react';
import type { Page } from '@/App';

interface CheckoutPageProps {
  onNavigate: (page: Page) => void;
}

interface CartEntry {
  productId: string;
  variantId: string;
  name: string;
  doseLabel: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const [items, setItems] = useState<CartEntry[]>([]);
  const [step, setStep] = useState<'info' | 'complete'>('info');
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', card: '', expiry: '', cvv: '',
  });

  const loadCart = useCallback(() => {
    try { setItems(JSON.parse(localStorage.getItem('tsc_cart') || '[]')); } catch { setItems([]); }
  }, []);

  useEffect(() => { loadCart(); }, [loadCart]);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 9.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('complete');
    localStorage.removeItem('tsc_cart');
    window.dispatchEvent(new CustomEvent('tsc_cart_update'));
  };

  if (step === 'complete') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-3">ORDER CONFIRMED!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase. A confirmation email has been sent to {form.email || 'your email'}.</p>
        <p className="text-sm text-gray-500 mb-8">Order #TSC-{Math.floor(Math.random() * 1000000)}</p>
        <button onClick={() => onNavigate('home')} className="btn-primary bg-tsc-red hover:bg-tsc-red-dark text-white font-bold px-8 py-4 rounded-lg text-sm tracking-wide">
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black tracking-tight mb-3">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some products before checking out.</p>
        <button onClick={() => onNavigate('shop')} className="btn-primary bg-tsc-red text-white font-bold px-6 py-3 rounded-lg text-sm">SHOP PRODUCTS</button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-tsc-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight">CHECKOUT</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-sm uppercase tracking-wide mb-4">Contact Information</h3>
                <input type="email" placeholder="Email address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red mb-3" />
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-sm uppercase tracking-wide mb-4">Shipping Address</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="First name" required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red" />
                  <input type="text" placeholder="Last name" required value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red" />
                </div>
                <input type="text" placeholder="Address" required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red mt-3" />
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  <input type="text" placeholder="City" required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red" />
                  <input type="text" placeholder="State" required value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red" />
                  <input type="text" placeholder="ZIP" required value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-sm uppercase tracking-wide mb-4">Payment Information</h3>
                <input type="text" placeholder="Card number" required value={form.card} onChange={e => setForm({ ...form, card: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red mb-3" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" required value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red" />
                  <input type="text" placeholder="CVV" required value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red" />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full bg-tsc-red hover:bg-tsc-red-dark text-white font-bold py-4 rounded-lg text-sm tracking-wide">
                PLACE ORDER - ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sticky top-32">
              <h3 className="font-bold text-sm uppercase tracking-wide mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.productId + item.variantId} className="flex gap-3">
                    <div className="w-12 h-12 bg-tsc-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-gray-500">{item.name.slice(0, 3).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.doseLabel} × {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Tax</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-black border-t pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
