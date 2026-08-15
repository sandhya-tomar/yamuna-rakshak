import { supabase } from './supabaseClient.js';

const TABLE = 'reports';
const BUCKET = 'report-photos';

function normalizeReport(row) {
  return {
    id: row.id,
    ghatId: row.ghat_id,
    category: row.category,
    note: row.note,
    photo: row.photo_url,
    cleaned: row.cleaned,
    ts: new Date(row.created_at).getTime(),
  };
}

export async function fetchReports() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) throw error;
  return data.map(normalizeReport);
}

export async function uploadPhoto(blob) {
  const path = `${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createReport({ ghatId, category, note, photoUrl, userId, aiAnalysis }) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      ghat_id: ghatId,
      category,
      note: note || null,
      photo_url: photoUrl || null,
      cleaned: category === 'clean',
      reported_by: userId,
      ai_analysis: aiAnalysis || null,
    })
    .select()
    .single();

  if (error) throw error;
  return normalizeReport(data);
}

export async function markReportCleaned(id, userId) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ cleaned: true, cleaned_at: new Date().toISOString(), cleaned_by: userId })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return normalizeReport(data);
}

export async function deleteReport(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

export async function fetchProfiles() {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function setProfileRole(id, role) {
  const { error } = await supabase.from('profiles').update({ role }).eq('id', id);
  if (error) throw error;
}

// --- Admin panel additions ---------------------------------------------

async function logAudit(action, targetType, targetId, detail) {
  const { data: authData } = await supabase.auth.getUser();
  const actorId = authData?.user?.id;
  if (!actorId) return; // best-effort; never block the real action on this
  const { error } = await supabase.from('admin_audit_log').insert({
    actor_id: actorId,
    action,
    target_type: targetType,
    target_id: targetId,
    detail: detail || null,
  });
  if (error) console.error('audit log write failed:', error);
}

// Same as fetchReports, but joins the reporter's name/role for the admin table.
export async function fetchReportsForAdmin() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, reporter:profiles!reports_reported_by_profiles_fkey(full_name, role)')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) throw error;
  return data.map((row) => ({
    ...normalizeReport(row),
    reportedBy: row.reported_by,
    reporterName: row.reporter?.full_name || null,
  }));
}

export async function deleteReportLogged(id) {
  await deleteReport(id);
  await logAudit('delete_report', 'report', id);
}

export async function bulkDeleteReports(ids) {
  const { error } = await supabase.from(TABLE).delete().in('id', ids);
  if (error) throw error;
  await logAudit('bulk_delete_reports', 'report', null, { ids, count: ids.length });
}

export async function bulkMarkCleaned(ids, userId) {
  const { error } = await supabase
    .from(TABLE)
    .update({ cleaned: true, cleaned_at: new Date().toISOString(), cleaned_by: userId })
    .in('id', ids);
  if (error) throw error;
  await logAudit('bulk_mark_cleaned', 'report', null, { ids, count: ids.length });
}

export async function setProfileRoleLogged(id, role) {
  await setProfileRole(id, role);
  await logAudit(role === 'admin' ? 'promote' : 'demote', 'profile', id, { newRole: role });
}

export async function fetchAuditLog(limit = 100) {
  const { data, error } = await supabase
    .from('admin_audit_log')
    .select('*, actor:profiles!admin_audit_log_actor_id_fkey(full_name)')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    action: row.action,
    targetType: row.target_type,
    targetId: row.target_id,
    detail: row.detail,
    actorName: row.actor?.full_name || 'Unknown',
    ts: new Date(row.created_at).getTime(),
  }));
}
