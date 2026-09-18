import React, { useState } from 'react';
import {
  Play,
  Heart,
  Share2,
  Sparkles,
  MapPin,
  CheckCircle,
  ArrowRight,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VideoItem } from '../../types';

export const VideoGalleryPreview: React.FC = () => {
  const { videos, setVotingTargetVideo, setActiveModal, setCurrentPage, addToast } = useApp();
  const [activePreviewVideo, setActivePreviewVideo] = useState<VideoItem | null>(null);

  const displayVideos = videos.slice(0, 6);

  const handleShare = (v: VideoItem) => {
    const url = `${window.location.origin}/#vote-${v.registration_number}`;
    navigator.clipboard.writeText(url);
    addToast(`Voting link copied for ${v.user_name}!`, 'success');
  };

  return (
    <section className="py-20 bg-slate-950 border-b border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Live Audition Gallery
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-tight">
              Watch Audition Videos & Vote For Your Favorites
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl">
              Every vote brings a contestant closer to the Grand Runway Final and ₹1,00,000 cash puraskar. Votes are verified via one-time password (OTP).
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('gallery')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 transition flex items-center gap-2 self-start md:self-auto"
          >
            <span>View Full Video Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl group hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={video.thumbnail_url}
                  alt={video.video_title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />

                {/* Play Button Overlay */}
                <button
                  onClick={() => setActivePreviewVideo(video)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-pink-600/90 hover:bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-600/40 transition transform hover:scale-110"
                  aria-label="Play Audition Video"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </button>

                {/* Badges on Thumbnail */}
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

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-pink-300 font-semibold">{video.registration_number}</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      Round 1 Audition
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-pink-300 transition">
                    {video.video_title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {video.video_description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setVotingTargetVideo(video);
                      setActiveModal('vote');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white transition flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/20"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    Vote Now
                  </button>

                  <button
                    onClick={() => handleShare(video)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    title="Share Voting Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
    </section>
  );
};
