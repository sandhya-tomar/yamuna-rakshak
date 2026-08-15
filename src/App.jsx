import { useEffect, useState } from 'react';
import { useReports } from './hooks/useReports.js';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import { LanguageProvider } from './hooks/useLanguage.jsx';



import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Dashboard from './components/Dashboard.jsx';
import ReportForm from './components/ReportForm.jsx';
import RecentReports from './components/RecentReports.jsx';
import MapSection from './components/MapSection.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import SetNewPasswordModal from './components/SetNewPasswordModal.jsx';
import ReuseNetwork from './components/ReuseNetwork.jsx';
import MissionFlow from './components/MissionFlow.jsx';
import ProjectStory from './components/ProjectStory.jsx';
import Profile from './components/Profile.jsx';
import MyReports from './components/MyReports.jsx';
import ContactPage from './components/ContactPage.jsx';


function SiteContent({ onOpenAuth, onOpenAdmin }) {
  const { reports, loading, submitReport, markCleaned } = useReports();

  const [path, setPath] = useState(
    () => window.location.pathname === '/'
      ? '/'
      : window.location.pathname
  );


  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    const pop = () => setPath(window.location.pathname);

    window.addEventListener('popstate', pop);

    return () => {
      window.removeEventListener('popstate', pop);
    };
  }, []);


  return (
    <div className="min-h-screen bg-navy-950 text-white font-body overflow-x-hidden">

      <Navbar
        onOpenAuth={onOpenAuth}
        onOpenAdmin={onOpenAdmin}
        onNavigate={navigate}
        activePath={path}
      />


      {/* HOME */}
      {path === '/' && (
        <>
          <Hero
            onNavigate={navigate}
            reports={reports}
            loading={loading}
          />

          <MissionFlow />

          <ProjectStory onNavigate={navigate} />

          <section className="bg-[#f6f8f7] text-[#10283b]">
            <Dashboard
              reports={reports}
              loading={loading}
            />
          </section>
        </>
      )}


      {/* REPORT */}
      {path === '/report' && (
        <main className="relative pt-12 sm:pt-16">
          <ReportForm
            onSubmit={submitReport}
            onRequireAuth={onOpenAuth}
          />
        </main>
      )}


      {/* MAP */}
      {path === '/map' && (
        <main className="relative pt-24 sm:pt-28">
          <MapSection
            reports={reports}
          />
        </main>
      )}


      {/* REUSE NETWORK */}
      {path === '/reuse' && (
        <main className="relative pt-24 sm:pt-28">
          <ReuseNetwork />
        </main>
      )}


      {/* COMMUNITY ACTIVITY */}
      {path === '/activity' && (
        <main className="relative pt-24 sm:pt-28">
          <RecentReports
            reports={reports}
            loading={loading}
            onMarkCleaned={markCleaned}
            onRequireAuth={onOpenAuth}
          />
        </main>
      )}

      {/* PROFILE */}
{path === '/profile' && (
  <main className="relative pt-24 sm:pt-28">
    <Profile />
  </main>
)}


{/* MY REPORTS */}
{path === '/my-reports' && (
  <main className="relative pt-24 sm:pt-28">
    <MyReports reports={reports} />
  </main>
)}


      {/* CONTACT */}
      {path === '/contact' && (
        <main className="relative pt-24 sm:pt-28">
          <ContactPage
            onNavigate={navigate}
          />
        </main>
      )}


      <Footer />

    </div>
  );
}



function AdminRoute({ onBack }) {
  return <AdminPanel onBack={onBack} />;
}



function AppShell() {
  const [authOpen, setAuthOpen] = useState(false);
  const [view, setView] = useState('site');

  const {
    passwordRecovery,
    recoveryError
  } = useAuth();


  if (passwordRecovery) {
    return <SetNewPasswordModal />;
  }


  if (recoveryError) {
    return (
      <div className="fixed inset-0 z-[100] bg-navy-950 flex items-center justify-center p-4 text-white text-center">

        <div className="glass glass-border-gradient rounded-2xl p-8 max-w-sm">

          <h2 className="font-display text-xl font-bold mb-3">
            Link expired
          </h2>

          <p className="text-white/60 text-sm mb-6">
            {recoveryError}
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = window.location.origin;
            }}
            className="bg-emerald text-white font-semibold px-6 py-2.5 rounded-full"
          >
            Back to site
          </button>

        </div>

      </div>
    );
  }


  return (
    <>
      {view === 'admin' ? (
        <AdminRoute
          onBack={() => setView('site')}
        />
      ) : (
        <SiteContent
          onOpenAuth={() => setAuthOpen(true)}
          onOpenAdmin={() => setView('admin')}
        />
      )}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}



export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </LanguageProvider>
  );
}