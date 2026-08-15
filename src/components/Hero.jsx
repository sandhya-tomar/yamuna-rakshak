import { motion } from 'framer-motion';
import { ArrowRight, Camera, CheckCircle2, ClipboardList, Map as MapIcon } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';

export default function Hero({ onNavigate, reports, loading }) {
  const { t } = useLanguage();
  const total = reports.length;
  const cleaned = reports.filter((report) => report.cleaned).length;
  const open = reports.filter((report) => !report.cleaned && report.category !== 'clean').length;
  const stats = [
    { label: 'Reports shared', value: loading ? '—' : total, icon: ClipboardList },
    { label: 'Ghats cleaned', value: loading ? '—' : cleaned, icon: CheckCircle2 },
    { label: 'Open reports', value: loading ? '—' : open, icon: MapIcon },
  ];
  return <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#dcebe0] via-[#eef4ee] to-[#f7f8f3] text-[#152a35] pt-28 sm:pt-36">
  <div className="absolute -top-32 -right-20 w-[500px] h-[500px] rounded-full bg-[#337451]/15 blur-[100px] pointer-events-none" />
  <div className="absolute top-40 -left-32 w-[400px] h-[400px] rounded-full bg-[#1f8870]/10 blur-[100px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6"><div className="grid lg:grid-cols-[.9fr_1.1fr] min-h-[660px] lg:min-h-[690px] items-center gap-10 lg:gap-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="relative z-10 pt-10 lg:pt-0"><p className="text-[11px] font-bold uppercase tracking-[.17em] text-[#337451] mb-7">{t('hero.eyebrow')}</p><h1 className="font-display text-[clamp(3.7rem,6.2vw,6.6rem)] tracking-[-.065em] leading-[.84] font-semibold max-w-[560px]">{t('hero.titleLine1')}<br /><span className="text-[#337451]">{t('hero.titleHighlight')}</span></h1><p className="text-[#43535a] text-base sm:text-lg leading-relaxed mt-8 max-w-md">{t('hero.lede')}</p><div className="flex flex-wrap gap-3 mt-8"><button type="button" onClick={() => onNavigate('/report')} className="inline-flex items-center gap-2 rounded-md bg-[#337451] hover:bg-[#286044] px-5 py-3 text-sm font-semibold text-white transition-colors"><Camera size={16}/> {t('hero.reportBtn')} <ArrowRight size={16}/></button><button type="button" onClick={() => onNavigate('/map')} className="inline-flex items-center gap-2 rounded-md border border-[#75827d] px-5 py-3 text-sm font-semibold text-[#152a35] hover:bg-white transition-colors"><MapIcon size={16}/> {t('hero.mapBtn')}</button></div></motion.div>
      <div className="relative h-[440px] sm:h-[540px] lg:h-[640px] lg:-mr-24 overflow-hidden rounded-tl-[38%] rounded-bl-[14%] bg-[#dce6de] shadow-[0_18px_42px_rgba(28,53,45,.15)]"><video autoPlay muted loop playsInline poster="/hero.jpg" className="h-full w-full object-cover" aria-label="Yamuna river restoration"><source src="/yamuna-cinematic.mp4" type="video/mp4" /></video><div className="absolute inset-0 bg-[#12333d]/12" /><div className="absolute left-7 bottom-7 max-w-[205px] border-l-2 border-white pl-4 text-sm leading-relaxed text-white drop-shadow-md"></div></div>
    </div>
    <div className="relative z-20 mt-8 grid lg:grid-cols-[1fr_260px] overflow-hidden border border-[#dde3da] bg-white shadow-[0_14px_32px_rgba(27,45,35,.10)]"><div className="grid sm:grid-cols-3">{stats.map(({ label, value, icon: Icon }) => <div key={label} className="flex items-center gap-4 px-6 py-6 border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#e4e8e1]"><span className="h-10 w-10 rounded-full bg-[#edf4eb] text-[#337451] grid place-items-center"><Icon size={19}/></span><div><p className="font-heading text-2xl font-bold tracking-[-.04em] text-[#173b2b]">{value}</p><p className="text-sm text-[#627069] mt-0.5">{label}</p></div></div>)}</div><div className="bg-[#f0f4ee] px-6 py-6 flex items-center justify-between gap-4"><div><p className="font-heading font-semibold text-[#173b2b]">Be part of the change</p><p className="text-xs leading-relaxed text-[#627069] mt-1">Every report gives the river a stronger voice.</p></div><button type="button" onClick={() => onNavigate('/report')} className="shrink-0 text-sm font-semibold text-[#337451] hover:text-[#204d36]">Take action</button></div></div>
    </div>
  </section>;
}