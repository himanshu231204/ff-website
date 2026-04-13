import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Clipboard, Gamepad2, Trophy, Medal, Crosshair, 
  UserX, Shield, Ban, Gavel, Calendar, ArrowRight,
  AlertTriangle, CheckCircle
} from 'lucide-react';
import content from '../data/content';

// Icon mapping
const getIcon = (iconName) => {
  const icons = {
    clipboard: Clipboard,
    gamepad: Gamepad2,
    trophy: Trophy,
    medal: Medal,
    crosshair: Crosshair,
    userX: UserX,
    shield: Shield,
    ban: Ban,
    gavel: Gavel,
  };
  const Icon = icons[iconName] || Clipboard;
  return <Icon size={24} />;
};

// Single Rule Item
function RuleItem({ text, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      className="flex items-start gap-3 py-2"
    >
      <CheckCircle className="text-[#00F2FF] flex-shrink-0 mt-0.5" size={16} />
      <span className="text-gray-300 text-sm leading-relaxed">{text}</span>
    </motion.div>
  );
}

// Rule Card
function RuleCard({ section, delay = 0 }) {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-yellow-500 to-orange-500',
    'from-green-500 to-emerald-500',
    'from-red-500 to-rose-500',
    'from-cyan-500 to-blue-500',
    'from-violet-500 to-purple-500',
    'from-amber-500 to-yellow-500',
    'from-indigo-500 to-blue-500',
  ];
  
  const colorIndex = Object.keys(content.rules.sections).indexOf(section.key);
  const gradient = colors[colorIndex % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      className="glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-${gradient.replace('from-', '').replace(' to-', '/')} opacity-10 rounded-full blur-2xl`} />

      {/* Header */}
      <div className="flex items-center gap-4 mb-5 relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <span className="text-white">{getIcon(section.value.icon)}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">{section.value.title}</h3>
      </div>

      {/* Rules List */}
      <div className="space-y-1 relative z-10">
        {section.value.rules.map((rule, idx) => (
          <RuleItem key={idx} text={rule} index={idx} />
        ))}
      </div>

      {/* Note if exists */}
      {section.value.note && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <div className="flex items-start gap-2 bg-yellow-500/10 p-3 rounded-lg">
            <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-yellow-300 text-sm">{section.value.note}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Main Page
export default function RulesPage() {
  const ruleSections = Object.entries(content.rules.sections);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 lg:space-y-10"
    >
      {/* Page Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center py-8 sm:py-10 lg:py-12 relative"
      >
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[150px] sm:h-[200px] bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-[60px] sm:blur-[80px] -z-10" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl mb-4 sm:mb-6 border border-yellow-500/20"
        >
          <Clipboard className="text-yellow-400" size={28} sm:size={40} />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 px-2"
        >
          <span className="text-yellow-400">{content.rules.title.split(' & ')[0]}</span>
          <span className="text-white"> & </span>
          <span className="gradient-text">{content.rules.title.split(' & ')[1]}</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-xl text-gray-400 max-w-xl mx-auto px-4"
        >
          {content.rules.description}
        </motion.p>
      </motion.div>

      {/* Rules Grid - 2 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {ruleSections.map(([key, section], index) => (
          <RuleCard 
            key={key} 
            section={{ key, value: section }} 
            delay={0.1 + index * 0.05}
          />
        ))}
      </div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-5 sm:p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="text-[#00F2FF]" size={20} />
          Related Pages
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link 
            to="/weapons" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00F2FF]/20 to-[#7000FF]/20 rounded-lg text-[#00F2FF] hover:from-[#00F2FF]/30 hover:to-[#7000FF]/30 transition-all"
          >
            <Crosshair size={16} />
            Allowed Weapons
            <ArrowRight size={14} />
          </Link>
          <Link 
            to="/banned" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-800/20 rounded-lg text-red-400 hover:from-red-500/30 hover:to-red-800/30 transition-all"
          >
            <UserX size={16} />
            Banned Characters
            <ArrowRight size={14} />
          </Link>
          <Link 
            to="/leaderboard" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg text-yellow-400 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all"
          >
            <Trophy size={16} />
            Leaderboard
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-gray-500 text-sm">
          For any queries, contact the tournament administrators.
        </p>
      </motion.div>
    </motion.div>
  );
}