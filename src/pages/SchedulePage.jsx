import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Swords, Zap, Target, Flame } from 'lucide-react';
import { groupAMatches, groupBMatches } from '../data/matches';
import MatchCard from '../components/MatchCard';
import content from '../data/content';

function MatchGroup({ title, matches, group, delayStart = 0 }) {
  const isGroupA = group === 'A';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delayStart, duration: 0.5 }}
      className="relative"
    >
      {/* Group Header with Icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
          isGroupA 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25' 
            : 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25'
        }`}>
          {isGroupA ? (
            <Target className="text-white" size={20} />
          ) : (
            <Zap className="text-white" size={20} />
          )}
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{matches.length} matches scheduled</p>
        </div>
        <div className={`ml-auto w-3 h-3 rounded-full ${isGroupA ? 'bg-blue-500' : 'bg-purple-500'} animate-pulse`} />
      </div>

      {/* Timeline Style - Connected Match Cards */}
      <div className="relative space-y-4">
        {/* Vertical Timeline Line */}
        <div className={`absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2 ${
          isGroupA ? 'bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent' : 'bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent'
        }`} />
        
        {matches.map((match, idx) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delayStart + 0.2 + idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 ${
              isGroupA ? 'bg-blue-500' : 'bg-purple-500'
            }`} style={{ marginTop: '-2rem' }}>
              <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                isGroupA ? 'bg-blue-400' : 'bg-purple-400'
              }`} />
            </div>
            
            {/* Match Card */}
            <MatchCard match={match} index={idx} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SchedulePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-10 lg:space-y-14"
    >
      {/* Premium Page Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center py-8 sm:py-10 lg:py-12 relative"
      >
        {/* Enhanced Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[200px] sm:h-[250px] bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 blur-[80px] sm:blur-[100px] -z-10" />
        
        {/* Premium Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-full mb-6"
        >
          <Flame className="text-orange-400 animate-pulse" size={16} />
          <span className="text-orange-400 font-medium text-sm">{content.schedule.badge}</span>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="inline-flex p-4 sm:p-5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-5 sm:mb-6 border border-white/10 shadow-2xl shadow-blue-500/10"
        >
          <Calendar className="text-blue-400" size={32} sm:size={44} />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
        >
          <span className="gradient-text">{content.schedule.title.split(' ')[0]}</span>
          <span className="text-white"> {content.schedule.title.split(' ').slice(1).join(' ')}</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-lg text-gray-400 max-w-xl mx-auto"
        >
          {content.schedule.description}
        </motion.p>
      </motion.div>

      {/* Match Schedule Grid - Enhanced Cards */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {/* Group A */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <MatchGroup title={content.schedule.groups.a} matches={groupAMatches} group="A" delayStart={0.15} />
          </div>
        </div>

        {/* Group B */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <MatchGroup title={content.schedule.groups.b} matches={groupBMatches} group="B" delayStart={0.25} />
          </div>
        </div>
      </div>

      {/* Tournament Format - Premium Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6 sm:p-7 lg:p-8 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl" />
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <Trophy className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{content.schedule.format.title}</h2>
            <p className="text-gray-500 text-sm">{content.schedule.format.groupStage.description}</p>
          </div>
        </div>

        {/* Format Cards */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 relative z-10">
          {/* Group Stage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
            <div className="relative glass-card rounded-2xl p-5 sm:p-6 text-center border border-white/5">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center border border-white/10">
                <Users className="text-blue-400" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{content.schedule.format.groupStage.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{content.schedule.format.groupStage.description}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 rounded-full">
                <span className="text-blue-400 font-bold">{groupAMatches.length + groupBMatches.length}</span>
                <span className="text-gray-400 text-xs">{content.schedule.format.groupStage.title}</span>
              </div>
            </div>
          </motion.div>

          {/* Semi Finals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-[#00F2FF] to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
            <div className="relative glass-card rounded-2xl p-5 sm:p-6 text-center border border-white/5">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-500/30 to-[#7000FF]/30 rounded-2xl flex items-center justify-center border border-white/10">
                <Swords className="text-cyan-400" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{content.schedule.format.semiFinals.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{content.schedule.format.semiFinals.description}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-full">
                <span className="text-cyan-400 font-bold">2</span>
                <span className="text-gray-400 text-xs">{content.schedule.format.semiFinals.title}</span>
              </div>
            </div>
          </motion.div>

          {/* Grand Final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
            <div className="relative glass-card rounded-2xl p-5 sm:p-6 text-center border border-white/5">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl flex items-center justify-center border border-white/10">
                <Trophy className="text-yellow-400" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{content.schedule.format.grandFinal.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{content.schedule.format.grandFinal.description}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 rounded-full">
                <span className="text-yellow-400 font-bold">1</span>
                <span className="text-gray-400 text-xs">{content.schedule.format.grandFinal.title}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
