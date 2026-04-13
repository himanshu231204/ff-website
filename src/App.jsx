import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import SchedulePage from './pages/SchedulePage';
import LeaderboardPage from './pages/LeaderboardPage';
import KnockoutPage from './pages/KnockoutPage';
import WeaponsPage from './pages/WeaponsPage';
import BannedPage from './pages/BannedPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#050505] via-[#0a0a15] to-[#1A1B4B] bg-pattern bg-grid">
        <Navbar />

        <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/players" element={<PlayersPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/knockout" element={<KnockoutPage />} />
                <Route path="/weapons" element={<WeaponsPage />} />
                <Route path="/banned" element={<BannedPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>

        <footer className="w-full border-t border-white/10 py-6 lg:py-8 flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-gray-500 text-sm">
              <span className="gradient-text font-semibold">Free Fire Clash Squad Tournament</span> 
              <span className="text-gray-600"> © 2026</span>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
