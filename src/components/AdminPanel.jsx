import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Loader2, Trash2, CheckCircle2, Search, ShieldAlert,
  Users, FileWarning, Sparkles, Clock, ImageOff,
} from 'lucide-react';
import { GHATS, CATEGORIES } from '../data/constants.js';
import { useAuth } from '../hooks/useAuth.jsx';
import {
  fetchProfiles, setProfileRoleLogged, fetchReportsForAdmin,
  deleteReportLogged, bulkDeleteReports, bulkMarkCleaned, fetchAuditLog,
} from '../lib/reportsApi.js';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'reports', label: 'Reports' },
  { id: 'volunteers', label: 'Volunteers & admins' },
  { id: 'activity', label: 'Activity log' },
];

function StatCard({ icon: Icon, label, value, tone = 'text-white' }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wide mb-2">
        <Icon size={14} /> {label}
      </div>
      <div className={`font-display text-3xl font-bold ${tone}`}>{value}</div>
    </div>
  );
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const AUDIT_LABEL = {
  delete_report: 'deleted a report',
  bulk_delete_reports: 'bulk-deleted reports',
  mark_cleaned: 'marked a report cleaned',
  bulk_mark_cleaned: 'bulk-marked reports cleaned',
  promote: 'promoted a volunteer to admin',
  demote: 'demoted an admin to volunteer',
};

