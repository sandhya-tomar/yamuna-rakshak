import { ClipboardList, Droplet, Trash2, Users } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll.jsx';
import StatCard from './StatCard.jsx';
import AnimatedCounter from './AnimatedCounter.jsx';

export default function Dashboard({ reports, loading }) {
  const total = reports.length;
  const cleaned = reports.filter((r) => r.cleaned).length;
  const open = reports.filter((r) => !r.cleaned && r.category !== 'clean').length;

  return (
    <section id="dashboard" className="max-w-7xl mx-auto px-6 py-24">
      <RevealOnScroll>
        <span className="font-heading text-xs tracking-[0.2em] uppercase text-saffron">Live data</span>
        <h2 className="font-display text-4xl font-bold mt-2 mb-3">River Status Dashboard</h2>
        <p className="text-slate-600 max-w-xl mb-10">
          Live counts from community reports. Waste-weight, volunteer, and water-quality tracking
          are next — see the note below.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <RevealOnScroll delay={0}>
          <StatCard
            icon={ClipboardList}
            label="Total Reports"
            accent="saffron"
            value={<AnimatedCounter value={loading ? 0 : total} />}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.08}>
          <StatCard
            icon={Trash2}
            label="Ghats Cleaned"
            accent="emerald"
            value={<AnimatedCounter value={loading ? 0 : cleaned} />}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.16}>
          <StatCard
            icon={Droplet}
            label="Still Open"
            accent="river"
            value={<AnimatedCounter value={loading ? 0 : open} />}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.24}>
          <StatCard icon={Users} label="Active Volunteers" comingSoon />
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.3}>
        <p className="text-xs text-slate-500 mt-6 max-w-2xl">
          
        </p>
      </RevealOnScroll>
    </section>
  );
}
