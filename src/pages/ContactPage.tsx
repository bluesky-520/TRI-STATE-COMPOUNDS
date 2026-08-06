import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div>
      <div className="bg-tsc-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-tsc-red font-bold tracking-widest mb-2">SUPPORT</p>
          <h1 className="text-4xl font-black tracking-tight">CONTACT US</h1>
          <p className="text-tsc-gray-400 mt-2 max-w-xl">Have a question about our products, an order, or your research? We're here to help.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6">
              <div className="w-10 h-10 rounded-full bg-tsc-red/10 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              </div>
              <h3 className="font-bold text-sm mb-1">EMAIL</h3>
              <p className="text-sm text-gray-600">support@tristatecompounds.com</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="w-10 h-10 rounded-full bg-tsc-red/10 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 className="font-bold text-sm mb-1">PHONE</h3>
              <p className="text-sm text-gray-600">1-800-TSC-PEPT</p>
              <p className="text-xs text-gray-400 mt-1">Mon-Fri, 9am-5pm EST</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="w-10 h-10 rounded-full bg-tsc-red/10 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h3 className="font-bold text-sm mb-1">LOCATION</h3>
              <p className="text-sm text-gray-600">Tri-State Area, USA</p>
              <p className="text-xs text-gray-400 mt-1">Ships nationwide</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-2">MESSAGE SENT!</h3>
                  <p className="text-sm text-gray-600">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-6 text-sm font-bold text-tsc-red hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-black tracking-tight">SEND US A MESSAGE</h3>
                  {error && <p className="text-sm text-tsc-red bg-red-50 px-4 py-3 rounded-lg">{error}</p>}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Message *</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-tsc-red resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full bg-tsc-red hover:bg-tsc-red-dark text-white font-bold py-4 rounded-lg text-sm tracking-wide">
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
