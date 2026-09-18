import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Trophy, PlayCircle } from 'lucide-react';
import { HERO_SLIDES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setActiveModal, setCurrentPage } = useApp();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 border-b border-pink-500/20 min-h-[540px] md:min-h-[620px] flex items-center">
      {/* Background Image with Dark & Pink Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center transition-transform duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 z-10" />
        <div className="absolute inset-0 bg-pink-950/20 mix-blend-multiply z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl space-y-6">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-pink-500/10 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{slide.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight leading-tight">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
            {slide.subtitle}
          </p>

          {/* Category Highlight Pill */}
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-pink-500/30 backdrop-blur-md">
            <span className="text-xs text-pink-300 font-semibold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Featured Tracks: {slide.categoryHighlight}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveModal('register')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white shadow-xl shadow-pink-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {slide.primaryCta}
            </button>

            <button
              onClick={() => setCurrentPage('gallery')}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-pink-500/50 transition flex items-center gap-2 backdrop-blur-md"
            >
              <PlayCircle className="w-4 h-4 text-pink-400" />
              {slide.secondaryCta}
            </button>
          </div>

          {/* Key Metric Tags */}
          <div className="flex items-center gap-6 pt-4 text-xs text-slate-300">
            <div>
              <span className="text-pink-400 font-bold text-sm block">200+</span>
              <span>Talent Categories</span>
            </div>
            <div className="border-l border-slate-700 pl-6">
              <span className="text-emerald-400 font-bold text-sm block">₹1,00,000</span>
              <span>Final Cash Prize</span>
            </div>
            <div className="border-l border-slate-700 pl-6">
              <span className="text-amber-400 font-bold text-sm block">100% Online</span>
              <span>Audition & Voting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white border border-pink-500/30 backdrop-blur-sm transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white border border-pink-500/30 backdrop-blur-sm transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-pink-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