export default function AdminPanel({ onBack }) {
  const { isAdmin, authLoading, user } = useAuth();

  const [tab, setTab] = useState('overview');
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [auditLog, setAuditLog] = useState([]);
  const [loadingAudit, setLoadingAudit] = useState(true);

  const [busyId, setBusyId] = useState(null);
  const [selected, setSelected] = useState(() => new Set());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | open | cleaned
  const [ghatFilter, setGhatFilter] = useState('all');

  function reloadReports() {
    setReportsLoading(true);
    fetchReportsForAdmin().then(setReports).catch(console.error).finally(() => setReportsLoading(false));
  }
  function reloadProfiles() {
    setLoadingProfiles(true);
    fetchProfiles().then(setProfiles).catch(console.error).finally(() => setLoadingProfiles(false));
  }
  function reloadAudit() {
    setLoadingAudit(true);
    fetchAuditLog().then(setAuditLog).catch(console.error).finally(() => setLoadingAudit(false));
  }

  useEffect(() => {
    if (!isAdmin) return;
    reloadReports();
    reloadProfiles();
    reloadAudit();
  }, [isAdmin]);

  const filteredReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reports.filter((r) => {
      if (statusFilter === 'open' && r.cleaned) return false;
      if (statusFilter === 'cleaned' && !r.cleaned) return false;
      if (ghatFilter !== 'all' && r.ghatId !== ghatFilter) return false;
      if (!q) return true;
      const ghatName = GHATS.find((g) => g.id === r.ghatId)?.name || r.ghatId;
      const catLabel = CATEGORIES.find((c) => c.id === r.category)?.label || r.category;
      return (
        ghatName.toLowerCase().includes(q) ||
        catLabel.toLowerCase().includes(q) ||
        (r.note || '').toLowerCase().includes(q) ||
        (r.reporterName || '').toLowerCase().includes(q)
      );
    });
  }, [reports, search, statusFilter, ghatFilter]);

  const stats = useMemo(() => {
    const total = reports.length;
    const cleaned = reports.filter((r) => r.cleaned).length;
    const open = total - cleaned;
    const rate = total ? Math.round((cleaned / total) * 100) : 0;
    const admins = profiles.filter((p) => p.role === 'admin').length;
    return { total, cleaned, open, rate, volunteers: profiles.length, admins };
  }, [reports, profiles]);

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleSelectAllVisible() {
    setSelected((prev) => {
      const allVisible = filteredReports.every((r) => prev.has(r.id));
      if (allVisible) return new Set();
      return new Set(filteredReports.map((r) => r.id));
    });
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this report permanently?')) return;
    setBusyId(id);
    try {
      await deleteReportLogged(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
      setSelected((prev) => { const n = new Set(prev); n.delete(id); return n; });
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  }

  async function handleBulkDelete() {
    const ids = [...selected];
    if (ids.length === 0) return;
    if (!window.confirm(`Delete ${ids.length} report(s) permanently?`)) return;
    setBusyId('bulk');
    try {
      await bulkDeleteReports(ids);
      setReports((prev) => prev.filter((r) => !selected.has(r.id)));
      setSelected(new Set());
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  }

  async function handleBulkMarkCleaned() {
    const ids = [...selected].filter((id) => !reports.find((r) => r.id === id)?.cleaned);
    if (ids.length === 0) return;
    setBusyId('bulk');
    try {
      await bulkMarkCleaned(ids, user?.id);
      setReports((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, cleaned: true } : r)));
      setSelected(new Set());
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  }

  async function handleRoleToggle(profile) {
    const nextRole = profile.role === 'admin' ? 'volunteer' : 'admin';
    setBusyId(profile.id);
    try {
      await setProfileRoleLogged(profile.id, nextRole);
      setProfiles((prev) => prev.map((p) => (p.id === profile.id ? { ...p, role: nextRole } : p)));
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  }

  // Guard: this view relies on RLS to actually protect data, but it
  // shouldn't render for non-admins even before the network calls fail.
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-6">
        <ShieldAlert className="text-red-400 mb-4" size={32} />
        <h1 className="font-display text-2xl font-bold mb-2">Admins only</h1>
        <p className="text-white/50 mb-6 max-w-sm">You don't have permission to view this page.</p>
        <button type="button" onClick={onBack} className="bg-emerald text-white font-semibold px-6 py-2.5 rounded-full">
          Back to site
        </button>
      </div>
    );
  }

  const selectedCount = selected.size;

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-16 text-white">
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white mb-8 text-sm">
        <ArrowLeft size={16} /> Back to site
      </button>

      <h1 className="font-display text-3xl font-bold mb-1">Admin panel</h1>
      <p className="text-white/50 mb-8">Moderate reports, manage volunteer roles, and review activity.</p>

      <div className="flex gap-1 border-b border-white/10 mb-10">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              tab === t.id ? 'text-saffron border-saffron' : 'text-white/40 border-transparent hover:text-white/70'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard icon={FileWarning} label="Total reports" value={stats.total} />
          <StatCard icon={FileWarning} label="Open" value={stats.open} tone="text-red-300" />
          <StatCard icon={CheckCircle2} label="Cleaned" value={stats.cleaned} tone="text-emerald-light" />
          <StatCard icon={Sparkles} label="Cleanup rate" value={`${stats.rate}%`} tone="text-saffron" />
          <StatCard icon={Users} label="Volunteers" value={stats.volunteers} />
          <StatCard icon={ShieldAlert} label="Admins" value={stats.admins} tone="text-saffron" />
        </div>
      )}

      {tab === 'reports' && (
        <section>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ghat, category, note, reporter…"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-saffron/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm"
            >
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="cleaned">Cleaned</option>
            </select>
            <select
              value={ghatFilter}
              onChange={(e) => setGhatFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm"
            >
              <option value="all">All ghats</option>
              {GHATS.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          {selectedCount > 0 && (
            <div className="flex items-center gap-3 bg-saffron/10 border border-saffron/30 rounded-xl px-4 py-2.5 mb-4 text-sm">
              <span className="font-semibold">{selectedCount} selected</span>
              <button
                type="button"
                onClick={handleBulkMarkCleaned}
                disabled={busyId === 'bulk'}
                className="flex items-center gap-1.5 text-emerald-light hover:text-emerald disabled:opacity-50 ml-auto"
              >
                <CheckCircle2 size={14} /> Mark cleaned
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                disabled={busyId === 'bulk'}
                className="flex items-center gap-1.5 text-red-300 hover:text-red-400 disabled:opacity-50"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}

          <div className="glass rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-white/40 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={filteredReports.length > 0 && filteredReports.every((r) => selected.has(r.id))}
                      onChange={toggleSelectAllVisible}
                    />
                  </th>
                  <th className="px-4 py-3 font-medium">Photo</th>
                  <th className="px-4 py-3 font-medium">Ghat</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Reporter</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {reportsLoading ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-white/40"><Loader2 className="animate-spin inline" /></td></tr>
                ) : filteredReports.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-white/40">No reports match.</td></tr>
                ) : filteredReports.map((r) => {
                  const ghat = GHATS.find((g) => g.id === r.ghatId);
                  const cat = CATEGORIES.find((c) => c.id === r.category);
                  return (
                    <tr key={r.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleSelect(r.id)} />
                      </td>
                      <td className="px-4 py-3">
                        {r.photo ? (
                          <img src={r.photo} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/20">
                            <ImageOff size={14} />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">{ghat?.name ?? r.ghatId}</td>
                      <td className="px-4 py-3">{cat ? `${cat.emoji} ${cat.label}` : r.category}</td>
                      <td className="px-4 py-3 text-white/60">{r.reporterName || 'Anonymous'}</td>
                      <td className="px-4 py-3">
                        <span className={r.cleaned ? 'text-emerald-light' : 'text-red-300'}>
                          {r.cleaned ? 'Cleaned' : 'Open'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(r.id)}
                          disabled={busyId === r.id}
                          className="text-white/40 hover:text-red-400 disabled:opacity-50"
                          aria-label="Delete report"
                        >
                          {busyId === r.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === 'volunteers' && (
        <section>
          {loadingProfiles ? (
            <p className="text-white/50 text-sm">Loading…</p>
          ) : (
            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="text-left text-white/40 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3">{p.full_name || '(no name set)'}</td>
                      <td className="px-4 py-3 capitalize">{p.role}</td>
                      <td className="px-4 py-3 text-right">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleRoleToggle(p)}
                          disabled={busyId === p.id}
                          className="text-xs font-semibold text-saffron hover:text-saffron-light disabled:opacity-50"
                        >
                          {p.role === 'admin' ? 'Make volunteer' : 'Make admin'}
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {tab === 'activity' && (
        <section>
          {loadingAudit ? (
            <p className="text-white/50 text-sm">Loading…</p>
          ) : auditLog.length === 0 ? (
            <p className="text-white/50 text-sm">No admin activity recorded yet.</p>
          ) : (
            <div className="glass rounded-2xl divide-y divide-white/5">
              {auditLog.map((entry) => (
                <div key={entry.id} className="px-4 py-3 flex items-center gap-3 text-sm">
                  <Clock size={14} className="text-white/30 shrink-0" />
                  <span>
                    <span className="font-semibold">{entry.actorName}</span>{' '}
                    <span className="text-white/60">
                      {AUDIT_LABEL[entry.action] || entry.action}
                      {entry.detail?.count ? ` (${entry.detail.count})` : ''}
                    </span>
                  </span>
                  <span className="ml-auto text-white/30 text-xs shrink-0">{timeAgo(entry.ts)}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
