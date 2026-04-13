import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Calendar, Trophy, Swords, Crown, Target, Zap, Flame, Medal } from 'lucide-react';
import { players, calculateLeaderboard } from '../data/players';
import { groupAMatches, groupBMatches } from '../data/matches';
import content from '../data/content';

// ============================================
// STAT CARD - Equal Size Cards
// ============================================
function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="glass-card rounded-2xl p-5 sm:p-6 group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[140px]"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="text-white" size={22} />
        </div>
        <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl sm:text-4xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

// ============================================
// TOP PLAYER CARD - Equal Size Medal Cards
// ============================================
function TopPlayerCard({ player, rank }) {
  const getRankConfig = (rank) => {
    if (rank === 1) return { 
      gradient: 'from-yellow-500 via-yellow-400 to-amber-300', 
      bgGradient: 'from-yellow-500/20 to-amber-500/10',
      glow: 'shadow-[0_0_40px_rgba(234,179,8,0.3)]',
      icon: <Crown className="text-yellow-600" size={32} />,
      borderColor: 'border-yellow-500/30',
      badge: 'bg-yellow-500'
    };
    if (rank === 2) return { 
      gradient: 'from-gray-400 via-gray-300 to-gray-200', 
      bgGradient: 'from-gray-500/20 to-gray-300/10',
      glow: 'shadow-[0_0_30px_rgba(156,163,175,0.3)]',
      icon: <Medal className="text-gray-500" size={28} />,
      borderColor: 'border-gray-400/30',
      badge: 'bg-gray-400'
    };
    if (rank === 3) return { 
      gradient: 'from-amber-600 via-amber-500 to-amber-400', 
      bgGradient: 'from-amber-600/20 to-amber-500/10',
      glow: 'shadow-[0_0_30px_rgba(217,119,6,0.3)]',
      icon: <Medal className="text-amber-700" size={26} />,
      borderColor: 'border-amber-600/30',
      badge: 'bg-amber-600'
    };
    return {};
  };

  const config = getRankConfig(rank);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.15, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card rounded-2xl p-6 text-center relative overflow-hidden flex flex-col items-center justify-between min-h-[200px] ${config.glow} ${config.borderColor} border-2`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${config.bgGradient} to-transparent`} />
      
      {/* Rank Badge */}
      <div className={`absolute top-3 right-3 w-8 h-8 ${config.badge} rounded-full flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold text-sm">{rank}</span>
      </div>

      <div className="relative z-10 w-full">
        {/* Icon Circle */}
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
          {config.icon}
        </div>

        {/* Player Name */}
        <h3 className="text-lg font-bold text-white mb-1 truncate px-2">{player.name}</h3>
        
        {/* Group Badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          player.group === 'A' 
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
        }`}>
          {content.home.playerInfo.group} {player.group}
        </span>
      </div>

      {/* Score */}
      <div className="relative z-10 mt-4 w-full">
        <div className="bg-white/5 rounded-lg py-2 px-4 border border-white/10">
          <span className="text-gray-400 text-xs">{content.home.playerInfo.score}</span>
          <p className="text-yellow-400 font-bold text-xl">{player.finalScore}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// GROUP PLAYER ROW
// ============================================
function PlayerRow({ player, idx, group }) {
  const isGroupA = group === 'A';
  return (
    <motion.div 
      initial={{ opacity: 0, x: isGroupA ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + idx * 0.05 }}
      className="flex justify-between items-center py-3 px-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isGroupA ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
        }`}>
          {idx + 1}
        </span>
        <span className="text-gray-200 text-sm font-medium">{player.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs ${isGroupA ? 'text-blue-400' : 'text-purple-400'}`}>
          {content.home.playerInfo.level}{player.level}
        </span>
        <span className="text-yellow-400 font-bold text-sm">{player.finalScore}</span>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN HOMEPAGE COMPONENT
