import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Calendar, Trophy, Swords, Crown, Target, Zap, Flame, ChevronRight } from 'lucide-react';
import { players } from '../data/players';

function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="glass-card rounded-2xl p-4 sm:p-5 group cursor-pointer relative overflow-hidden"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl ${color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="text-white" size={18} />
        </div>
        <p className="text-gray-500 text-xs sm:text-sm mb-1 font-medium">{label}</p>
        <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

function TopPlayerCard({ player, rank }) {
  const getRankConfig = (rank) => {
    if (rank === 1) return { 
      gradient: 'from-yellow-500 via-yellow-400 to-amber-300', 
      glow: 'shadow-[0_0_30px_rgba(234,179,8,0.4)]',
      icon: <Crown className="crown-glow text-white" size={16} />,
      height: 'h-16 sm:h-20 lg:h-24'
    };
    if (rank === 2) return { 
      gradient: 'from-gray-400 via-gray-300 to-gray-200', 
      glow: 'shadow-[0_0_20px_rgba(156,163,175,0.3)]',
      icon: <span className="text-gray-700 font-bold text-sm">2</span>,
      height: 'h-12 sm:h-16 lg:h-20'
    };
    if (rank === 3) return { 
      gradient: 'from-amber-600 via-amber-500 to-amber-400', 
      glow: 'shadow-[0_0_20px_rgba(217,119,6,0.3)]',
      icon: <span className="text-amber-800 font-bold text-sm">3</span>,
      height: 'h-10 sm:h-14 lg:h-16'
    };
    return { 
      gradient: 'from-[#00F2FF] via-[#00D4E0] to-[#7000FF]', 
      glow: 'shadow-lg',
      icon: <span className="text-white font-bold text-xs sm:text-sm">{rank}</span>,
      height: 'h-10 sm:h-12 lg:h-14'
    };
  };

  const config = getRankConfig(rank);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.15, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 group hover:bg-white/10 transition-all duration-300 ${config.glow}`}
    >
      <div className={`w-10 sm:w-12 ${config.height} rounded-xl sm:rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white text-sm sm:text-base truncate group-hover:text-[#00F2FF] transition-colors duration-300">{player.name}</p>
        <p className="text-xs sm:text-sm text-gray-500">Level {player.level} • Group {player.group}</p>
      </div>
      <ChevronRight className="text-gray-600 group-hover:text-[#00F2FF] transition-colors duration-300 flex-shrink-0" size={18} />
    </motion.div>
  );
}

export default function HomePage() {
  const topPlayers = [...players].sort((a, b) => b.level - a.level).slice(0, 3);
  
  const groupA = players.filter(p => p.group === 'A');
  const groupB = players.filter(p => p.group === 'B');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12 lg:space-y-20"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center py-10 sm:py-14 lg:py-20 relative"
      >
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[600px] h-[150px] sm:h-[200px] lg:h-[300px] bg-gradient-to-r from-[#00F2FF]/10 via-[#7000FF]/10 to-[#00F2FF]/10 blur-[60px] sm:blur-[80px] lg:blur-[100px] -z-10" />
        
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#00F2FF]/10 border border-[#00F2FF]/30 rounded-full mb-6 sm:mb-8"
        >
          <Flame className="text-[#00F2FF] animate-pulse" size={16} />
          <span className="text-[#00F2FF] font-medium text-xs sm:text-sm tracking-wide">Live Tournament</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2"
        >
          <span className="text-white">Free Fire</span>
          <br />
          <span className="gradient-text text-glow">Clash Squad Tournament</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-xl text-gray-400 max-w-xl lg:max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
        >
          Experience the ultimate battle royale competition with a premium esports dashboard
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4"
        >
          <Link to="/players">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 242, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00F2FF] to-[#7000FF] rounded-xl font-bold text-white shadow-lg shadow-[#00F2FF]/25 btn-glow relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                <Users size={18} />
                View Players
              </span>
            </motion.button>
          </Link>
          <Link to="/leaderboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 glass-card rounded-xl font-bold text-white border border-white/20 hover:border-[#00F2FF]/50 hover:bg-white/10 transition-all duration-300"
            >
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <Trophy size={18} className="text-yellow-400" />
                Leaderboard
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Users} label="Total Players" value="10" color="bg-gradient-to-br from-[#00F2FF] to-[#00D4E0]" delay={0.1} />
        <StatCard icon={Swords} label="Groups" value="2" color="bg-gradient-to-br from-[#7000FF] to-[#8B5CF6]" delay={0.2} />
        <StatCard icon={Calendar} label="Matches" value="20" color="bg-gradient-to-br from-pink-500 to-rose-500" delay={0.3} />
        <StatCard icon={Trophy} label="Rounds" value="3" color="bg-gradient-to-br from-yellow-500 to-orange-500" delay={0.4} />
      </div>

      {/* Groups Section */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl" />
          
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Target className="text-white" size={18} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Group A</h2>
            <span className="ml-auto px-2 sm:px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs sm:text-sm text-blue-400 font-medium">{groupA.length} Players</span>
          </div>
          <div className="space-y-2">
            {groupA.map((player, idx) => (
              <motion.div 
                key={player.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                className="flex justify-between items-center py-2 sm:py-3 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="w-5 sm:w-6 h-5 sm:h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xs sm:text-sm font-medium">{idx + 1}</span>
                  <span className="text-gray-300 text-sm">{player.name}</span>
                </div>
                <span className="text-blue-400 font-medium text-sm">Lv.{player.level}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl" />
          
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Target className="text-white" size={18} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Group B</h2>
            <span className="ml-auto px-2 sm:px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs sm:text-sm text-purple-400 font-medium">{groupB.length} Players</span>
          </div>
          <div className="space-y-2">
            {groupB.map((player, idx) => (
              <motion.div 
                key={player.id} 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                className="flex justify-between items-center py-2 sm:py-3 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="w-5 sm:w-6 h-5 sm:h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-xs sm:text-sm font-medium">{idx + 1}</span>
                  <span className="text-gray-300 text-sm">{player.name}</span>
                </div>
                <span className="text-purple-400 font-medium text-sm">Lv.{player.level}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Players Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-2xl p-4 sm:p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-[#00F2FF]/5 to-[#7000FF]/5 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-3 mb-4 sm:mb-6 relative z-10">
          <Trophy className="text-yellow-500" size={20} />
          <h2 className="text-lg sm:text-xl font-bold text-white">Top Players</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {topPlayers.map((player, idx) => (
            <TopPlayerCard key={player.id} player={player} rank={idx + 1} />
          ))}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4"
      >
        <Link to="/schedule" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2">
          <Calendar size={16} />
          View Schedule
        </Link>
        <Link to="/weapons" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#00F2FF] to-[#7000FF] hover:from-[#00E5ED] hover:to-[#8B5CF6] rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2">
          <Swords size={16} />
          Allowed Weapons
        </Link>
        <Link to="/banned" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2">
          <Users size={16} />
          Banned Characters
        </Link>
      </motion.div>
    </motion.div>
  );
}
