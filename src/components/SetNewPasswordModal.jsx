import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

export default function SetNewPasswordModal() {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await updatePassword(password);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass glass-border-gradient rounded-2xl p-8 w-full max-w-sm text-white"
      >
        <h2 className="font-display text-2xl font-bold mb-1">Set a new password</h2>
        <p className="text-white/50 text-sm mb-6">
          You're signed in via your reset link. Choose a new password to finish.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            minLength={6}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 placeholder-white/30 focus:outline-none focus:border-saffron"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 placeholder-white/30 focus:outline-none focus:border-saffron"
          />

          {error && <p className="text-red-300 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-emerald disabled:opacity-60 text-white font-semibold py-2.5 rounded-full"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'Saving…' : 'Save new password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}