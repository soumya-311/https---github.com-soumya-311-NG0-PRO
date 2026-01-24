
import React from 'react';
import { NGO_INFO } from '../constants';
import { ArrowRight, Users, Heart, Globe, Calendar } from 'lucide-react';
import { api } from '../services/api';

const Home: React.FC = () => {
  const stats = [
    { label: 'People Helped', value: NGO_INFO.impactStats.livesImpacted.toLocaleString() + '+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Funds Utilized', value: '$' + (NGO_INFO.impactStats.fundsRaised / 1000000).toFixed(1) + 'M', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Active Volunteers', value: NGO_INFO.impactStats.volunteersActive.toString(), icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Events Held', value: '150+', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const announcements = api.getAnnouncements().filter(a => a.isActive).slice(0, 1);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 text-center">
          {announcements.length > 0 && (
            <div className="inline-flex items-center gap-3 bg-emerald-800/80 backdrop-blur px-5 py-2 rounded-full text-sm font-medium mb-10 border border-emerald-700">
              <span className="bg-emerald-500 text-xs px-2 py-0.5 rounded-full uppercase">Update</span>
              {announcements[0].content}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Changing Lives <span className="text-emerald-400">Together.</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            {NGO_INFO.mission}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="#/donate" 
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              Start Donating <ArrowRight className="h-5 w-5" />
            </a>
            <a 
              href="#/volunteer" 
              className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 rounded-full font-bold text-lg transition-all shadow-md flex items-center justify-center"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 -mt-20 relative z-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick About */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Our Commitment</h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">
                Every contribution fuels a brighter future for those who need it most.
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We focus on high-impact, transparent solutions. From emergency relief to long-term development, we ensure that every dollar is maximized for social good.
              </p>
              <div className="space-y-4">
                {[
                  "100% Transparency in Fund Allocation",
                  "Direct Field Impact without Middlemen",
                  "Community-Led Sustainable Development",
                  "Regular Reporting and Audited Success"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 rounded-full p-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-emerald-600 absolute -inset-4 rounded-3xl -rotate-2 -z-10 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Impact" 
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Ready to make a difference?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-left group transition-transform hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <Heart className="h-6 w-6" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Donate Monthly</h4>
              <p className="text-gray-600 mb-6">Support our long-term projects and ensure consistent growth for communities.</p>
              <a href="#/donate" className="text-rose-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Learn more <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-left group transition-transform hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Join as Volunteer</h4>
              <p className="text-gray-600 mb-6">Use your skills to help on the ground or remotely in our various programs.</p>
              <a href="#/volunteer" className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Apply now <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
