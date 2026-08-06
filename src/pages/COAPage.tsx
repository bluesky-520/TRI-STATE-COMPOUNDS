import { useState } from 'react';

interface COARecord {
  product: string;
  batch: string;
  purity: number;
  date: string;
  status: 'verified' | 'pending';
}

const coaRecords: COARecord[] = [
  { product: 'CJC-1295 / IPA 20mg', batch: 'TSC-2401', purity: 99.2, date: '2026-01-15', status: 'verified' },
  { product: 'Ipamorelin 10mg', batch: 'TSC-2402', purity: 99.5, date: '2026-01-20', status: 'verified' },
  { product: 'Glow Blend 70mg', batch: 'TSC-2403', purity: 98.9, date: '2026-02-01', status: 'verified' },
  { product: 'Klow Blend 80mg', batch: 'TSC-2404', purity: 99.1, date: '2026-02-10', status: 'verified' },
  { product: 'TSC-RT3 20mg', batch: 'TSC-2405', purity: 99.7, date: '2026-02-15', status: 'verified' },
  { product: 'ARA-290 10mg', batch: 'TSC-2406', purity: 99.0, date: '2026-03-01', status: 'verified' },
  { product: 'NAD+ 500mg', batch: 'TSC-2407', purity: 99.4, date: '2026-03-05', status: 'verified' },
  { product: 'TB-500 10mg', batch: 'TSC-2408', purity: 98.8, date: '2026-03-10', status: 'pending' },
  { product: 'Tesamorelin 10mg', batch: 'TSC-2409', purity: 99.3, date: '2026-03-15', status: 'verified' },
];

export default function COAPage() {
  const [search, setSearch] = useState('');
  const filtered = coaRecords.filter(r => r.product.toLowerCase().includes(search.toLowerCase()) || r.batch.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="bg-tsc-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-tsc-red font-bold tracking-widest mb-2">QUALITY ASSURANCE</p>
          <h1 className="text-4xl font-black tracking-tight">CERTIFICATES OF ANALYSIS</h1>
          <p className="text-tsc-gray-400 mt-2 max-w-xl">Every batch is third-party tested for purity and quality. Search by product name or batch number to view COA results.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by product name or batch number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 pl-12 focus:outline-none focus:border-tsc-red"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full">
            <thead className="bg-tsc-black text-white">
              <tr>
                <th className="text-left text-xs font-bold uppercase tracking-wide px-6 py-4">Product</th>
                <th className="text-left text-xs font-bold uppercase tracking-wide px-6 py-4">Batch #</th>
                <th className="text-left text-xs font-bold uppercase tracking-wide px-6 py-4 hidden sm:table-cell">Purity</th>
                <th className="text-left text-xs font-bold uppercase tracking-wide px-6 py-4 hidden md:table-cell">Date</th>
                <th className="text-center text-xs font-bold uppercase tracking-wide px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.batch} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-semibold">{r.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{r.batch}</td>
                  <td className="px-6 py-4 text-sm font-bold text-tsc-red hidden sm:table-cell">{r.purity}%</td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{r.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${r.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {r.status === 'verified' ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-tsc-red hover:underline">VIEW PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No COA records found.</p>
        )}

        <div className="mt-8 bg-tsc-gray-100 rounded-2xl p-6">
          <h3 className="font-bold text-sm mb-2">Our Testing Process</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Every batch of peptides undergoes rigorous third-party HPLC and mass spectrometry testing to verify purity, identity, and concentration. We publish all COAs for full transparency.
            If you cannot find a COA for your product, please <a href="#" className="text-tsc-red font-semibold">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
