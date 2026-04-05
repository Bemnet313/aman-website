'use client';
import { useState, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import Magnetic from './Magnetic';

const baseUrl = '/assets/';

const galleryItems = [
  // Row 1 (8 + 4)
  { 
    src: `${baseUrl}amanP3.jpg`, 
    title: 'THE LIVE EXPERIENCE', 
    alt: 'AMAN performing a live electronic music set in Addis Ababa',
    colSpan: 'md:col-span-8',
    aspect: 'aspect-video'
  },
  { 
    src: `${baseUrl}amanP4.jpg`, 
    title: 'PORTRAIT', 
    alt: 'Studio portrait of Ethiopian producer AMAN',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/5]'
  },
  // Row 2 (4 + 8)
  { 
    src: `${baseUrl}studio1.jpeg`, 
    title: 'THE LAB', 
    alt: 'AMAN working in his music production studio with FL Studio',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/5]'
  },
  { 
    src: `${baseUrl}amanP2.jpg`, 
    title: 'NIGHT SESSIONS', 
    alt: 'AMAN deep in a late-night music production session',
    colSpan: 'md:col-span-8',
    aspect: 'aspect-video'
  },
  // Row 3 (6 + 6)
  { 
    src: `${baseUrl}exploremusic.jpeg`, 
    title: 'THE SOUNDSCAPE', 
    alt: 'Exploring the fusion of traditional and electronic music',
    colSpan: 'md:col-span-6',
    aspect: 'aspect-square'
  },
  { 
    src: `${baseUrl}interview.jpeg`, 
    title: 'MEDIA & PRESS', 
    alt: 'AMAN discussing his musical journey in an interview',
    colSpan: 'md:col-span-6',
    aspect: 'aspect-square'
  },
  // Row 4 (4 + 4 + 4)
  { 
    src: `${baseUrl}aman.jpeg`, 
    title: 'THE ORIGIN', 
    alt: 'Early days portrait of Amanuel Dawit',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/5]'
  },
  { 
    src: `${baseUrl}amanP5.jpg`, 
    title: 'MILESTONES', 
    alt: 'AMAN showcasing his awards and recognition',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/5]'
  },
  { 
    src: `${baseUrl}amanP1.jpg`, 
    title: 'ACOUSTIC FUSION', 
    alt: 'AMAN with traditional Ethiopian instruments and modern studio gear',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/5]'
  }
];

export default function Gallery() {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Assign parallax effect based on column layout to create depth
  const getParallax = (index: number) => {
    if (index % 3 === 0) return y1;
    if (index % 3 === 1) return y2;
    return y3;
  };

  return (
    <>
      <section ref={containerRef} className="w-full py-28 md:py-32 px-6 sm:px-10 md:px-32 bg-[#0d2c2c] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-20 flex flex-col md:flex-row justify-between items-start md:items-end">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-[-0.06em] leading-[0.94] text-white/90"
            >
              BEHIND<br/><span className="text-[#5eead4]">THE SCENES</span>
            </motion.h2>
            <p className="mt-6 md:mt-0 text-slate-400 font-light max-w-md md:text-right pb-4 leading-relaxed">
              A curated visual journey through studio sessions, live performances, and the evolution of the sound. Click any image to explore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div 
                key={index}
                style={prefersReducedMotion ? undefined : { y: getParallax(index) }}
                onClick={() => setSelectedImage(item)}
                onKeyDown={(e) => { if(e.key === 'Enter') setSelectedImage(item); }}
                role="button"
                tabIndex={0}
                aria-label={`View larger image of ${item.title}`}
                className={`${item.colSpan} surface-card relative group overflow-hidden bg-black rounded-[28px] ${item.aspect}`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-[1.04] filter grayscale group-hover:grayscale-0 opacity-72 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                  style={{ backgroundImage: `url(${item.src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Title and Zoom Icon */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <p className="text-white text-xs sm:text-sm font-bold tracking-[0.2em] opacity-70 translate-y-0 group-hover:opacity-100 transition-all duration-500 max-w-[80%]">
                    {item.title}
                  </p>
                  <Magnetic>
                    <div className="button-shell w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-500 delay-100 hover:bg-[#5eead4] hover:text-black text-white">
                      <ZoomIn size={16} />
                    </div>
                  </Magnetic>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Resolution Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute top-10 right-10 z-10">
              <Magnetic>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="button-shell w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors bg-black/50"
                  aria-label="Close lightbox"
                >
                  <X size={24} className="text-white" />
                </button>
              </Magnetic>
            </div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="surface-card relative w-full max-w-7xl max-h-[90vh] rounded-[28px] overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent clicks on image from closing modal
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="max-w-full max-h-[90vh] object-contain rounded-xl"
              />
              
              {/* Image Details Plate */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-10 pointer-events-none">
                <h3 className="text-white font-bold tracking-[0.2em] text-xl">{selectedImage.title}</h3>
                <p className="text-slate-300 font-light mt-2 max-w-2xl">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
