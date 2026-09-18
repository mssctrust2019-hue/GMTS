import React, { useState } from 'react';
import {
  Search,
  Filter,
  Play,
  Heart,
  Share2,
  Sparkles,
  MapPin,
  CheckCircle,
  Trophy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORY_GROUPS } from '../../data/mockData';
import { VideoItem } from '../../types';

export const VideoGalleryPage: React.FC = () => {
  const {
    videos,
    selectedCategory,
    setSelectedCategory,
    setVotingTargetVideo,
    setActiveModal,
    addToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'votes' | 'recent'>('votes');
  const [activePreviewVideo, setActivePreviewVideo] = useState<VideoItem | null>(null);

  // Filtered and sorted videos
  const filtered = videos.filter((v) => {
    const matchesCat =
      selectedCategory === 'All' ||
      v.category === selectedCategory ||
      v.subcategory === selectedCategory;
    const matchesSearch =
      v.video_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.registration_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  filtered.sort((a, b) => {
    if (sortOption === 'votes') {
      return b.votes_count - a.votes_count;
    }
    return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
  });

  const handleShare = (v: VideoItem) => {
    const url = `${window.location.origin}/#vote-${v.registration_number}`;
    navigator.clipboard.writeText(url);
    addToast(`Voting link copied for ${v.user_name}!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Official Public Voting Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Contestant Audition Video Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Browse verified audition entries from across India and around the globe. Watch talent performances and cast your OTP-verified vote to support candidates into Round 2, Semi-Finals, and the ₹1,00,000 Grand Final!
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contestant, city, or ID..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              <option value="All">All Categories (200+)</option>
              {CATEGORY_GROUPS.map((cg) => (
                <option key={cg.id} value={cg.group_name}>
                  {cg.group_name}
                </option>
              ))}
            </select>

            <select
              value={sortOption}
              onChange={(e: any) => setSortOption(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              <option value="votes">Most Votes First</option>
              <option value="recent">Recently Uploaded</option>
            </select>

            <button
              onClick={() => setActiveModal('register')}
              className="px-4 py-2 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white text-xs transition"
            >
              Upload My Video (₹600)
            </button>
          </div>
        </div>

        {/* Video Cards Grid */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-400 border border-dashed border-slate-800 rounded-3xl space-y-2">
            <p className="text-sm font-bold text-white">No audition videos found matching your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-pink-400 underline text-xs"
            >
              Clear filters and show all videos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video) => (
              <div
                key={video.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl group hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={video.thumbnail_url}
                    alt={video.video_title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />

                  <button
                    onClick={() => setActivePreviewVideo(video)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-pink-600/90 hover:bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-600/40 transition transform hover:scale-110"
                    aria-label="Play Audition Video"
                  >
                    <Play className="w-5 h-5 ml-0.5" />
                  </button>

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-pink-300 border border-pink-500/30 backdrop-blur-sm">
                      {video.subcategory}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 text-[11px] text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      {video.city}, {video.country}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-pink-400 bg-slate-950/80 px-2 py-0.5 rounded-full border border-pink-500/20">
                      <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                      {video.votes_count} Votes
                    </span>
                  </div>
                </div>

                {/* Info & Vote CTA */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono text-pink-300 font-semibold">{video.registration_number}</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle className="w-3 h-3" />
                        Verified Audition
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-pink-300 transition">
                      {video.video_title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {video.video_description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setVotingTargetVideo(video);
                        setActiveModal('vote');
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white transition flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/20"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      Vote For {video.user_name.split(' ')[0]}
                    </button>

                    <button
                      onClick={() => handleShare(video)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                      title="Share Voting Link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Player Modal */}
        {activePreviewVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-3xl bg-slate-900 border border-pink-500/30 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{activePreviewVideo.video_title}</h3>
                  <p className="text-xs text-pink-400">{activePreviewVideo.user_name} • {activePreviewVideo.category}</p>
                </div>
                <button
                  onClick={() => setActivePreviewVideo(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activePreviewVideo.youtube_embed_id}?autoplay=1`}
                  title={activePreviewVideo.video_title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="font-bold text-pink-400">{activePreviewVideo.votes_count} Verified Votes</span>
                  <span>•</span>
                  <span>{activePreviewVideo.city}, {activePreviewVideo.country}</span>
                </div>

                <button
                  onClick={() => {
                    const v = activePreviewVideo;
                    setActivePreviewVideo(null);
                    setVotingTargetVideo(v);
                    setActiveModal('vote');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white shadow"
                >
                  Vote for {activePreviewVideo.user_name}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
