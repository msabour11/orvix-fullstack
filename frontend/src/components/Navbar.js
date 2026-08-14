import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/services', label: 'الخدمات' },
    { path: '/modules', label: 'الأنظمة' },
    { path: '/pricing', label: 'الباقات' },
    { path: '/portfolio', label: 'أعمالنا' },
    { path: '/contact', label: 'تواصل معنا' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-orvix-dark/95 backdrop-blur-lg shadow-lg border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orvix-primary to-orvix-green rounded-xl flex items-center justify-center text-white font-bold text-xl">
              O
            </div>
            <span className="text-xl font-bold text-white">ORVIX <span className="text-orvix-green text-sm font-normal">Solutions</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-orvix-green bg-orvix-green/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link to="/contact" className="btn-primary text-sm">ابدأ مشروعك</Link>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-orvix-navy border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-orvix-green bg-orvix-green/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="block btn-primary text-center mt-4">ابدأ مشروعك</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
