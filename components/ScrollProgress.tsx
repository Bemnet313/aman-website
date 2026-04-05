'use client';
import { useScroll, motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 right-0 w-[4px] h-full bg-white/10 z-50 pointer-events-none">
      <motion.div 
        className="w-full bg-[#5eead4] origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  );
}