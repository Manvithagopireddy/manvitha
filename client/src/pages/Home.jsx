import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, BookOpen, Trophy, Building2, Stethoscope, Briefcase, Scale } from 'lucide-react';
import api from '../api/axios';
import CollegeCard from '../components/ui/CollegeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const categories = [
  { name: 'Engineering', icon: <Building2 size={24} />, count: '2.5k+ Colleges', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { name: 'Medical', icon: <Stethoscope size={24} />, count: '800+ Colleges', color: 'bg-green-50 text-green-600 border-green-100' },
  { name: 'Management', icon: <Briefcase size={24} />, count: '3k+ Colleges', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { name: 'Law', icon: <Scale size={24} />, count: '600+ Colleges', color: 'bg-purple-50 text-purple-600 border-purple-100' },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredColleges, setFeaturedColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await api.get('/colleges');
        // Just take top 4 for the homepage featured section
        setFeaturedColleges(response.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch featured colleges:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden bg-white">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand/5 blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand font-medium text-sm mb-8">
              <Trophy size={16} /> #1 Education Discovery Platform
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Find Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-hover">College</span> <br /> Shape Your Future
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore 10,000+ top-ranked universities, compare fees, read authentic student reviews, and make the best choice for your career.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="glass p-2 pl-6 rounded-2xl flex items-center gap-4 max-w-3xl mx-auto shadow-xl shadow-gray-200/50">
              <Search className="text-gray-400 shrink-0" size={24} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for colleges, courses, or locations..."
                className="w-full bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 py-3 text-lg"
              />
              <button type="submit" className="btn btn-primary py-3 px-8 text-lg rounded-xl shrink-0">
                Search
              </button>
            </form>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-1.5"><MapPin size={16} /> 500+ Cities</span>
              <span className="flex items-center gap-1.5"><BookOpen size={16} /> 20k+ Courses</span>
              <span className="flex items-center gap-1.5"><Building2 size={16} /> 10k+ Colleges</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Top Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Browse institutions by your preferred field of study and find the perfect match for your career aspirations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border ${category.color} cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${category.color.split(' ')[0]}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm opacity-80 font-medium">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Colleges</h2>
              <p className="text-gray-600">Top-rated institutions highly recommended by students.</p>
            </div>
            <button onClick={() => navigate('/colleges')} className="hidden md:flex text-brand font-semibold hover:text-brand-hover items-center gap-1">
              View All Colleges &rarr;
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredColleges.map((college, idx) => (
                <motion.div
                  key={college._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <CollegeCard college={college} />
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-8 text-center md:hidden">
             <button onClick={() => navigate('/colleges')} className="btn btn-outline w-full py-3">
              View All Colleges
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Still Confused About Your Career?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
            Talk to our expert counselors. Get personalized guidance based on your academic profile, interests, and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn btn-primary py-3 px-8 text-lg w-full sm:w-auto">Get Free Counseling</button>
            <button className="btn border border-slate-700 text-white hover:bg-slate-800 py-3 px-8 text-lg w-full sm:w-auto">Take Career Test</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
