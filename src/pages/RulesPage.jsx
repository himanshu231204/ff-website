import { motion } from 'framer-motion';
import { Shield, Crosshair, UserX } from 'lucide-react';
import AllowedWeapons from '../components/AllowedWeapons';
import BannedCharacters from '../components/BannedCharacters';

export default function RulesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center py-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Shield className="text-white" size={32} />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="gradient-text">Tournament</span>
          <span className="text-white"> Rules</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Important regulations regarding allowed weapons and banned characters for this tournament
        </p>
      </motion.div>

      {/* Allowed Weapons Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AllowedWeapons />
      </motion.div>

      {/* Banned Characters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <BannedCharacters />
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Important Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <Crosshair className="text-purple-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-semibold text-white mb-1">Allowed Weapons</h4>
              <p className="text-gray-400 text-sm">
                Only weapons listed above are permitted for use in tournament matches. 
                Any unlisted weapon will result in immediate disqualification.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <UserX className="text-red-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-semibold text-white mb-1">Banned Characters</h4>
              <p className="text-gray-400 text-sm">
                All listed characters (both active and passive) are prohibited. 
                Teams using banned characters will face penalties.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
