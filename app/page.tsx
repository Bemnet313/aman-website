'use client';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import HeroCanvas from '@/components/HeroCanvas';
import InfiniteSlider from '@/components/InfiniteSlider';
import About from '@/components/About';
import WorkGrid from '@/components/WorkGrid';
import Gallery from '@/components/Gallery';
import Philosophy from '@/components/Philosophy';
import Discography from '@/components/Discography';
import Arsenal from '@/components/Arsenal';
import Stats from '@/components/Stats';
import ContactFooter from '@/components/ContactFooter';

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
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
      <HeroCanvas />

      {/* The scrollable container for the storytelling timeline */}
      <div className="relative z-10 w-full h-[360vh] md:h-[420vh]">
        
        {/* Beat A: THE ARCHITECT (0–20% Scroll) */}
        <section className="absolute top-0 w-full h-screen flex flex-col items-start justify-center px-6 sm:px-10 md:px-32">
          <div className="max-w-2xl">
            <div className="overflow-hidden pb-2">
              <motion.h1 
                variants={maskReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="text-massive font-bold tracking-tighter opacity-90 mb-4"
              >
                AMAN
              </motion.h1>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-3xl text-slate-400 font-light leading-relaxed"
            >
              Defining the sonic landscape of modern music.
            </motion.p>
          </div>
        </section>

        {/* Beat B: SONIC BRANDING (25–45% Scroll) */}
        <section className="absolute top-[85vh] md:top-[105vh] w-full h-screen flex flex-col items-end justify-center px-6 sm:px-10 md:px-32 text-right">
          <div className="max-w-2xl flex flex-col items-end">
            <div className="overflow-hidden pb-2 text-right">
              <motion.h2 
                variants={maskReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="text-massive font-bold tracking-tighter opacity-90 mb-4 leading-[0.9]"
              >
                ICONIC<br/>JINGLES
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-3xl text-slate-400 font-light leading-relaxed"
            >
              Crafting the auditory DNA for global brands and commercial giants.
            </motion.p>
          </div>
        </section>

        {/* Beat C: THE CATALOG (50–70% Scroll) */}
        <section className="absolute top-[170vh] md:top-[210vh] w-full h-screen flex flex-col items-start justify-center px-6 sm:px-10 md:px-32">
          <div className="max-w-2xl">
            <div className="overflow-hidden pb-2">
              <motion.h2 
                variants={maskReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="text-massive font-bold tracking-tighter opacity-90 mb-4 leading-[0.9]"
              >
                RELEASED<br/>WORKS
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-3xl text-slate-400 font-light leading-relaxed"
            >
              From underground anthems to chart-topping studio production.
            </motion.p>
          </div>
        </section>

        {/* Beat D: THE VOID (75–95% Scroll) */}
        <section className="absolute top-[255vh] md:top-[315vh] w-full h-screen flex flex-col items-center justify-center px-6 sm:px-10 md:px-32 text-center pointer-events-none">
          <div className="max-w-3xl flex flex-col items-center pointer-events-auto">
            <div className="overflow-hidden pb-2">
              <motion.h2 
                style={prefersReducedMotion ? undefined : { textShadow }}
                variants={maskReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="text-massive font-bold tracking-tighter opacity-90 mb-8 text-white"
              >
                ENTER THE<br/>VOID
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light"
            >
              Scroll down to explore the soundscape
            </motion.p>
          </div>
        </section>
      </div>

      {/* NEW CONTENT SECTIONS APPENDED BELOW HERO */}
      <div className="relative z-20 w-full bg-[#0d2c2c]">
        <InfiniteSlider />
        <About />
        <WorkGrid />
        <Gallery />
        <Philosophy />
        <Discography />
        <Arsenal />
        <Stats />
        <ContactFooter />
      </div>
    </main>
  );
}
