import { Recycle, ScanSearch, Sprout } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll.jsx';

const steps = [
  { icon: ScanSearch, number: '01', title: 'Report what you see', text: 'Document a river-side issue with its location, category, note, and an optional photo.' },
  { icon: Recycle, number: '02', title: 'Coordinate cleanup', text: 'Give volunteers and the public a clear view of reports and cleanup status at each ghat.' },
  { icon: Sprout, number: '03', title: 'Reuse what remains', text: 'Direct recoverable materials to the right community partner for a useful second life.' },
];

export default function MissionFlow() {
  return <section className="section-wash border-y border-[#d7dfd6] py-20 sm:py-24 text-[#10283b]"><div className="max-w-7xl mx-auto px-6"><RevealOnScroll><div className="grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-end"><div><p className="text-[11px] font-bold tracking-[.18em] uppercase text-[#2f7657]">How the platform works</p><h2 className="font-display text-4xl sm:text-5xl tracking-[-.04em] leading-[1.05] font-semibold mt-4">A practical path from report to restoration.</h2></div><p className="text-slate-600 leading-relaxed max-w-lg">Yamuna Rakshak connects local observations with cleanup visibility and responsible material recovery—so every action has a clear place in the larger effort.</p></div></RevealOnScroll><div className="grid md:grid-cols-3 border-t border-[#cfd9cf] mt-14">{steps.map(({ icon: Icon, number, title, text }, index) => <RevealOnScroll key={number} delay={index * .06}><article className="min-h-[220px] px-0 py-7 md:px-7 md:py-9 border-b md:border-b-0 border-[#cfd9cf] md:border-r last:border-r-0"><div className="flex justify-between items-start"><Icon size={25} strokeWidth={1.45} className="text-[#2f7657]"/><span className="text-xs font-semibold tracking-[.15em] text-slate-400">{number}</span></div><h3 className="font-heading text-xl font-semibold mt-14">{title}</h3><p className="text-sm leading-relaxed text-slate-600 mt-3 max-w-xs">{text}</p></article></RevealOnScroll>)}</div></div></section>;
}
