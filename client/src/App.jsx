import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CollegeList from './pages/CollegeList';
import CollegeDetails from './pages/CollegeDetails';
import Placeholder from './pages/Placeholder';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<CollegeList />} />
          <Route path="/colleges/:id" element={<CollegeDetails />} />
          <Route path="/courses" element={<Placeholder />} />
          <Route path="/admissions" element={<Placeholder />} />
          <Route path="/compare" element={<Placeholder />} />
          <Route path="/about" element={<Placeholder />} />
          <Route path="/contact" element={<Placeholder />} />
          <Route path="/faqs" element={<Placeholder />} />
          <Route path="/privacy" element={<Placeholder />} />
          <Route path="/terms" element={<Placeholder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
