import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/players', label: 'Players' },
  { path: '/schedule', label: 'Schedule' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/weapons', label: 'Weapons' },
  { path: '/banned', label: 'Banned' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-card border-b border-white/10 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-9 h-9 bg-gradient-to-br from-[#00F2FF] to-[#7000FF] rounded-lg flex items-center justify-center shadow-lg shadow-[#00F2FF]/20"
            >
              <Zap className="text-white" size={20} />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white tracking-tight">
                <span className="text-[#00F2FF]">FF</span>
                <span className="text-gray-400"> Clash</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3 lg:px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group whitespace-nowrap"
                >
                  <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-[#00F2FF]/20 to-[#7000FF]/20 rounded-lg border border-[#00F2FF]/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.1), rgba(112, 0, 255, 0.1))',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation - Slide-in from top */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#00F2FF]/20 to-[#7000FF]/20 text-white border border-[#00F2FF]/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
