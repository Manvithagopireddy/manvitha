import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Menu, X, GraduationCap, Heart, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Universities', path: '/colleges' },
    { name: 'Admissions', path: '/admissions' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
              <GraduationCap size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Shiksha<span className="text-brand">Plus</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand relative ${
                  location.pathname === link.path ? 'text-brand' : 'text-gray-600'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-600 hover:text-brand transition-colors p-2">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-red-500 transition-colors p-2">
              <Heart size={20} />
            </button>
            <button className="flex items-center gap-2 btn btn-outline py-1.5 px-3">
              <User size={18} />
              <span className="text-sm">Log In</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-800 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4"
        >
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-brand/5 hover:text-brand"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-200" />
          <div className="flex justify-around py-2">
             <button className="text-gray-600 flex flex-col items-center gap-1">
              <Search size={20} />
              <span className="text-xs">Search</span>
            </button>
             <button className="text-gray-600 flex flex-col items-center gap-1">
              <Heart size={20} />
              <span className="text-xs">Saved</span>
            </button>
            <button className="text-brand flex flex-col items-center gap-1 font-medium">
              <User size={20} />
              <span className="text-xs">Log In</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
