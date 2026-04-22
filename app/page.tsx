'use client';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import HeroCanvas from '@/components/HeroCanvas';

// Dynamically import below-the-fold components for performance
const InfiniteSlider = dynamic(() => import('@/components/InfiniteSlider'), { ssr: false });
const About = dynamic(() => import('@/components/About'));
const WorkGrid = dynamic(() => import('@/components/WorkGrid'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const Philosophy = dynamic(() => import('@/components/Philosophy'));
const Discography = dynamic(() => import('@/components/Discography'));
const Jingles = dynamic(() => import('@/components/Jingles'));
const Arsenal = dynamic(() => import('@/components/Arsenal'));
const Stats = dynamic(() => import('@/components/Stats'));
const ContactFooter = dynamic(() => import('@/components/ContactFooter'));

const TIMELINE_BEATS = [
  {
    id: 'architect',
    title: 'AMAN',
    subtitle: 'THIS IS',
    description: 'Creating the sound of modern music.',
    className: 'absolute top-0 w-full h-screen flex flex-col items-start justify-center px-6 sm:px-10 md:px-32',
    alignment: 'start'
  },
  {
    id: 'commercial',
    title: <>COMMERCIAL<br/>MUSIC</>,
    description: 'Creating custom music and audio branding for global brands.',
    className: 'absolute top-[90vh] md:top-[105vh] w-full h-screen flex flex-col items-end justify-center px-6 sm:px-10 md:px-32 text-right',
    alignment: 'end'
  },
  {
    id: 'catalog',
    title: <>RELEASED<br/>WORKS</>,
    description: 'From underground anthems to chart-topping studio production.',
    className: 'absolute top-[180vh] md:top-[210vh] w-full h-screen flex flex-col items-start justify-center px-6 sm:px-10 md:px-32',
    alignment: 'start'
  },
  {
    id: 'void',
    title: <>EXPLORE<br/>THE WORK</>,
    description: 'Scroll down to listen to the catalog',
    className: 'absolute top-[270vh] md:top-[315vh] w-full h-screen flex flex-col items-center justify-center px-6 sm:px-10 md:px-32 text-center pointer-events-none',
    alignment: 'center'
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Create chromatic aberration effect based on scroll velocity
  const xOffset1 = useTransform(smoothVelocity, [-1000, 1000], [0, 5]);
  const xOffset2 = useTransform(smoothVelocity, [-1000, 1000], [0, -5]);
  const textShadow = useTransform(
    [xOffset1, xOffset2],
    ([x1, x2]) => `${x1}px 0px 0px rgba(255,0,0,0.8), ${x2}px 0px 0px rgba(0,255,255,0.8)`
  );

  const maskReveal = {
    hidden: { y: "100%" },
    show: { 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  };

  return (
    <main className="relative bg-transparent text-white w-full">
      <HeroCanvas progress={heroProgress} />

      {/* CSS Fallback for 3D: High-quality gradient + grain for low-performance/reduced-motion */}
      {prefersReducedMotion && (
        <div className="fixed inset-0 z-[-1] bg-[#0d2c2c] overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-[#0d2c2c] via-[#1a4d4d] to-[#0d2c2c] animate-pulse" />
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        </div>
      )}

      {/* The scrollable container for the storytelling timeline */}
      <div ref={containerRef} className="relative z-10 w-full h-[360vh] md:h-[420vh]">        
        {TIMELINE_BEATS.map((beat) => (
          <section key={beat.id} className={beat.className}>
            <div className={`max-w-3xl flex flex-col ${beat.alignment === 'end' ? 'items-end' : beat.alignment === 'center' ? 'items-center' : 'items-start'} ${beat.id === 'void' ? 'pointer-events-auto' : ''}`}>
              <div className={`overflow-hidden pb-4 flex flex-col ${beat.alignment === 'end' ? 'text-right' : beat.alignment === 'center' ? 'text-center' : ''}`}>
                {beat.subtitle && (
                  <motion.span 
                    variants={maskReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="text-2xl sm:text-4xl md:text-[3.2rem] font-serif text-[#e4efed] opacity-100 mb-1 md:mb-2 ml-8 sm:ml-20 md:ml-32 tracking-wide relative z-10"
                  >
                    {beat.subtitle}
                  </motion.span>
                )}
                <motion.h1 
                  style={beat.id === 'void' && !prefersReducedMotion ? { textShadow } : undefined}
                  variants={maskReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className={`text-7xl md:text-massive font-bold tracking-tighter leading-[0.85] mb-2 relative z-0 ${beat.id === 'architect' ? 'text-white' : 'opacity-90'}`}
                >
                  {beat.title}
                </motion.h1>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className={`text-base sm:text-xl md:text-3xl font-light leading-relaxed mt-1 ${beat.id === 'architect' ? 'text-white/60' : 'text-slate-400'}`}
              >
                {beat.description}
              </motion.p>
            </div>
          </section>
        ))}
      </div>

      {/* NEW CONTENT SECTIONS APPENDED BELOW HERO */}
      <div className="relative z-20 w-full bg-[#0d2c2c]">
        <InfiniteSlider />
        <About />
        <WorkGrid />
        <Gallery />
        <Philosophy />
        <Discography />
        <Jingles />
        <Arsenal />
        <Stats />
        <ContactFooter />
      </div>
    </main>
  );
}