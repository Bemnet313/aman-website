'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const maskItem = {
  hidden: { y: "100%" },
  show: { 
    y: 0, 
    transition: { duration: 0.8 } 
  }
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full py-28 md:py-40 px-6 sm:px-10 md:px-32 bg-[#0d2c2c] relative z-20 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
        
        {/* Left Column - Large Vertical Text on Desktop */}
        <div className="lg:col-span-4 flex justify-start lg:justify-center">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.08em] opacity-[0.08] lg:-rotate-180 lg:[writing-mode:vertical-rl]"
          >
            BIOGRAPHY
          </motion.h2>
        </div>

        {/* Right Column - Prose with Mask Reveals */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-8 md:space-y-10 text-xl sm:text-2xl md:text-[2rem] font-light text-slate-300 leading-[1.24]">
          
          <div className="overflow-hidden py-1">
            <motion.p variants={maskItem} initial="hidden" animate={isInView ? "show" : "hidden"}>
              Amanuel Dawit (AMAN) is a pioneering Ethiopian producer shaping the Addis soundscape since 2015. His journey began at 14, pushing a budget Acer with a broken hinge to its limits.
            </motion.p>
          </div>
          
          <div className="overflow-hidden py-1">
            <motion.p variants={maskItem} initial="hidden" animate={isInView ? "show" : "hidden"} transition={{ delay: 0.1 }} className="text-[#5eead4] font-normal">
              His signature sound is a vibrant fusion of global House and EDM, boldly incorporating traditional Ethiopian instruments and tribal rhythms.
            </motion.p>
          </div>
          
          <div className="overflow-hidden py-1">
            <motion.p variants={maskItem} initial="hidden" animate={isInView ? "show" : "hidden"} transition={{ delay: 0.2 }}>
              With his breakthrough track <span className="text-white font-semibold">&apos;Kal&apos;</span> amassing 9.1M+ views and earning dual Addis Music Award nominations, AMAN continues to invite listeners to <span className="text-white">&quot;Embrace Your True Self.&quot;</span>
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
