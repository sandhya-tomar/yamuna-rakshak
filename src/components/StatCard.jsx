import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, suffix = '', accent = 'saffron', comingSoon = false }) {
  const accentClasses = {
    saffron: 'text-saffron bg-saffron/10',
    emerald: 'text-emerald-light bg-emerald/10',
    river: 'text-blue-300 bg-river/20',
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative overflow-hidden"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${accentClasses[accent]}`}>
        <Icon size={20} />
      </div>
      <div className="font-heading text-3xl font-bold text-[#10283b] mb-1">
        {comingSoon ? (
          <span className="text-xl text-slate-400">Coming soon</span>
        ) : (
          <>
            {value}
            {suffix && <span className="text-lg text-slate-500 ml-1">{suffix}</span>}
          </>
        )}
      </div>
      <div className="text-sm text-slate-500">{label}</div>
    </motion.div>
  );
}
