
import React, { useState } from 'react';
import { api } from '../services/api';
import { Users, Send, CheckCircle } from 'lucide-react';

const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: 'Part-time (Remote)'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.applyVolunteer(formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20 px-4 bg-emerald-50 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-12 text-center">
          <CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Application Received!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for your interest in volunteering with NGO Pro. Our coordinator will review your skills and get in touch within 3-5 business days.
          </p>
          <a href="#/" className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="bg-emerald-600 text-white p-4 rounded-2xl inline-block mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold mb-6">Join Our Global Team</h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Volunteers are the backbone of our organization. Whether you're a student, professional, or retiree, your skills can help us reach more people.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Skill-Based Volunteering', desc: 'Contribute with professional skills like marketing, IT, or medical expertise.' },
                { title: 'Field Operations', desc: 'Participate in our on-ground distribution and awareness campaigns.' },
                { title: 'Remote Advocacy', desc: 'Help spread awareness and manage our digital outreach programs.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="w-1.5 h-auto bg-emerald-500 rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-8">Volunteer Application</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Phone</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Availability</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                  className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  <option>Part-time (Remote)</option>
                  <option>Full-time (On-field)</option>
                  <option>Weekends only</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Core Skills</label>
                <textarea
                  required
                  rows={4}
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="e.g., Teaching, First Aid, Web Development, Translation..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                Submit Application <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
