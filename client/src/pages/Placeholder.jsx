import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Placeholder = () => {
  const location = useLocation();
  const path = location.pathname.substring(1).replace('-', ' ');
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass max-w-lg w-full p-12 rounded-3xl text-center shadow-xl shadow-gray-200/50"
      >
        <div className="bg-brand/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <Construction className="text-brand w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {title || 'Page'}
        </h1>
        
        <p className="text-gray-500 mb-10 text-lg">
          We are currently building out the amazing {title} experience. Check back soon!
        </p>
        
        <Link 
          to="/" 
          className="btn btn-primary py-3 px-8 rounded-xl inline-flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Placeholder;
