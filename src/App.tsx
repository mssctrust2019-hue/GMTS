import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Homepage sections
import { HeroSlider } from './components/home/HeroSlider';
import { LiveCounters } from './components/home/LiveCounters';
import { AboutGMTS } from './components/home/AboutGMTS';
import { CategoriesShowcase } from './components/home/CategoriesShowcase';
import { HowToParticipate } from './components/home/HowToParticipate';
import { PrizesSection } from './components/home/PrizesSection';
import { VideoGalleryPreview } from './components/home/VideoGalleryPreview';
import { Testimonials } from './components/home/Testimonials';
import { CallToAction } from './components/home/CallToAction';

// Main Application Pages
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { VideoGalleryPage } from './components/pages/VideoGalleryPage';
import { CategoriesPage } from './components/pages/CategoriesPage';
import { CertificateVerifyPage } from './components/pages/CertificateVerifyPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { SeoBlogPage } from './components/pages/SeoBlogPage';

// Interactive Modals
import { RegistrationModal } from './components/registration/RegistrationModal';
import { LoginModal } from './components/auth/LoginModal';
import { VotingModal } from './components/voting/VotingModal';
import { QuickInquiryModal } from './components/pages/QuickInquiryModal';
import { InvoiceModal } from './components/common/InvoiceModal';

const AppContent: React.FC = () => {
  const { currentPage, toasts, activeModal, setActiveModal, activeInvoice, setActiveInvoice, setLoginNotice } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Sticky Global Navbar */}
      <Navbar />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSlider />
            <LiveCounters />
            <AboutGMTS />
            <CategoriesShowcase />
            <HowToParticipate />
            <PrizesSection />
            <VideoGalleryPreview />
            <Testimonials />
            <CallToAction />
          </>
        )}

        {currentPage === 'dashboard' && <UserDashboard />}
        {currentPage === 'admin' && <AdminDashboard />}
        {currentPage === 'videos' && <VideoGalleryPage />}
        {currentPage === 'categories' && <CategoriesPage />}
        {currentPage === 'verify' && <CertificateVerifyPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'privacy' && <PrivacyPage />}
        {currentPage === 'blog' && <SeoBlogPage />}
      </main>

      {/* Global Modals */}
      <RegistrationModal />
      <LoginModal />
      <VotingModal />
      <QuickInquiryModal />
      {activeModal === 'invoice' && activeInvoice && (
        <InvoiceModal
          invoice={activeInvoice}
          onClose={() => {
            setActiveModal(null);
            setActiveInvoice(null);
          }}
          onGoToLogin={() => {
            setActiveModal('login');
            setActiveInvoice(null);
          }}
        />
      )}

      {/* Global Toast Notification System */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-3.5 rounded-2xl shadow-2xl text-xs font-semibold backdrop-blur-md border pointer-events-auto transition-all animate-bounce ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
                : toast.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/40'
                : 'bg-slate-900/90 text-pink-200 border-pink-500/40'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
