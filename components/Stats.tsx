'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full py-48 px-10 md:px-32 bg-[#0d2c2c] relative z-20 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#113a3a]/40 via-[#0d2c2c] to-[#0d2c2c] pointer-events-none"></div>
      
      <motion.h2 
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-4xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] text-center mb-32 text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-white"
      >
        Embrace Your True Self
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 w-full max-w-6xl text-center z-10">
        <StatItem value="7M+" label="YouTube Views" isInView={isInView} delay={0.2} />
        <StatItem value="2" label="Award Nominations" isInView={isInView} delay={0.4} />
        <StatItem value="14" label="Years Old Started" isInView={isInView} delay={0.6} />
      </div>
    </section>
  );
}

function StatItem({ value, label, isInView, delay }: { value: string, label: string, isInView: boolean, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center"
    >
      <span className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white">{value}</span>
      <span className="text-lg md:text-xl text-[#5eead4] tracking-[0.2em] uppercase font-semibold">{label}</span>
    </motion.div>
  );
}