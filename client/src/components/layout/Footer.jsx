import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group text-white mb-6">
              <div className="bg-brand p-2 rounded-xl">
                <GraduationCap size={24} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Shiksha<span className="text-brand">Plus</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your ultimate guide to finding the perfect college. Compare top universities, check fees, read reviews, and make informed decisions for your future.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-brand transition-colors text-sm font-semibold">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-brand transition-colors text-sm font-semibold">Facebook</a>
              <a href="#" className="text-slate-400 hover:text-brand transition-colors text-sm font-semibold">Instagram</a>
              <a href="#" className="text-slate-400 hover:text-brand transition-colors text-sm font-semibold">LinkedIn</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Top Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/colleges?category=engineering" className="hover:text-brand transition-colors">Engineering Colleges</Link></li>
              <li><Link to="/colleges?category=management" className="hover:text-brand transition-colors">Management Colleges</Link></li>
              <li><Link to="/colleges?category=medical" className="hover:text-brand transition-colors">Medical Colleges</Link></li>
              <li><Link to="/colleges?category=law" className="hover:text-brand transition-colors">Law Colleges</Link></li>
              <li><Link to="/colleges?category=design" className="hover:text-brand transition-colors">Design Colleges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Top Cities</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/colleges?city=hyderabad" className="hover:text-brand transition-colors">Colleges in Hyderabad</Link></li>
              <li><Link to="/colleges?city=bangalore" className="hover:text-brand transition-colors">Colleges in Bangalore</Link></li>
              <li><Link to="/colleges?city=delhi" className="hover:text-brand transition-colors">Colleges in Delhi</Link></li>
              <li><Link to="/colleges?city=pune" className="hover:text-brand transition-colors">Colleges in Pune</Link></li>
              <li><Link to="/colleges?city=mumbai" className="hover:text-brand transition-colors">Colleges in Mumbai</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support & Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
              <li><Link to="/faqs" className="hover:text-brand transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ShikshaPlus. All rights reserved.</p>
          <p>Designed for excellence in education discovery.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
