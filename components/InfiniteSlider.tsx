'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // With 8 copies, one full set is 12.5% of the total width.
  // We wrap when we've scrolled past exactly one full set (or two) to keep it seamless.
  const x = useTransform(baseX, (v) => `${wrap(-25, -12.5, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax flex whitespace-nowrap overflow-hidden">
      <motion.div className="scroller flex whitespace-nowrap gap-16 md:gap-32 items-center" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default function InfiniteSlider() {
  const logos = [
    { src: '/logos/habesha_beer.webp', alt: 'Habesha Beer' },
    { src: '/logos/sanpolo-logo-.webp', alt: 'Sanpolo' },
    { src: '/logos/yango-logo.webp', alt: 'Yango' },
    { src: '/logos/mpesa-logo-.webp', alt: 'M-Pesa' },
    { src: '/logos/img_3677.webp', alt: 'Partner Logo 1' },
    { src: '/logos/selam-ethiopia-.webp', alt: 'Selam Ethiopia' },
    { src: '/logos/img_3678.webp', alt: 'Partner Logo 2' },
    { src: '/logos/menew-shewa-logo-.webp', alt: 'Menew Shewa' },
    { src: '/logos/addis-abab-admin-logo-.webp', alt: 'Addis Ababa Admin' },
    { src: '/logos/grub-on-burger-.webp', alt: 'Grub On Burger' },
    { src: '/logos/tigat.png', alt: 'Tigat Rec' },
  ];

  return (
    <section className="relative bg-[#0d2c2c] py-24 z-20 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-32 mb-10 flex justify-center">
        <p className="text-[#5eead4] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
          Trusted By
        </p>
      </div>

      <div className="w-full flex flex-col relative mask-horizontal-edges">
        <ParallaxText baseVelocity={-2.5}>
          {logos.map((logo, idx) => (
             <div key={idx} className="flex-shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-20 md:h-28 w-auto object-contain pointer-events-none" 
                  loading="lazy"
                />
             </div>
          ))}
        </ParallaxText>
      </div>
      
      {/* CSS for edge fading */}
      <style dangerouslySetInnerHTML={{__html: `
        .mask-horizontal-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </section>
  );
}
