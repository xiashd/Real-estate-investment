import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {BottomNav} from './components/layout/BottomNav';
import {HomeView} from './views/Home';
import {ProjectsView} from './views/Projects';
import {RecommendView} from './views/Recommend';
import {ProfileView} from './views/Profile';
import {ProjectDetailView} from './views/ProjectDetail';
import {ListingDetailView} from './views/ListingDetail';
import {ProjectListingListView} from './views/ProjectListingList';
import {AnimatePresence, motion} from 'motion/react';

function AppContent() {
  const location = useLocation();
  
  // Routes where bottom nav should be hidden (detail pages)
  const isDetailView = location.pathname.includes('/project/') || 
                       location.pathname.includes('/listing/');

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden shadow-gray-200">
      <AnimatePresence mode="wait">
        <motion.div
           key={location.pathname}
           initial={{opacity: 0, x: 10}}
           animate={{opacity: 1, x: 0}}
           exit={{opacity: 0, x: -10}}
           transition={{duration: 0.2}}
        >
          <Routes location={location}>
            <Route path="/" element={<HomeView />} />
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/recommend" element={<RecommendView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/project/:id" element={<ProjectDetailView />} />
            <Route path="/project/:projectId/listings" element={<ProjectListingListView />} />
            <Route path="/listing/:id" element={<ListingDetailView />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      
      {!isDetailView && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
