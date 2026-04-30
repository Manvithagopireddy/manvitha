import { Link } from 'react-router-dom';
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const CollegeCard = ({ college }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={college.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          {college.rating || '4.0'}
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors shadow-sm"
        >
          <Heart size={18} className={isSaved ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-bold text-lg leading-tight text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
            {college.name}
          </h3>
          {college.logo && (
            <img src={college.logo} alt="logo" className="w-8 h-8 rounded border border-gray-100 object-contain bg-white" />
          )}
        </div>
        
        <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-4">
          <MapPin size={14} />
          {college.location}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {college.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
              {tag}
            </span>
          ))}
          {college.type && (
            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 text-xs font-medium rounded-md">
              {college.type}
            </span>
          )}
        </div>

        <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Approx. Fees</p>
            <p className="font-bold text-gray-900">
              ₹{(college.fees / 100000).toFixed(1)}L <span className="text-xs font-normal text-gray-500">/yr</span>
            </p>
          </div>
          <Link 
            to={`/colleges/${college._id}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover"
          >
            Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CollegeCard;
