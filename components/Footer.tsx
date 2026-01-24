
import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { NGO_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-emerald-500" />
              <span className="text-2xl font-bold text-white">
                NGO<span className="text-emerald-500">Pro</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {NGO_INFO.mission}
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 hover:text-emerald-500 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-emerald-500 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-emerald-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#/about" className="hover:text-emerald-500 transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#/programs" className="hover:text-emerald-500 transition-colors">Programs</a>
              </li>
              <li>
                <a href="#/impact" className="hover:text-emerald-500 transition-colors">Transparency</a>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Get Involved</h3>
            <ul className="space-y-4">
              <li>
                <a href="#/volunteer" className="hover:text-emerald-500 transition-colors">Become a Volunteer</a>
              </li>
              <li>
                <a href="#/donate" className="hover:text-emerald-500 transition-colors">Make a Donation</a>
              </li>
              <li>
                <a href="#/contact" className="hover:text-emerald-500 transition-colors">Partner with Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>123 Global Mission Way, Suit 400, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>+1 (555) 000-NGO1</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>contact@ngopro.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} NGO Pro. All rights reserved. Registered 501(c)(3) nonprofit.</p>

          {/* Subtle Admin Portal Link */}
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
