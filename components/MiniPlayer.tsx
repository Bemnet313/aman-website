'use client';
import { useState } from 'react';
import { ExternalLink, Music, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { amanMusicVideos } from '@/lib/amanData';

export default function MiniPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const quickLinks = amanMusicVideos.slice(0, 3);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/65 backdrop-blur-md magnetic-target"
          >
            <div className="p-4">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5eead4]">Official Links</p>
                  <p className="mt-1 text-sm text-slate-300">Quick access to the real Aman music videos from the live site.</p>
                </div>
                <ExternalLink size={16} className="mt-1 text-white/50" />
              </div>

              <div className="space-y-2">
                {quickLinks.map((track) => (
                  <a
                    key={track.videoId}
                    href={track.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white transition-colors hover:border-[#5eead4]/50 hover:bg-white/10"
                  >
                    <span>
                      <span className="block font-semibold">{track.title}</span>
                      <span className="block text-xs text-slate-400">{track.artist}</span>
                    </span>
                    <Play size={16} className="text-[#5eead4]" fill="currentColor" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors text-white magnetic-target group"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={20} className="text-slate-400 group-hover:text-white" /> : <Music size={20} className="text-[#5eead4] group-hover:text-white" />}
      </motion.button>
    </div>
  );
}
