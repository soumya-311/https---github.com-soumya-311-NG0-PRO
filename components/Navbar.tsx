
import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#/' },
    { name: 'About', href: '#/about' },
    { name: 'Programs', href: '#/programs' },
    { name: 'Impact', href: '#/impact' },
    { name: 'Gallery', href: '#/gallery' },
    { name: 'Contact', href: '#/contact' },
    { name: 'Volunteer', href: '#/volunteer' },
    

  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#/" className="flex items-center gap-2 group">
              <div className="bg-emerald-600 p-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">NGO<span className="text-emerald-600">Pro</span></span>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#/donate"
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Donate Now
            </a>
            <a
              href="#/admin"
              className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Admin Login
            </a>
            
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg font-medium"
            >
              {link.name}
            </a>
          ))}
          
          <a
            href="#/donate"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-emerald-600 text-white py-3 rounded-lg font-bold"
          >
            Donate Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
