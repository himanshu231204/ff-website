import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import SchedulePage from './pages/SchedulePage';
import LeaderboardPage from './pages/LeaderboardPage';
import KnockoutPage from './pages/KnockoutPage';
import WeaponsPage from './pages/WeaponsPage';
import BannedPage from './pages/BannedPage';
import RulesPage from './pages/RulesPage';
import content from './data/content';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col bg-pattern bg-grid">
        <Navbar />

        <main className="ui-shell flex-1">
          <div className="mx-auto w-full max-w-7xl ui-page">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/knockout" element={<KnockoutPage />} />
              <Route path="/weapons" element={<WeaponsPage />} />
              <Route path="/banned" element={<BannedPage />} />
              <Route path="/rules" element={<RulesPage />} />
            </Routes>
          </div>
        </main>

        <footer className="w-full border-t border-white/10 py-6 lg:py-8 flex-shrink-0 bg-black/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center">
            <p className="text-gray-500 text-sm">
              <span className="gradient-text font-semibold">{content.footer.text}</span> 
              <span className="text-gray-600"> © {content.footer.year}</span>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
