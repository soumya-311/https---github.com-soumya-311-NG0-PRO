
import React from 'react';
import { MOCK_PROGRAMS } from '../constants';
import { ProgramStatus } from '../types';
import { CheckCircle, Activity, ArrowRight } from 'lucide-react';

const Programs: React.FC = () => {
  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore the diverse initiatives we undertake to drive systemic change and empower communities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_PROGRAMS.map((program) => (
            <div key={program.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 ${
                    program.status === ProgramStatus.ACTIVE 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {program.status === ProgramStatus.ACTIVE ? <Activity className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                    {program.status}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {program.description}
                </p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
                    View Impact <ArrowRight className="h-4 w-4" />
                  </button>
                  <a href="#/donate" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 hover:text-white transition-colors">
                    Support
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
