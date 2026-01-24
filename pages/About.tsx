
import React from 'react';
import { NGO_INFO } from '../constants';
import { Target, Eye, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-emerald-600 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6">Our Story & Mission</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Providing pathways to success for those who need it most since 2010.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="About Us"
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Changing the world, one community at a time.</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {NGO_INFO.story}
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our approach is rooted in the belief that local problems require local solutions. We partner with grassroots organizations to ensure our impact is sustainable, measurable, and culturally sensitive.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-2xl">
                  <Target className="h-8 w-8 text-blue-600 mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Our Mission</h4>
                  <p className="text-sm text-gray-600">{NGO_INFO.mission}</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl">
                  <Eye className="h-8 w-8 text-emerald-600 mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Our Vision</h4>
                  <p className="text-sm text-gray-600">{NGO_INFO.vision}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">Recognition & Trust</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 flex flex-col items-center">
                <Award className="h-12 w-12 text-amber-500 mb-4" />
                <h5 className="font-bold text-gray-900">Charity Award 202{i}</h5>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">Certified Trusted</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
