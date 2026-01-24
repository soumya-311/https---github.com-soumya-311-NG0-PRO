
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Donation } from '../types';
import { Heart, Download, Share2, ShieldCheck, Printer } from 'lucide-react';

const Receipt: React.FC = () => {
  const [donation, setDonation] = useState<Donation | null>(null);
  const id = window.location.hash.split('/').pop() || '';

  useEffect(() => {
    const d = api.getDonations().find(item => item.id === id);
    if (d) setDonation(d);
  }, [id]);

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Loading receipt details...</p>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-100 min-h-screen px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <a href="#/" className="text-emerald-600 font-bold flex items-center gap-2">
             ← Back to Site
          </a>
          <button onClick={() => window.print()} className="flex items-center gap-2 text-gray-500 font-medium hover:text-gray-900">
            <Printer className="h-5 w-5" /> Print Receipt
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden print:shadow-none print:border">
          {/* Header */}
          <div className="bg-emerald-600 p-10 text-white text-center">
            <div className="bg-white/20 w-20 h-20 rounded-3xl backdrop-blur flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-white fill-current" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Official Donation Receipt</h1>
            <p className="text-emerald-100 font-medium">Thank you for your generous contribution</p>
          </div>

          {/* Body */}
          <div className="p-12">
            <div className="grid grid-cols-2 gap-12 mb-12">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Donor Details</label>
                <div className="text-xl font-bold text-gray-900">{donation.donorName}</div>
                <div className="text-gray-500">{donation.donorEmail}</div>
              </div>
              <div className="text-right">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Receipt Info</label>
                <div className="font-mono font-bold text-emerald-600">{donation.id}</div>
                <div className="text-gray-500">{new Date(donation.date).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="border-t border-b border-gray-100 py-10 mb-10 text-center">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-4">Amount Contributed</label>
              <div className="text-6xl font-black text-gray-900 tracking-tighter">
                ${donation.amount.toLocaleString()}
              </div>
              <div className="mt-4 text-emerald-600 font-bold italic">Paid in Full • Card Ending in 4242 (Simulated)</div>
            </div>

            <div className="mb-10">
              <p className="text-gray-600 italic leading-relaxed text-center px-10">
                "{donation.message || "No message provided."}"
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Tax Deductible Information</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    NGO Pro is a registered 501(c)(3) nonprofit organization. Your contribution is tax-deductible to the extent allowed by law. Please keep this receipt for your records.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-50 border-t border-gray-100 text-center flex justify-center gap-8">
             <button className="flex items-center gap-2 text-gray-400 hover:text-emerald-600 font-bold transition-colors">
               <Download className="h-5 w-5" /> Download PDF
             </button>
             <button className="flex items-center gap-2 text-gray-400 hover:text-emerald-600 font-bold transition-colors">
               <Share2 className="h-5 w-5" /> Share Impact
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
