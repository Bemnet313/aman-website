'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import Magnetic from './Magnetic';
import { amanFeaturedInterview, amanMusicVideos } from '@/lib/amanData';

export default function WorkGrid() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [kal, kalabay, anemogn] = amanMusicVideos;
  const pressVideo = amanFeaturedInterview;

  useEffect(() => {
    if (!activeVideo) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  return (
    <>
      <section className="w-full py-32 px-10 md:px-32 bg-[#0d2c2c] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-20">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-white/90"
            >
              SELECTED<br/><span className="text-[#5eead4]">WORKS</span>
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
            
            {/* Kal - Featured */}
            <motion.button 
              type="button"
              onClick={() => setActiveVideo(kal.videoId)}
              aria-label={`Open ${kal.title} video`}
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-3xl text-left appearance-none border-0 p-0"
              whileHover={{ scale: 0.98, rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              {/* YouTube Thumbnail Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"
                style={{ backgroundImage: `url(${kal.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0"></div>
              
              <div className="absolute bottom-12 left-12 z-10">
                <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white group-hover:text-[#5eead4] transition-colors">&apos;{kal.title}&apos;</h3>
                <p className="text-slate-300 text-xl md:text-2xl font-light">{kal.artist} • 7M+ Views</p>
              </div>
              
              <div className="absolute top-8 right-8 z-10">
                <Magnetic>
                  <div className="px-6 py-3 border border-white/20 rounded-full backdrop-blur-sm flex items-center space-x-2 hover:bg-white/10 transition-colors">
                    <Play size={16} fill="currentColor" />
                    <span className="text-sm tracking-widest uppercase">Watch Video</span>
                  </div>
                </Magnetic>
              </div>
            </motion.button>

            {/* Kalabay */}
            <motion.button 
              type="button"
              onClick={() => setActiveVideo(kalabay.videoId)}
              aria-label={`Open ${kalabay.title} video`}
              className="relative group overflow-hidden bg-gradient-to-tr from-[#113a3a] to-[#061414] rounded-3xl text-left appearance-none border-0 p-0"
              whileHover={{ scale: 0.98, rotateX: 2, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-luminosity"
                style={{ backgroundImage: `url(${kalabay.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0"></div>

              <div className="absolute bottom-10 left-10 z-10">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-white">&apos;{kalabay.title}&apos;</h3>
                <p className="text-[#5eead4] text-lg font-light">Ethiopian Future Bass</p>
              </div>
              <div className="absolute top-8 right-8 z-10">
                <Magnetic>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
                    <Play size={16} fill="currentColor" />
                  </div>
                </Magnetic>
              </div>
            </motion.button>

            {/* Anemogn */}
            <motion.button 
              type="button"
              onClick={() => setActiveVideo(anemogn.videoId)}
              aria-label={`Open ${anemogn.title} video`}
              className="relative group overflow-hidden bg-[#051111] border border-white/5 rounded-3xl flex flex-col items-start justify-end p-10 text-left appearance-none"
              whileHover={{ scale: 0.98, rotateX: -2, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity"
                style={{ backgroundImage: `url(${anemogn.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0"></div>

              <div className="z-10 relative">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 text-white">&apos;{anemogn.title}&apos;</h3>
                <p className="text-slate-400 text-sm md:text-base font-light">House meets Six/Eight Rhythm</p>
              </div>
              <div className="absolute top-8 right-8 z-10">
                <Magnetic>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
                    <Play size={16} fill="currentColor" />
                  </div>
                </Magnetic>
              </div>
            </motion.button>

            {/* Press & Interviews - Wide Card */}
            <motion.button 
              type="button"
              onClick={() => setActiveVideo(pressVideo.videoId)}
              aria-label="Open Press and Media video"
              className="md:col-span-2 relative group overflow-hidden bg-gradient-to-r from-[#1a202c] to-black rounded-3xl text-left appearance-none border-0 p-0"
              whileHover={{ scale: 0.98, rotateX: -2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"
                style={{ backgroundImage: `url(${pressVideo.image})` }}
              ></div>
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
               
              <div className="absolute bottom-10 left-10 z-10 w-2/3">
                <h3 className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 text-white">{pressVideo.title}</h3>
                <p className="text-slate-400 text-xl font-light">{pressVideo.description}</p>
              </div>
              <div className="absolute top-10 right-10 z-10">
                <Magnetic>
                  <div className="w-16 h-16 rounded-full bg-[#5eead4] text-black flex items-center justify-center backdrop-blur-md hover:scale-110 transition-transform">
                    <Play size={20} fill="currentColor" />
                  </div>
                </Magnetic>
              </div>
            </motion.button>

          </div>
        </div>
      </section>

      {/* Dynamic Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
          >
            <div className="absolute top-10 right-10 z-10">
              <Magnetic>
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </Magnetic>
            </div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
