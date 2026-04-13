import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Calendar, Trophy, Swords, Crown, Target, Zap, Flame, Medal } from 'lucide-react';
import { useTournamentData } from '../hooks/useTournamentData';
import content from '../data/content';

// ============================================
// STAT CARD - Equal Size Cards
// ============================================
function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="ui-card group cursor-pointer relative overflow-hidden min-h-[140px]"
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
      className={`ui-card text-center relative overflow-hidden flex flex-col items-center justify-between min-h-[200px] ${config.glow} ${config.borderColor} border-2`}
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
          <span className="text-gray-400 text-xs">Points / NKR</span>
          <p className="text-yellow-400 font-bold text-lg">{player.points} / {player.nkr}</p>
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
        <span className="text-yellow-400 font-bold text-sm">{player.points}p</span>
        <span className="text-cyan-300 font-semibold text-xs">NKR {player.nkr}</span>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN HOMEPAGE COMPONENT
// ============================================
export default function HomePage() {
  const { players, matches, getLeaderboard } = useTournamentData();
  const totalPlayers = players.length;
  const totalMatches = matches.length;

  const leaderboard = getLeaderboard(players);
  const groupA = leaderboard.filter((player) => player.group === 'A');
  const groupB = leaderboard.filter((player) => player.group === 'B');
  const topThree = leaderboard
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.nkr - a.nkr;
    })
    .slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ui-page space-y-10 mt-10 pb-6">
      <section className="ui-card relative overflow-hidden text-center py-10 sm:py-12">
        <div className="absolute inset-x-1/2 top-1/2 h-40 w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/15 via-violet-500/15 to-cyan-500/15 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="ui-header-badge mx-auto mb-6">
            <Flame className="text-[#00F2FF]" size={16} />
            <span className="text-sm font-medium text-[#00F2FF]">{content.home.badge.text}</span>
          </div>

          <h1 className="ui-title mb-4">
            <span className="text-white">{content.home.title}</span>
            <br />
            <span className="gradient-text text-glow">{content.home.subtitle}</span>
          </h1>

          <p className="ui-subtitle mx-auto mb-8">{content.home.description}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/players" className="ui-button px-8 py-3.5">
              <Users size={18} />
              {content.home.buttons.viewPlayers}
            </Link>
            <Link to="/leaderboard" className="ui-button ui-button-muted px-8 py-3.5">
              <Trophy size={18} className="text-yellow-400" />
              {content.home.buttons.leaderboard}
            </Link>
          </div>
        </div>
      </section>

      <section className="ui-grid ui-grid-4 mt-10">
        <StatCard icon={Users} label={content.home.stats.players} value={totalPlayers} color="from-cyan-500 to-sky-500" delay={0.05} />
        <StatCard icon={Swords} label={content.home.stats.groups} value="2" color="from-violet-500 to-purple-500" delay={0.1} />
        <StatCard icon={Calendar} label={content.home.stats.matches} value={totalMatches} color="from-pink-500 to-rose-500" delay={0.15} />
        <StatCard icon={Trophy} label={content.home.stats.rounds} value="3" color="from-amber-500 to-orange-500" delay={0.2} />
      </section>

      <section className="ui-grid ui-grid-2 mt-10">
        <div className="ui-card relative overflow-hidden">
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative z-10 mb-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
              <Target className="text-white" size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-white">{content.home.sections.groupA}</h2>
              <p className="text-sm text-gray-400">{groupA.length} players</p>
            </div>
          </div>
          <div className="relative z-10 space-y-3">
            {groupA.map((player, idx) => (
              <PlayerRow key={player.id} player={player} idx={idx} group="A" />
            ))}
          </div>
        </div>

        <div className="ui-card relative overflow-hidden">
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="relative z-10 mb-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/20">
              <Target className="text-white" size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-white">{content.home.sections.groupB}</h2>
              <p className="text-sm text-gray-400">{groupB.length} players</p>
            </div>
          </div>
          <div className="relative z-10 space-y-3">
            {groupB.map((player, idx) => (
              <PlayerRow key={player.id} player={player} idx={idx} group="B" />
            ))}
          </div>
        </div>
      </section>

      <section className="ui-card relative overflow-hidden mt-10">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-yellow-500/5 blur-3xl" />
        <div className="relative z-10 mb-6 flex items-center gap-3">
          <Trophy className="text-yellow-500" size={24} />
          <h2 className="text-xl sm:text-2xl font-bold text-white">{content.home.sections.topPlayers}</h2>
          <span className="ml-auto rounded-full border border-yellow-500/30 bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">Top 3</span>
        </div>
        <div className="ui-grid ui-grid-3">
          {topThree.map((player, idx) => (
            <TopPlayerCard key={player.id} player={player} rank={idx + 1} />
          ))}
        </div>
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link to="/schedule" className="ui-button px-6 py-3"><Calendar size={18} />{content.home.quickLinks.schedule}</Link>
        <Link to="/weapons" className="ui-button px-6 py-3"><Swords size={18} />{content.home.quickLinks.weapons}</Link>
        <Link to="/banned" className="ui-button ui-button-danger px-6 py-3"><Users size={18} />{content.home.quickLinks.banned}</Link>
      </div>
    </motion.div>
  );
}