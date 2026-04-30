import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Grid, List as ListIcon, MapPin, CheckCircle2 } from 'lucide-react';
import api from '../api/axios';
import CollegeCard from '../components/ui/CollegeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const CollegeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [viewMode, setViewMode] = useState('grid');
  
  // Filters State
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  
  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const response = await api.get('/colleges');
      setColleges(response.data);
    } catch (error) {
      console.error("Failed to fetch colleges", error);
    } finally {
      setLoading(false);
    }
  };

  // Derived filters from data
  const availableTypes = [...new Set(colleges.map(c => c.type).filter(Boolean))];
  const availableLocations = [...new Set(colleges.map(c => c.location.split(',')[0].trim()).filter(Boolean))].slice(0, 5);

  const toggleFilter = (setter, state, value) => {
    if (state.includes(value)) {
      setter(state.filter(item => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  // Filter Logic
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          college.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(college.type);
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.some(loc => college.location.includes(loc));
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white pt-12 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Colleges</h1>
          <p className="text-slate-400 max-w-2xl text-lg">Browse through our comprehensive list of top colleges, universities, and institutions. Filter by your preferences to find the perfect match.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="glass rounded-2xl p-6 sticky top-24 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h2 className="font-bold text-lg flex items-center gap-2"><Filter size={18}/> Filters</h2>
                <button 
                  onClick={() => { setSelectedTypes([]); setSelectedLocations([]); setSearchQuery(''); setSearchParams({}); }}
                  className="text-xs text-brand font-medium hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Institution Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Institution Type</h3>
                <div className="space-y-2.5">
                  {availableTypes.map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-brand border-brand' : 'border-gray-300 group-hover:border-brand'}`}>
                        {selectedTypes.includes(type) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className="text-gray-700 text-sm group-hover:text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Top Locations</h3>
                <div className="space-y-2.5">
                  {availableLocations.map(loc => (
                    <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedLocations.includes(loc) ? 'bg-brand border-brand' : 'border-gray-300 group-hover:border-brand'}`}>
                        {selectedLocations.includes(loc) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className="text-gray-700 text-sm group-hover:text-gray-900">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Search & Toolbar */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by college or city..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
                />
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm font-medium text-gray-500">
                  <span className="text-gray-900">{filteredColleges.length}</span> Results
                </span>
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-brand' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <ListIcon size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <LoadingSpinner />
            ) : filteredColleges.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No colleges found</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any colleges matching your current filters. Try adjusting your search criteria.</p>
                <button 
                  onClick={() => { setSelectedTypes([]); setSelectedLocations([]); setSearchQuery(''); }}
                  className="mt-6 btn btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredColleges.map((college, idx) => (
                  <motion.div
                    key={college._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    layout
                  >
                    <CollegeCard college={college} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeList;
