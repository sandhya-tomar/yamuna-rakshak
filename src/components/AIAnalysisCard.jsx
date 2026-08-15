import { motion } from 'framer-motion';
import { Loader2, Sparkles, Users, Wrench } from 'lucide-react';

const SEVERITY_COLOR = {
  Low: 'text-emerald-light bg-emerald/15',
  Medium: 'text-saffron bg-saffron/15',
  High: 'text-red-300 bg-red-500/15',
};

export default function AIAnalysisCard({ loading, error, analysis }) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-white/50 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        <Loader2 size={15} className="animate-spin" /> Analyzing photo…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-white/40 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        AI analysis unavailable — you can still submit the report normally.
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-saffron">
          <Sparkles size={13} /> AI Analysis (estimate)
        </span>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${SEVERITY_COLOR[analysis.severity] || SEVERITY_COLOR.Low}`}>
          {analysis.severity} severity
        </span>
      </div>

      {analysis.items?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {analysis.items.map((item, i) => (
            <span key={i} className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-4 text-xs text-white/50 pt-1">
        <span>~{analysis.estimatedKg} kg estimated</span>
        <span className="flex items-center gap-1">
          <Users size={12} /> {analysis.recommendedVolunteers} volunteers suggested
        </span>
      </div>

      {analysis.recommendedEquipment?.length > 0 && (
        <div className="flex items-start gap-1.5 text-xs text-white/50">
          <Wrench size={12} className="mt-0.5 shrink-0" />
          <span>{analysis.recommendedEquipment.join(', ')}</span>
        </div>
      )}
    </motion.div>
  );
}