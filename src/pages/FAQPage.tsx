import { useState } from 'react';
import type { Page } from '@/App';

interface FAQPageProps {
  onNavigate: (page: Page) => void;
}

const faqs = [
  { q: 'Are these products safe for human consumption?', a: 'No. All products sold by Tri-State Compounds are intended for research purposes only and are not for human consumption, diagnosis, or treatment of any disease. You must be 21 years or older to purchase.' },
  { q: 'How are your peptides tested?', a: 'Every batch undergoes third-party HPLC (High-Performance Liquid Chromatography) and mass spectrometry testing to verify purity, identity, and concentration. We publish Certificates of Analysis (COAs) for every batch on our website.' },
  { q: 'What is the purity of your peptides?', a: 'Our peptides consistently test at 99% or higher purity. Each product listing and COA shows the exact purity percentage for that specific batch.' },
  { q: 'How long does shipping take?', a: 'Orders are processed within 24-48 hours of payment confirmation. Standard shipping takes 3-5 business days within the US. Expedited shipping options are available at checkout.' },
  { q: 'Do you offer free shipping?', a: 'Yes, we offer free standard shipping on all orders over $150 within the United States. Orders under $150 ship for a flat rate of $9.99.' },
  { q: 'What is your return policy?', a: 'Due to the nature of our products, all sales are final. However, if a product arrives damaged or incorrect, please contact us within 48 hours of delivery for a replacement or refund.' },
  { q: 'How should I store my peptides?', a: 'Lyophilized peptides should be stored in a cool, dry place, ideally refrigerated at 2-8°C. Once reconstituted, peptides should be stored in the refrigerator and used within the recommended timeframe for that compound.' },
  { q: 'Do you ship internationally?', a: 'Currently, we only ship within the United States. We are working on expanding to select international markets. Please check back for updates.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and offer secure checkout processing for your protection.' },
  { q: 'How can I contact customer support?', a: 'You can reach us through our Contact page, or email us directly at support@tristatecompounds.com. Our team typically responds within 24 hours during business days.' },
];

export default function FAQPage({ onNavigate }: FAQPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <div className="bg-tsc-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-tsc-red font-bold tracking-widest mb-2">SUPPORT</p>
          <h1 className="text-4xl font-black tracking-tight">FREQUENTLY ASKED QUESTIONS</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-bold text-sm pr-4">{faq.q}</span>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180 text-tsc-red' : 'text-gray-400'}`}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-tsc-gray-100 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-black tracking-tight mb-2">Still have questions?</h3>
          <p className="text-sm text-gray-600 mb-4">Our support team is here to help.</p>
          <button onClick={() => onNavigate('contact')} className="btn-primary bg-tsc-black text-white font-bold px-6 py-3 rounded-lg text-sm">
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
}
