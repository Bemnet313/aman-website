'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';
import Magnetic from './Magnetic';

// Dummy data structure for the Jingles
const jinglesData = [
  {
    id: 'habesha',
    client: 'Habesha Beer',
    title: 'Cold Gold Commercial',
    logo: '/logos/habesha_beer.webp',
    bgImage: '/logos/habesha-campaign.png',
    audioSrc: '/audio/habesha.mp3',
  },
  {
    id: 'sanpolo',
    client: 'Sanpolo',
    title: 'Motor Campaign',
    logo: '/logos/sanpolo-logo-.webp',
    bgImage: '/logos/img_3677.webp',
    audioSrc: '/audio/sanpolo.mp3',
  },
  {
    id: 'yango',
    client: 'Yango',
    title: 'Brand Anthem',
    logo: '/logos/yango-logo.webp',
    bgImage: '/logos/sanpolo-campaign.jpg',
    audioSrc: '/audio/yango.mp3',
  }
];

// Formatting helper for MM:SS
const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const JingleCard = ({ 
  jingle, 
  activeId, 
  setActiveId, 
  index 
}: { 
  jingle: typeof jinglesData[0] & { bgImage?: string }, 
  activeId: string | null, 
  setActiveId: (id: string | null) => void,
  index: number 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isPlaying = activeId === jingle.id;

  useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    } else if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setActiveId(null));
      }
    }
  }, [isPlaying, setActiveId]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      setActiveId(null);
    } else {
      setActiveId(jingle.id);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(current);
      if (dur > 0) {
        setProgress((current / dur) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newTime = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-[32px] p-8 flex flex-col group transition-all duration-500 border hover:border-[#5eead4]/40 ${jingle.bgImage ? 'border-white/20 hover:shadow-[0_0_40px_rgba(94,234,212,0.15)]' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'}`}
    >
      {/* Dynamic Background Image (if available) */}
      {jingle.bgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={jingle.bgImage} 
            alt={`${jingle.client} Campaign`} 
            className={`w-full h-full object-cover opacity-60 transition-transform duration-[10s] ease-out ${isHovered || isPlaying ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2c2c] via-[#0d2c2c]/40 to-transparent" />
        </div>
      )}

      {/* Dynamic Background Glow (for standard cards) */}
      {!jingle.bgImage && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-[#5eead4]/5 to-transparent transition-opacity duration-1000 z-0 ${isHovered || isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      <div className="relative z-10 flex flex-col h-full gap-10">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
             <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#5eead4] animate-pulse" />
                <span className="text-[#5eead4] text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">
                  {jingle.client}
                </span>
             </div>
            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight leading-none group-hover:text-[#5eead4] transition-colors">
              {jingle.title}
            </h3>
          </div>
          <Magnetic>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[20px] bg-white/5 border border-white/10 flex items-center justify-center p-2 md:p-3 overflow-hidden group-hover:bg-white/10 transition-all shadow-xl hover:shadow-[#5eead4]/20 cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={jingle.logo} alt="" className="w-full h-full object-contain rounded-xl group-hover:scale-110 transition-transform duration-500" />
            </div>
          </Magnetic>
        </div>

        {/* Player Core */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <Magnetic>
              <button 
                onClick={togglePlay}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                  isPlaying 
                  ? 'bg-white text-black scale-110' 
                  : 'bg-[#5eead4] text-black hover:scale-110'
                }`}
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
            </Magnetic>

            {/* Visualizer */}
            <div className="flex-1 flex items-center gap-[3px] h-10 px-2">
              {[...Array(24)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    height: isPlaying ? [10, 32, 15, 40, 10][(i + index) % 5] : 4,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    repeat: Infinity, 
                    repeatType: "mirror",
                    delay: i * 0.05
                  }}
                  className={`w-[2px] rounded-full transition-colors duration-500 ${isPlaying ? 'bg-[#5eead4]' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </div>

          {/* Seeker */}
          <div className="space-y-3">
            <div 
              ref={progressBarRef}
              onClick={handleSeek}
              className="relative w-full h-[6px] bg-white/10 rounded-full cursor-pointer group/seeker"
            >
              <motion.div 
                className="absolute inset-y-0 left-0 bg-white rounded-full z-10"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute inset-y-0 left-0 bg-[#5eead4]/40 rounded-full blur-sm transition-all"
                style={{ width: `${progress}%` }}
              />
              {/* Invisible touch target for better seeking */}
              <div className="absolute inset-[-10px] z-0" />
            </div>
            
            <div className="flex justify-between text-[11px] font-mono tracking-widest text-white/40">
              <span className={isPlaying ? 'text-[#5eead4]' : ''}>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={jingle.audioSrc} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setActiveId(null)}
        className="hidden"
      />
    </motion.div>
  );
};

export default function Jingles() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="w-full py-28 md:py-32 px-6 sm:px-10 md:px-32 bg-[#0d2c2c] relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="text-[#5eead4]" size={24} />
              <span className="text-[#5eead4] text-sm font-bold tracking-[0.2em] uppercase">Commercial Audio</span>
            </div>
            <motion.h2 
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-[-0.06em] leading-[0.94] text-white/90"
            >
              JINGLES &<br/>BRANDING
            </motion.h2>
          </div>
          <p className="mt-6 md:mt-0 text-slate-400 font-light max-w-sm md:text-right pb-4 leading-relaxed">
            Custom audio identities, campaign scoring, and sound design trusted by global brands.
          </p>
        </div>

        <motion.div 
          style={prefersReducedMotion ? undefined : { y }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {jinglesData.map((jingle, idx) => (
            <JingleCard 
              key={jingle.id} 
              jingle={jingle} 
              index={idx}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
