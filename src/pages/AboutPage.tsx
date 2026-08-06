import type { Page } from '@/App';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      <div className="bg-tsc-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-tsc-red font-bold tracking-widest mb-2">ABOUT US</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight max-w-2xl">RESEARCH-GRADE PEPTIDES, UNCOMPRISING QUALITY</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight mb-4">OUR STORY</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tri-State Compounds was founded with a singular mission: to provide researchers with the highest quality peptides available on the market.
                What began as a small operation serving local research institutions has grown into a trusted supplier for laboratories, universities, and independent researchers across the country.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that quality research starts with quality materials. That's why every product we sell undergoes rigorous third-party testing, and we publish the results for full transparency.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.pexels.com/photos/8533138/pexels-photo-8533138.jpeg?auto=compress&cs=tinysrgb&h=600&w=800&fit=crop" alt="Research laboratory" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tight mb-6">OUR VALUES</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'PURITY', desc: 'Every batch is tested to 99%+ purity via HPLC and mass spectrometry. We never compromise on quality.' },
              { title: 'TRANSPARENCY', desc: 'We publish Certificates of Analysis for every batch. Our customers deserve to know exactly what they are getting.' },
              { title: 'INTEGRITY', desc: 'We operate with honesty and accountability. If a batch does not meet our standards, it does not ship.' },
              { title: 'INNOVATION', desc: 'We continuously invest in new formulations and research partnerships to advance the field of peptide science.' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-tsc-red/10 flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
                </div>
                <h3 className="font-black text-sm tracking-tight mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="bg-tsc-dark text-white rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: '50K+', label: 'Orders Shipped' },
                { num: '99%+', label: 'Average Purity' },
                { num: '100%', label: 'Batch Tested' },
                { num: '4.9★', label: 'Customer Rating' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-3xl md:text-4xl font-black text-tsc-red">{s.num}</p>
                  <p className="text-xs text-tsc-gray-400 mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-black tracking-tight mb-3">READY TO ELEVATE YOUR RESEARCH?</h2>
          <p className="text-gray-600 mb-6">Browse our full catalog of premium research peptides.</p>
          <button onClick={() => onNavigate('shop')} className="btn-primary bg-tsc-red hover:bg-tsc-red-dark text-white font-bold px-8 py-4 rounded-lg text-sm tracking-wide">
            SHOP PRODUCTS
          </button>
        </section>
      </div>
    </div>
  );
}