// ============================================
export default function HomePage() {
  // Calculate dynamic data
  const totalPlayers = players.length;
  const totalMatches = groupAMatches.length + groupBMatches.length;
  
  // Get top 3 by final score
  const groupAPlayers = players.filter(p => p.group === 'A');
  const groupBPlayers = players.filter(p => p.group === 'B');
  const sortedA = calculateLeaderboard(groupAPlayers);
  const sortedB = calculateLeaderboard(groupBPlayers);
  
  const allSorted = [...sortedA, ...sortedB].sort((a, b) => 
    parseFloat(b.finalScore) - parseFloat(a.finalScore)
  ).slice(0, 3);
  
  const groupA = players.filter(p => p.group === 'A');
  const groupB = players.filter(p => p.group === 'B');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-10 lg:space-y-14 pb-6"
    >
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center py-12 sm:py-16 lg:py-20 relative"
      >
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] lg:w-[700px] h-[200px] bg-gradient-to-r from-[#00F2FF]/15 via-[#7000FF]/15 to-[#00F2FF]/15 blur-[80px] -z-10" />
        
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F2FF]/10 border border-[#00F2FF]/30 rounded-full mb-6"
        >
          <Flame className="text-[#00F2FF] animate-pulse" size={16} />
          <span className="text-[#00F2FF] font-medium text-sm tracking-wide">{content.home.badge.text}</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4"
        >
          <span className="text-white">{content.home.title}</span>
          <br />
          <span className="gradient-text text-glow">{content.home.subtitle}</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 max-w-xl mx-auto mb-8"
        >
          {content.home.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/players">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 242, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-gradient-to-r from-[#00F2FF] to-[#7000FF] rounded-full font-bold text-white shadow-lg shadow-[#00F2FF]/25"
            >
              <span className="flex items-center gap-2">
                <Users size={18} />
                {content.home.buttons.viewPlayers}
              </span>
            </motion.button>
          </Link>
          <Link to="/leaderboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 glass-card rounded-full font-bold text-white border border-white/20 hover:border-[#00F2FF]/50"
            >
              <span className="flex items-center gap-2">
                <Trophy size={18} className="text-yellow-400" />
                {content.home.buttons.leaderboard}
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* ============================================ */}
      {/* STATS GRID - Equal Size Cards */}
      {/* ============================================ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard icon={Users} label={content.home.stats.players} value={totalPlayers} color="bg-gradient-to-br from-[#00F2FF] to-[#00D4E0]" delay={0.1} />
        <StatCard icon={Swords} label={content.home.stats.groups} value="2" color="bg-gradient-to-br from-[#7000FF] to-[#8B5CF6]" delay={0.15} />
        <StatCard icon={Calendar} label={content.home.stats.matches} value={totalMatches} color="bg-gradient-to-br from-pink-500 to-rose-500" delay={0.2} />
        <StatCard icon={Trophy} label={content.home.stats.rounds} value="3" color="bg-gradient-to-br from-yellow-500 to-orange-500" delay={0.25} />
      </div>

      {/* ============================================ */}
      {/* GROUPS SECTION - Equal Height Cards */}
      {/* ============================================ */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Group A */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="text-white" size={22} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{content.home.sections.groupA}</h2>
              <p className="text-gray-500 text-sm">{groupA.length} {content.home.stats.groups.toLowerCase()}</p>
            </div>
            <span className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-400 font-medium">
              {groupA.length} Players
            </span>
          </div>
          
          <div className="space-y-1 flex-1">
            {groupA.map((player, idx) => (
              <PlayerRow key={player.id} player={player} idx={idx} group="A" />
            ))}
          </div>
        </motion.div>

        {/* Group B */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="text-white" size={22} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{content.home.sections.groupB}</h2>
              <p className="text-gray-500 text-sm">{groupB.length} {content.home.stats.groups.toLowerCase()}</p>
            </div>
            <span className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-400 font-medium">
              {groupB.length} Players
            </span>
          </div>
          
          <div className="space-y-1 flex-1">
            {groupB.map((player, idx) => (
              <PlayerRow key={player.id} player={player} idx={idx} group="B" />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* TOP PLAYERS - 3 Equal Cards */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/5 to-purple-500/5 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <Trophy className="text-yellow-500" size={24} />
          <h2 className="text-xl sm:text-2xl font-bold text-white">{content.home.sections.topPlayers}</h2>
          <span className="ml-auto px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-400 font-medium">
            Top 3
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allSorted.map((player, idx) => (
            <TopPlayerCard key={player.id} player={player} rank={idx + 1} />
          ))}
        </div>
      </motion.div>

      {/* ============================================ */}
      {/* QUICK LINKS - Action Buttons */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4 pt-4"
      >
        <Link to="/schedule" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
          <Calendar size={18} />
          {content.home.quickLinks.schedule}
        </Link>
        <Link to="/weapons" className="px-6 py-3 bg-gradient-to-r from-[#00F2FF] to-[#7000FF] hover:from-[#00E5ED] hover:to-[#8B5CF6] rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#00F2FF]/20 hover:shadow-[#00F2FF]/40">
          <Swords size={18} />
          {content.home.quickLinks.weapons}
        </Link>
        <Link to="/banned" className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-500/20 hover:shadow-red-500/40">
          <Users size={18} />
          {content.home.quickLinks.banned}
        </Link>
      </motion.div>
    </motion.div>
  );
}