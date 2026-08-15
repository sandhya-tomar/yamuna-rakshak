import { useCallback, useEffect, useState } from 'react';
import { fetchReports, createReport, markReportCleaned, uploadPhoto, deleteReport } from '../lib/reportsApi.js';

export function useReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchReports();
      setReports(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

 const submitReport = useCallback(async ({ ghatId, category, note, photoBlob, userId, aiAnalysis }) => {
    const photoUrl = photoBlob ? await uploadPhoto(photoBlob) : null;
    const report = await createReport({ ghatId, category, note, photoUrl, userId, aiAnalysis });
    setReports((prev) => [report, ...prev]);
    return report;
  }, []);

  const markCleaned = useCallback(async (id, userId) => {
    const updated = await markReportCleaned(id, userId);
    setReports((prev) => prev.map((r) => (r.id === id ? updated : r)));
    return updated;
  }, []);

  const removeReport = useCallback(async (id) => {
    await deleteReport(id);
    setReports((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { reports, loading, error, submitReport, markCleaned, removeReport, reload: load };
}
