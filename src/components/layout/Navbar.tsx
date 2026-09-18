import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Phone,
  MessageCircle,
  Award,
  LogIn,
  CreditCard,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  User,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORY_GROUPS, GMTS_COMPANY_INFO } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentPage,
    setCurrentPage,
    setActiveModal,
    setSelectedCategory,
    switchUserRole
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentPage('gallery');
    }
  };

  const handleCategorySelect = (groupName: string) => {
    setSelectedCategory(groupName);
    setCategoriesDropdownOpen(false);
    setCurrentPage('gallery');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-pink-500/20 shadow-xl">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-pink-900 via-rose-900 to-purple-950 text-white text-xs py-1.5 px-4 border-b border-pink-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-pink-200">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live Auditions: Round 1 Open for Ages 5–85 (Perpetual Season)
            </span>
            <span className="hidden md:inline text-pink-300/80">|</span>
            <span className="hidden md:flex items-center gap-1 text-pink-200">
              <Phone className="w-3 h-3 text-pink-300" />
              Helpline: {GMTS_COMPANY_INFO.helpline} (Ahmedabad, Gujarat)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <a
              href={`https://wa.me/919157697394?text=${encodeURIComponent('Hello GMTS Team, I want to participate in Global Multitalent Show.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>

            <div className="flex items-center gap-1.5 bg-slate-900/60 rounded px-2 py-0.5 border border-pink-500/30">
              <span className="text-slate-400">Mode:</span>
              <button
                onClick={() => switchUserRole(currentUser?.role === 'admin' ? 'distributor' : 'admin')}
                className="text-pink-300 hover:text-pink-200 font-semibold underline"
              >
                {currentUser?.role === 'admin' ? 'Switch to Member View' : 'Switch to Admin View'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & 4 Priority Buttons Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* GMTS Brand Logo */}
        <div
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-lg shadow-pink-500/25 group-hover:scale-105 transition transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-pink-400 group-hover:rotate-12 transition duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-serif">GMTS</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
                GLOBAL
              </span>
            </div>
            <p className="text-[11px] text-pink-200/80 font-medium tracking-wide">
              Global Multitalent Show • VIFTRI • PECC
            </p>
          </div>
        </div>

        {/* 4 Primary Action Buttons (Requested by user) */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* 1. Quick Inquiry */}
          <button
            onClick={() => setActiveModal('inquiry')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-pink-500/30 hover:border-pink-500 transition shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-pink-400" />
            Quick Inquiry
          </button>

          {/* 2. Round 1 Register */}
          <button
            onClick={() => setActiveModal('register')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/30 transition transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            Round 1 Register (₹600)
          </button>

          {/* 3. Login / Dashboard */}
          {currentUser ? (
            <button
              onClick={() => setCurrentPage(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/40 transition"
            >
              <LayoutDashboard className="w-4 h-4 text-pink-400" />
              {currentUser.role === 'admin' ? 'Admin Control' : 'My Dashboard'}
            </button>
          ) : (
            <button
              onClick={() => setActiveModal('login')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-pink-500/40 transition"
            >
              <LogIn className="w-4 h-4 text-pink-400" />
              Login
            </button>
          )}

          {/* 4. G Pay / Instant Pay Button */}
          <button
            onClick={() => {
              setActiveModal('register');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:border-emerald-500 transition shadow-sm"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            GPay / Pay Fee
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Primary Navigation Menu Row */}
      <div className="hidden lg:block bg-slate-900/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-1 text-xs font-medium text-slate-300">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3.5 py-2.5 rounded-lg transition flex items-center gap-1 ${
                currentPage === 'home' ? 'text-pink-400 font-semibold bg-pink-500/10' : 'hover:text-pink-300'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setCurrentPage('home');
                const el = document.getElementById('about-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2.5 rounded-lg hover:text-pink-300 transition"
            >
              About Us
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="px-3.5 py-2.5 rounded-lg hover:text-pink-300 transition flex items-center gap-1"
              >
                Categories (200+)
                <ChevronDown className="w-3.5 h-3.5 text-pink-400" />
              </button>

              {categoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  className="absolute left-0 top-full mt-1 w-80 bg-slate-900 border border-pink-500/30 rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn grid grid-cols-1 gap-1 max-h-96 overflow-y-auto"
                >
                  <div className="px-2 py-1 text-[11px] font-bold text-pink-400 border-b border-slate-800 uppercase tracking-wider">
                    Select Talent Category
                  </div>
                  {CATEGORY_GROUPS.map((cg) => (
                    <button
                      key={cg.id}
                      onClick={() => handleCategorySelect(cg.group_name)}
                      className="text-left px-3 py-2 rounded-lg text-xs hover:bg-pink-950/40 hover:text-pink-300 text-slate-200 transition flex items-center justify-between"
                    >
                      <span>{cg.group_name}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                        {cg.subcategories.length}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setCategoriesDropdownOpen(false);
                      setCurrentPage('categories');
                    }}
                    className="mt-1 text-center py-2 bg-pink-600/20 text-pink-300 rounded-lg text-xs font-semibold hover:bg-pink-600/30 transition"
                  >
                    View All 200+ Sub-Categories →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setCurrentPage('home');
                const el = document.getElementById('how-to-participate');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2.5 rounded-lg hover:text-pink-300 transition"
            >
              How to Participate
            </button>

            <button
              onClick={() => setCurrentPage('gallery')}
              className={`px-3.5 py-2.5 rounded-lg transition ${
                currentPage === 'gallery' ? 'text-pink-400 font-semibold bg-pink-500/10' : 'hover:text-pink-300'
              }`}
            >
              Video Gallery Preview
            </button>

            <button
              onClick={() => setCurrentPage('verify')}
              className={`px-3.5 py-2.5 rounded-lg transition flex items-center gap-1 ${
                currentPage === 'verify' ? 'text-pink-400 font-semibold bg-pink-500/10' : 'hover:text-pink-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Certificate Verification
            </button>

            <button
              onClick={() => setCurrentPage('blog')}
              className={`px-3.5 py-2.5 rounded-lg transition ${
                currentPage === 'blog' ? 'text-pink-400 font-semibold bg-pink-500/10' : 'hover:text-pink-300'
              }`}
            >
              Fashion Show Blog (SEO)
            </button>

            <button
              onClick={() => {
                setCurrentPage('home');
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2.5 rounded-lg hover:text-pink-300 transition"
            >
              Contact Us
            </button>
          </nav>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative my-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search contestant or talent..."
              className="w-52 bg-slate-950 border border-slate-700/80 rounded-full pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:w-64 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-pink-500/30 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal('register');
              }}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-xs font-bold text-center"
            >
              Round 1 Register (₹600)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentUser) {
                  setCurrentPage(currentUser.role === 'admin' ? 'admin' : 'dashboard');
                } else {
                  setActiveModal('login');
                }
              }}
              className="w-full py-2.5 px-3 bg-slate-800 text-pink-300 rounded-xl text-xs font-bold text-center border border-pink-500/30"
            >
              {currentUser ? 'My Dashboard' : 'User / Admin Login'}
            </button>
          </div>

          <nav className="flex flex-col space-y-1 text-xs font-medium text-slate-300">
            <button
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800 text-pink-400 font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage('gallery');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800"
            >
              Video Gallery & Voting
            </button>
            <button
              onClick={() => {
                setCurrentPage('categories');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800"
            >
              200+ Talent Categories
            </button>
            <button
              onClick={() => {
                setCurrentPage('verify');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800"
            >
              Certificate Verification
            </button>
            <button
              onClick={() => {
                setCurrentPage('blog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800"
            >
              Fashion Show Blog (SEO)
            </button>
            <button
              onClick={() => {
                setActiveModal('inquiry');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-slate-800"
            >
              Quick Inquiry
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
