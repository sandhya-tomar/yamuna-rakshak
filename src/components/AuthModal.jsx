// import { useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Loader2, X } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth.jsx';

// export default function AuthModal({ open, onClose }) {
//   const { signIn, signUp, resetPassword } = useAuth();
//   const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'forgot'
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [notice, setNotice] = useState(null);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setSubmitting(true);
//     setError(null);
//     setNotice(null);
//     try {
//       if (mode === 'signin') {
//         await signIn(email, password);
//         onClose();
//       } else if (mode === 'signup') {
//         await signUp(email, password, fullName);
//         setNotice('Check your email to confirm your account, then sign in.');
//         setMode('signin');
//       } else if (mode === 'forgot') {
//         await resetPassword(email);
//         setNotice('Check your email for a password reset link.');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.97 }}
//             onClick={(e) => e.stopPropagation()}
//             className="glass glass-border-gradient rounded-2xl p-8 w-full max-w-sm relative text-white"
//           >
//             <button
//               type="button"
//               onClick={onClose}
//               aria-label="Close"
//               className="absolute top-4 right-4 text-white/50 hover:text-white"
//             >
//               <X size={18} />
//             </button>

//             <h2 className="font-display text-2xl font-bold mb-1">
//               {mode === 'signin' && 'Welcome back'}
//               {mode === 'signup' && 'Join as a volunteer'}
//               {mode === 'forgot' && 'Reset your password'}
//             </h2>
//             <p className="text-white/50 text-sm mb-6">
//               {mode === 'signin' && 'Sign in to report spots and mark them cleaned.'}
//               {mode === 'signup' && 'Create an account to start reporting.'}
//               {mode === 'forgot' && "Enter your email and we'll send you a reset link."}
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {mode === 'signup' && (
//                 <input
//                   type="text"
//                   required
//                   placeholder="Full name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 placeholder-white/30 focus:outline-none focus:border-saffron"
//                 />
//               )}
//               <input
//                 type="email"
//                 required
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 placeholder-white/30 focus:outline-none focus:border-saffron"
//               />
//               {mode !== 'forgot' && (
//                 <input
//                   type="password"
//                   required
//                   minLength={6}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 placeholder-white/30 focus:outline-none focus:border-saffron"
//                 />
//               )}

//               {mode === 'signin' && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMode('forgot');
//                     setError(null);
//                     setNotice(null);
//                   }}
//                   className="text-xs text-white/40 hover:text-saffron -mt-2"
//                 >
//                   Forgot password?
//                 </button>
//               )}

//               {error && <p className="text-red-300 text-sm">{error}</p>}
//               {notice && <p className="text-emerald-light text-sm">{notice}</p>}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full flex items-center justify-center gap-2 bg-emerald disabled:opacity-60 text-white font-semibold py-2.5 rounded-full"
//               >
//                 {submitting && <Loader2 size={16} className="animate-spin" />}
//                 {mode === 'signin' && 'Sign in'}
//                 {mode === 'signup' && 'Create account'}
//                 {mode === 'forgot' && 'Send reset link'}
//               </button>
//             </form>

//             {mode === 'forgot' ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setMode('signin');
//                   setError(null);
//                   setNotice(null);
//                 }}
//                 className="text-sm text-white/50 hover:text-white mt-5 w-full text-center"
//               >
//                 Back to sign in
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setMode(mode === 'signin' ? 'signup' : 'signin');
//                   setError(null);
//                   setNotice(null);
//                 }}
//                 className="text-sm text-white/50 hover:text-white mt-5 w-full text-center"
//               >
//                 {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
//               </button>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Mail, Lock, User, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

export default function AuthModal({ open, onClose }) {
  const { signIn, signUp, resetPassword } = useAuth();

  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  function resetMessages() {
    setError(null);
    setNotice(null);
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    resetMessages();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);
    resetMessages();

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        onClose();
      }

      if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.');
        }

        await signUp(email, password, fullName);

        setNotice(
          'Account created. Check your email to confirm your account, then sign in.'
        );

        setPassword('');
        setConfirmPassword('');
        setMode('signin');
      }

      if (mode === 'forgot') {
        await resetPassword(email);
        setNotice('Check your email for a password reset link.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl overflow-hidden rounded-3xl bg-[#0d1d2b] border border-white/10 shadow-2xl text-white"
          >

            <div className="grid md:grid-cols-[0.85fr_1.15fr]">

              {/* LEFT SIDE */}
              <div className="hidden md:flex flex-col justify-between p-10 bg-[#10283b] border-r border-white/10">

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-light font-semibold">
                    Yamuna Rakshak
                  </p>

                  <h2 className="font-display text-4xl font-semibold tracking-tight mt-6 leading-tight">
                    Small actions.
                    <br />
                    <span className="text-saffron">
                      Real impact.
                    </span>
                  </h2>

                  <p className="text-white/55 text-sm leading-relaxed mt-5 max-w-xs">
                    Join the community working together to report, clean and
                    responsibly reuse waste around Mathura's Yamuna ghats.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-white/60">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald/15 text-emerald-light flex items-center justify-center">
                      ✓
                    </span>
                    Verified community reports
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald/15 text-emerald-light flex items-center justify-center">
                      ✓
                    </span>
                    Track cleanup progress
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald/15 text-emerald-light flex items-center justify-center">
                      ✓
                    </span>
                    Give useful materials a second life
                  </div>
                </div>

              </div>


              {/* RIGHT SIDE */}
              <div className="relative p-7 sm:p-10">

                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close"
                >
                  <X size={19} />
                </button>


                {/* HEADER */}
                <div className="pr-10">

                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-light font-semibold">
                    {mode === 'forgot'
                      ? 'Account recovery'
                      : mode === 'signin'
                        ? 'Welcome back'
                        : 'Join the community'}
                  </p>

                  <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-2">
                    {mode === 'signin' && 'Sign in'}
                    {mode === 'signup' && 'Create your account'}
                    {mode === 'forgot' && 'Reset your password'}
                  </h2>

                  <p className="text-white/45 text-sm mt-2">
                    {mode === 'signin' &&
                      'Sign in to report issues and help track cleanup.'}

                    {mode === 'signup' &&
                      'Create an account and become part of the movement.'}

                    {mode === 'forgot' &&
                      "Enter your email and we'll send you a reset link."}
                  </p>

                </div>


                {/* SIGN IN / SIGN UP TABS */}
                {mode !== 'forgot' && (
                  <div className="flex gap-1 mt-7 p-1 rounded-xl bg-white/5 border border-white/10">

                    <button
                      type="button"
                      onClick={() => changeMode('signin')}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                        mode === 'signin'
                          ? 'bg-white text-[#10283b]'
                          : 'text-white/45 hover:text-white'
                      }`}
                    >
                      Sign in
                    </button>

                    <button
                      type="button"
                      onClick={() => changeMode('signup')}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                        mode === 'signup'
                          ? 'bg-white text-[#10283b]'
                          : 'text-white/45 hover:text-white'
                      }`}
                    >
                      Create account
                    </button>

                  </div>
                )}


                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">

                  {/* FULL NAME */}
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-2">
                        Full name
                      </label>

                      <div className="relative">
                        <User
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                        />

                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-emerald-light/60 transition"
                        />
                      </div>
                    </div>
                  )}


                  {/* EMAIL */}
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2">
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                      />

                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-emerald-light/60 transition"
                      />
                    </div>
                  </div>


                  {/* PASSWORD */}
                  {mode !== 'forgot' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-white/60">
                          Password
                        </label>

                        {mode === 'signin' && (
                          <button
                            type="button"
                            onClick={() => changeMode('forgot')}
                            className="text-xs text-saffron hover:text-saffron-light transition"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>

                      <div className="relative">
                        <Lock
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                        />

                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-sm outline-none placeholder:text-white/25 focus:border-emerald-light/60 transition"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition"
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}


                  {/* CONFIRM PASSWORD */}
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-2">
                        Confirm password
                      </label>

                      <div className="relative">
                        <Lock
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                        />

                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-sm outline-none placeholder:text-white/25 focus:border-emerald-light/60 transition"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}


                  {/* FORGOT EMAIL */}
                  {mode === 'forgot' && (
                    <div className="text-xs text-white/35 bg-white/5 rounded-xl px-4 py-3">
                      We'll send a secure password reset link to this email
                      address.
                    </div>
                  )}


                  {/* ERROR */}
                  {error && (
                    <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}


                  {/* SUCCESS */}
                  {notice && (
                    <div className="rounded-xl border border-emerald/20 bg-emerald/10 px-4 py-3 text-sm text-emerald-light">
                      {notice}
                    </div>
                  )}


                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-emerald hover:bg-emerald/90 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
                  >
                    {submitting ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <ArrowRight size={17} />
                    )}

                    {mode === 'signin' && 'Sign in'}
                    {mode === 'signup' && 'Create account'}
                    {mode === 'forgot' && 'Send reset link'}
                  </button>

                </form>


                {/* BOTTOM ACTION */}
                <div className="mt-6 text-center">

                  {mode === 'forgot' ? (
                    <button
                      type="button"
                      onClick={() => changeMode('signin')}
                      className="text-sm text-white/45 hover:text-white transition"
                    >
                      ← Back to sign in
                    </button>
                  ) : (
                    <p className="text-sm text-white/40">
                      {mode === 'signin'
                        ? "Don't have an account?"
                        : 'Already have an account?'}

                      <button
                        type="button"
                        onClick={() =>
                          changeMode(
                            mode === 'signin'
                              ? 'signup'
                              : 'signin'
                          )
                        }
                        className="ml-1.5 text-saffron hover:text-saffron-light font-semibold transition"
                      >
                        {mode === 'signin'
                          ? 'Create one'
                          : 'Sign in'}
                      </button>
                    </p>
                  )}

                </div>

              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}