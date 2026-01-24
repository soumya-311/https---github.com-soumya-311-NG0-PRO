
import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.sendMessage(formData);
    setSent(true);
  };

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-600">Have questions? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                <Mail className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">Email Us</h4>
              <p className="text-gray-500 text-sm">support@ngopro.org</p>
              <p className="text-gray-500 text-sm">media@ngopro.org</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                <Phone className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">Call Us</h4>
              <p className="text-gray-500 text-sm">+1 (555) 000-NGO1</p>
              <p className="text-gray-500 text-sm">Mon - Fri: 9am - 6pm</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="bg-rose-100 text-rose-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">Office</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                123 Global Mission Way,<br />Suit 400, New York, NY 10001
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              {sent ? (
                <div className="text-center py-10 animate-in zoom-in">
                  <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Your Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Email</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
