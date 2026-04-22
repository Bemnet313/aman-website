'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence, wrap } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import Magnetic from './Magnetic';
import { galleryAlbums, Album } from '@/lib/galleryData';

// Layout mapping for the 6 albums
const layoutClasses = [
  { colSpan: 'md:col-span-8', aspect: 'aspect-video' },
  { colSpan: 'md:col-span-4', aspect: 'aspect-[4/5]' },
  { colSpan: 'md:col-span-4', aspect: 'aspect-[4/5]' },
  { colSpan: 'md:col-span-8', aspect: 'aspect-video' },
  { colSpan: 'md:col-span-6', aspect: 'aspect-square' },
  { colSpan: 'md:col-span-6', aspect: 'aspect-square' }
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Gallery() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Selected album and pagination state
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [[page, direction], setPage] = useState([0, 0]);

  // Combine cover and images for full album viewing
  const currentImages = selectedAlbum ? [selectedAlbum.cover, ...selectedAlbum.images] : [];
  
  // Wrap index to create infinite loop
  const imageIndex = wrap(0, currentImages.length, page);

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => [prev[0] + newDirection, newDirection]);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const getParallax = (index: number) => {
    if (index % 3 === 0) return y1;
    if (index % 3 === 1) return y2;
    return y3;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAlbum) return;
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'Escape') setSelectedAlbum(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAlbum, paginate]);

  return (
    <>
      <section ref={containerRef} className="w-full py-16 md:py-32 px-6 sm:px-10 md:px-32 bg-[#0d2c2c] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-[-0.06em] leading-[0.94] text-white/90"
            >
              BEHIND<br/><span className="text-[#5eead4]">THE SCENES</span>
            </motion.h2>
            <p className="mt-6 md:mt-0 text-slate-400 font-light max-w-md md:text-right pb-4 leading-relaxed">
              A curated visual journey through studio sessions, live performances, and the evolution of the sound. Click any album to swipe through the memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {galleryAlbums.map((album, index) => {
              const layout = layoutClasses[index % layoutClasses.length];
              const totalPhotos = 1 + album.images.length;
              
              return (
                <motion.div 
                  key={album.id}
                  style={prefersReducedMotion ? undefined : { y: getParallax(index) }}
                  onClick={() => {
                    setSelectedAlbum(album);
                    setPage([0, 0]);
                  }}
                  onKeyDown={(e) => { 
                    if(e.key === 'Enter') {
                      setSelectedAlbum(album);
                      setPage([0, 0]);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open album ${album.title}`}
                  className={`${layout.colSpan} surface-card relative group overflow-hidden bg-black rounded-[28px] ${layout.aspect} cursor-pointer`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 md:group-hover:scale-[1.04] filter md:grayscale md:group-hover:grayscale-0 opacity-72 md:group-hover:opacity-100 mix-blend-luminosity md:group-hover:mix-blend-normal"
                    style={{ backgroundImage: `url(${album.cover})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:group-hover:opacity-70 transition-opacity duration-500" />
                  
                  {/* Photo count indicator */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Layers size={14} className="text-[#5eead4]" />
                    <span className="text-white text-xs font-bold tracking-widest">{totalPhotos} PHOTOS</span>
                  </div>

                  {/* Title and Zoom Icon */}
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex justify-between items-end">
                    <p className="text-white text-lg md:text-2xl font-bold tracking-[0.2em] opacity-80 translate-y-0 md:group-hover:opacity-100 transition-all duration-500 max-w-[80%] uppercase">
                      {album.title}
                    </p>
                    <Magnetic>
                      <div className="button-shell w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center opacity-80 md:group-hover:opacity-100 transition-all duration-500 delay-100 md:hover:bg-[#5eead4] md:hover:text-black text-white">
                        <ZoomIn size={16} />
                      </div>
                    </Magnetic>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* High-Resolution Album Lightbox */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-0 md:p-12 overflow-hidden"
          >
            {/* Header / Close */}
            <div className="absolute top-6 left-6 right-6 md:top-10 md:left-10 md:right-10 flex justify-between items-center z-50">
              <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm md:text-base">
                  {selectedAlbum.title} <span className="text-slate-500 ml-2">{imageIndex + 1} / {currentImages.length}</span>
                </h3>
              </div>
              
              <Magnetic>
                <button 
                  onClick={() => setSelectedAlbum(null)}
                  className="button-shell w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors bg-black/50 border border-white/10"
                  aria-label="Close lightbox"
                >
                  <X size={24} className="text-white" />
                </button>
              </Magnetic>
            </div>

            {/* Navigation Arrows (Desktop) */}
            <div className="hidden md:flex absolute inset-y-0 left-10 right-10 justify-between items-center z-40 pointer-events-none">
              <Magnetic>
                <button 
                  className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 pointer-events-auto hover:bg-[#5eead4] hover:text-black transition-colors"
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                >
                  <ChevronLeft size={32} />
                </button>
              </Magnetic>
              <Magnetic>
                <button 
                  className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 pointer-events-auto hover:bg-[#5eead4] hover:text-black transition-colors"
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                >
                  <ChevronRight size={32} />
                </button>
              </Magnetic>
            </div>
            
            {/* Main Slider Area */}
            <div className="relative w-full h-full flex items-center justify-center" onClick={() => setSelectedAlbum(null)}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevent close on image click
                  className="absolute w-full h-full md:max-w-6xl md:max-h-[85vh] flex items-center justify-center cursor-grab active:cursor-grabbing px-4 md:px-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={currentImages[imageIndex]} 
                    alt={`${selectedAlbum.title} image ${imageIndex + 1}`} 
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-none"
                    draggable={false}
                  />
                  
                  {/* Mobile Swipe Hint */}
                  <div className="absolute bottom-10 left-0 right-0 flex justify-center md:hidden pointer-events-none">
                     <span className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white/70 text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                       <ChevronLeft size={14}/> Swipe <ChevronRight size={14}/>
                     </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
