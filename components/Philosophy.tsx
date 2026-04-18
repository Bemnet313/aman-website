'use client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Philosophy() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="w-full py-40 bg-[#061414] relative z-20 overflow-hidden flex flex-col justify-center border-y border-white/5">

      {/* Background Image Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10 mix-blend-screen bg-cover bg-center filter grayscale"
        style={{ 
          backgroundImage: 'url(/assets/aman.webp)',
          y: prefersReducedMotion ? '0%' : backgroundY
        }}
      />
      
      <div className="relative z-10 w-full flex flex-col space-y-8">
        <motion.div style={prefersReducedMotion ? undefined : { x: x1 }} className="whitespace-nowrap">
          <h2 className="text-[12vw] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/30 uppercase leading-none">
            AUTHENTICITY • IMPROVISATION • INNOVATION • AUTHENTICITY • IMPROVISATION
          </h2>
        </motion.div>
        
        <div className="w-full max-w-5xl mx-auto px-10 md:px-0 py-10">
          <p className="text-3xl md:text-5xl font-light text-white leading-tight text-center">
            &quot;Music is a dynamic exploration of sounds that <span className="text-[#5eead4] italic">embrace cultural identity</span> while pushing creative boundaries through fearless improvisation.&quot;
          </p>
        </div>

        <motion.div style={prefersReducedMotion ? undefined : { x: x2 }} className="whitespace-nowrap">
          <h2 className="text-[12vw] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#5eead4]/10 to-[#5eead4]/30 uppercase leading-none">
            PRODUCTION • RECORDING • MASTERING • PRODUCTION • RECORDING • MASTERING
          </h2>
        </motion.div>
      </div>

    </section>
  );
}
