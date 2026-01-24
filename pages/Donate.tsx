
import React, { useState } from 'react';
import { api } from '../services/api';
import { Heart, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Donate: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '50',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API/Payment delay
    setTimeout(() => {
      const donation = api.addDonation({
        donorName: formData.name,
        donorEmail: formData.email,
        amount: parseFloat(formData.amount),
        message: formData.message
      });
      setSuccessId(donation.id);
      setLoading(false);
    }, 1500);
  };

  if (successId) {
    return (
      <div className="min-h-screen py-20 px-4 bg-emerald-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You, {formData.name}!</h2>
          <p className="text-gray-600 mb-8">
            Your generous gift of ${formData.amount} will make a tangible difference. We've sent a receipt to your email.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8 text-left">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Receipt ID</div>
            <div className="font-mono text-emerald-700 font-bold">{successId}</div>
          </div>
          <a 
            href={`#/receipt/${successId}`}
            className="block w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-colors"
          >
            View Full Receipt
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Make an Impact Today</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose an amount to help us continue our mission. 100% of your donation goes directly to the field.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Select Amount</label>
                <div className="grid grid-cols-3 gap-4">
                  {['25', '50', '100', '250', '500'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setFormData({...formData, amount: amt})}
                      className={`py-4 rounded-xl font-bold text-lg transition-all border-2 ${
                        formData.amount === amt 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                          : 'border-gray-100 hover:border-emerald-200 text-gray-600'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      placeholder="Other"
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full py-4 pl-8 pr-4 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Message (Optional)</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="Why are you giving today?"
                  ></textarea>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <CreditCard className="text-gray-400 h-6 w-6" />
                    <span className="font-bold text-gray-700">Payment Simulation</span>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    This is a secure mock payment gateway. No real funds will be charged.
                  </p>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Heart className="h-6 w-6 fill-current" />
                      Donate ${formData.amount} Now
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg">
              <ShieldCheck className="h-10 w-10 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Your Security is Our Priority</h4>
              <p className="text-blue-100 leading-relaxed">
                We use industry-standard encryption for all transactions. Your data is never shared with third parties.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                How your money is used
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "Direct Aid", pct: "85%" },
                  { label: "Community Development", pct: "10%" },
                  { label: "Administrative Costs", pct: "5%" }
                ].map((item, i) => (
                  <li key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">{item.label}</span>
                      <span className="text-emerald-600 font-bold">{item.pct}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: item.pct }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
