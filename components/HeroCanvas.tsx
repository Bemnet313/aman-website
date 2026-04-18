'use client';
import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion';

const TOTAL_FRAMES = 66;

export default function HeroCanvas({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>(Array(TOTAL_FRAMES).fill(null));
  const [loaded, setLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const drawFrame = (progress: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(progress * TOTAL_FRAMES)
    );

    let image = imagesRef.current[frameIndex];
    if (!image) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        image = imagesRef.current[frameIndex - offset] ?? imagesRef.current[frameIndex + offset] ?? null;
        if (image) break;
      }
    }

    if (!image) return;

    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const canvasRatio = canvas.width / canvas.height;
    const imageRatio = image.width / image.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imageRatio > canvasRatio) {
      drawHeight = canvas.width / imageRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imageRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    let r = 13;
    let g = 44;
    let b = 44;

    if (progress > 0.85) {
      const t = Math.min((progress - 0.85) / 0.15, 1);
      r = Math.floor(13 * (1 - t));
      g = Math.floor(44 * (1 - t));
      b = Math.floor(44 * (1 - t));
    }

    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    imagesRef.current = Array(TOTAL_FRAMES).fill(null);

    const markLoaded = (index: number, image: HTMLImageElement | null) => {
      if (!isMounted) return;

      if (image) {
        imagesRef.current[index] = image;
      }

      if (prefersReducedMotion && index === 0) {
        setLoaded(100);
      } else {
        loadedCount += 1;
        setLoaded(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
      }

      if (index === 0 && image) {
        setIsReady(true);
        requestAnimationFrame(() => drawFrame(0));
      }
    };

    const loadFrame = (index: number) => {
      const image = new Image();
      image.src = `/frames/frame_${index}.webp`;
      image.onload = () => markLoaded(index, image);
      image.onerror = () => markLoaded(index, null);
    };

    loadFrame(0);

    // Progressive loading: Load the rest after the first frame is ready
    if (!prefersReducedMotion) {
      const loadOthers = () => {
        for (let i = 1; i < TOTAL_FRAMES; i++) {
          // Delay loading of later frames slightly to prioritize network for initial assets
          setTimeout(() => {
            if (isMounted) loadFrame(i);
          }, i * 20); 
        }
      };

      if (window.requestIdleCallback) {
        window.requestIdleCallback(loadOthers);
      } else {
        setTimeout(loadOthers, 100);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [prefersReducedMotion]);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (prefersReducedMotion) return;
    requestAnimationFrame(() => drawFrame(latest));
  });

  useEffect(() => {
    const handleResize = () => {
      drawFrame(prefersReducedMotion ? 0 : smoothProgress.get());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [prefersReducedMotion, smoothProgress]);

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d2c2c] text-white">
        <h1 className="text-4xl tracking-widest font-light mb-8">AMAN</h1>
        <div className="w-64 h-[2px] bg-gray-800 rounded overflow-hidden">
          <div
            className="h-full bg-teal-400 transition-all duration-300 ease-out"
            style={{ width: `${loaded}%` }}
          ></div>
        </div>
        <p className="mt-4 text-xs tracking-widest text-teal-200/50">{loaded}% L O A D I N G</p>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
