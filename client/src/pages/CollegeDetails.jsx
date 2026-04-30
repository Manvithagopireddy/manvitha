import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Share2, Heart, Download, Globe, CheckCircle2, ChevronRight, Award, IndianRupee, Users } from 'lucide-react';
import api from '../api/axios';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const tabs = ['Overview', 'Courses & Fees', 'Facilities', 'Reviews'];

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await api.get(`/colleges/${id}`);
        setCollege(response.data);
      } catch (error) {
        console.error("Failed to fetch college details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!college) return <div className="text-center py-20 text-xl font-bold">College not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <Link to="/" className="hover:text-brand">Home</Link> <ChevronRight size={14}/>
          <Link to="/colleges" className="hover:text-brand">Universities</Link> <ChevronRight size={14}/>
          <span className="text-gray-900 font-medium truncate">{college.name}</span>
        </div>
      </div>

      {/* Banner Section */}
      <div className="container mx-auto px-4 lg:px-8 mb-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <div className="h-64 md:h-80 w-full relative">
            <img 
              src={college.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
              alt={college.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white p-2 shadow-xl shrink-0">
                  <img 
                    src={college.logo || 'https://via.placeholder.com/100'} 
                    alt={`${college.name} logo`}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div className="text-white">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">{college.name}</h1>
                  <p className="flex items-center gap-1.5 opacity-90 text-sm md:text-base">
                    <MapPin size={16} /> {college.location}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 shrink-0">
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors"
                >
                  <Heart size={22} className={isSaved ? "fill-red-500 text-red-500" : ""} />
                </button>
                <button className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-brand transition-colors">
                  <Share2 size={22} />
                </button>
                <button 
                  onClick={() => toast.success('Application process started!')}
                  className="hidden md:flex btn bg-brand text-white hover:bg-brand-hover h-12 px-6 rounded-xl shadow-lg shadow-brand/30"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 border-t border-gray-100">
            <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                <Star className="fill-amber-500" size={18} />
                <span className="font-bold text-xl">{college.rating || '4.0'}</span>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Rating</span>
            </div>
            <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-gray-900 mb-1">
                <Award size={18} className="text-brand" />
                <span className="font-bold text-xl">#{college.rank || 'Top 100'}</span>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Ranking</span>
            </div>
            <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-gray-900 mb-1">
                <IndianRupee size={16} className="text-green-600" />
                <span className="font-bold text-xl">{(college.fees / 100000).toFixed(1)}L</span>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Avg. Fees/Yr</span>
            </div>
            <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-gray-900 mb-1">
                <Users size={18} className="text-blue-600" />
                <span className="font-bold text-xl">{college.type || 'Private'}</span>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Inst. Type</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:w-2/3 xl:w-3/4">
          {/* Sticky Tabs Nav */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-6 sticky top-20 z-40 overflow-x-auto">
            <div className="flex min-w-max gap-2">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all relative ${
                    activeTab === tab ? 'text-brand' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-brand/10 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* OVERVIEW TAB */}
                {activeTab === 'Overview' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About {college.name}</h2>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {college.description || `${college.name} is a premier educational institution located in ${college.location}. It is known for its excellent academic standards, state-of-the-art infrastructure, and outstanding placement records. The institution provides a conducive environment for learning and holistic development.`}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Highlights</h3>
                        <ul className="space-y-3">
                          <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">Established</span>
                            <span className="font-semibold text-gray-900">{college.established || 'N/A'}</span>
                          </li>
                          <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">Accreditation</span>
                            <span className="font-semibold text-gray-900">{college.accreditation || 'UGC Approved'}</span>
                          </li>
                          <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">Campus Size</span>
                            <span className="font-semibold text-gray-900">120 Acres</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-brand/5 rounded-2xl p-6 border border-brand/10">
                        <h3 className="font-bold text-brand mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-gray-700">
                            <Globe size={18} className="text-brand"/> <a href="#" className="hover:underline">www.officialwebsite.edu</a>
                          </li>
                          <li className="flex items-center gap-3 text-gray-700">
                            <MapPin size={18} className="text-brand"/> {college.location}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* COURSES TAB */}
                {activeTab === 'Courses & Fees' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses Offered</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="p-4 font-semibold rounded-tl-xl">Course Name</th>
                            <th className="p-4 font-semibold">Duration</th>
                            <th className="p-4 font-semibold">Total Fees</th>
                            <th className="p-4 font-semibold rounded-tr-xl">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {college.courses?.length > 0 ? (
                            college.courses.map((course, idx) => (
                              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 font-semibold text-gray-900">{course.name}</td>
                                <td className="p-4 text-gray-600">{course.duration}</td>
                                <td className="p-4 font-medium text-gray-900">₹{course.fees.toLocaleString()}</td>
                                <td className="p-4"><button onClick={() => toast.success('Downloading course info...')} className="text-brand font-medium hover:underline text-sm">Download Info</button></td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="p-4 font-semibold text-gray-900">B.Tech Computer Science</td>
                              <td className="p-4 text-gray-600">4 Years</td>
                              <td className="p-4 font-medium text-gray-900">₹{college.fees?.toLocaleString() || '1,50,000'}</td>
                              <td className="p-4"><button className="text-brand font-medium hover:underline text-sm">Download Info</button></td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* FACILITIES TAB */}
                {activeTab === 'Facilities' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Facilities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {(college.facilities || ['Library', 'Hostel', 'Cafeteria', 'Sports Complex', 'Gym', 'Wi-Fi Campus', 'Auditorium', 'Labs']).map((fac, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-brand/30 hover:bg-brand/5 transition-colors">
                          <CheckCircle2 className="text-brand" size={20} />
                          <span className="font-medium text-gray-800">{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === 'Reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
                      <button className="btn btn-outline text-sm">Write a Review</button>
                    </div>
                    
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-center gap-6 mb-8">
                      <div className="text-5xl font-black text-amber-500">{college.rating || '4.0'}</div>
                      <div>
                        <div className="flex gap-1 mb-1">
                          {[1,2,3,4,5].map(i => <Star key={i} size={18} className={i <= Math.floor(college.rating || 4) ? "fill-amber-400 text-amber-400" : "text-gray-300"}/>)}
                        </div>
                        <p className="text-gray-600 text-sm font-medium">Based on verified student reviews</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[1, 2].map((review) => (
                        <div key={review} className="border-b border-gray-100 pb-6 last:border-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-hover rounded-full text-white flex items-center justify-center font-bold">
                                S
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">Student {review}</h4>
                                <p className="text-xs text-gray-500">B.Tech CSE • Batch of 2024</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded font-bold text-sm">
                              <Star size={12} className="fill-amber-500 text-amber-500"/> 5.0
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            "Excellent campus life and great placement opportunities. The faculty is very supportive and the infrastructure is top-notch. Highly recommended for computer science aspirants."
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-20">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Interested in {college.name}?</h3>
            <button 
              onClick={() => toast.success('Application process started!')}
              className="btn btn-primary w-full py-3 mb-3 text-base shadow-lg shadow-brand/20"
            >
              Apply Now
            </button>
            <button 
              onClick={() => toast.success('Downloading brochure...')}
              className="btn w-full py-3 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 text-base mb-6 flex items-center justify-center gap-2"
            >
              <Download size={18}/> Download Brochure
            </button>
            
            <hr className="border-gray-100 mb-6" />
            
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Top Tags</h4>
            <div className="flex flex-wrap gap-2">
              {(college.tags || ['Engineering', 'Top Rated', 'Great Placements']).map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CollegeDetails;
