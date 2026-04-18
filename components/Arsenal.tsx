'use client';
import { motion } from 'framer-motion';
import { Cpu, Settings, Disc3, Monitor, Layers } from 'lucide-react';
import dynamic from 'next/dynamic';

const Ambient3D = dynamic(() => import('./Ambient3D'), { ssr: false });

const arsenalItems = [
  {
    category: 'DAW / ENGINE',
    name: 'FL Studio 25',
    description: 'The primary heart of AMAN’s production. Favored for its intuitive step sequencer, crucial for crafting complex Ethiopian 6/8 and 12/8 patterns.',
    icon: <Settings size={48} className="text-[#5eead4]" />
  },
  {
    category: 'CORE INSTRUMENTS',
    name: 'Native Instruments Kontakt',
    description: 'Running custom-sampled Ethiopian Krar, Masenqo, and Washint libraries to merge traditional textures with modern processing.',
    icon: <Disc3 size={48} className="text-white/60" />
  },
  {
    category: 'SYNTHESIS',
    name: 'Serum & Sylenth1',
    description: 'The source of his signature Future Bass and House leads. Aggressive, clean, and highly automated FM synthesis.',
    icon: <Layers size={48} className="text-white/60" />
  },
  {
    category: 'HARDWARE',
    name: 'Focusrite',
    description: 'Tactile control over every melodic idea. Minimal latency, maximum creative flow.',
    icon: <Monitor size={48} className="text-white/60" />
  }
];

export default function Arsenal() {
  return (
    <section className="w-full py-28 md:py-32 px-6 sm:px-10 md:px-32 bg-[#0d2c2c] relative z-20 border-t border-white/5 overflow-hidden">
      <Ambient3D />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 md:mb-24">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-[-0.06em] leading-[0.94] text-white"
          >
            THE<br/><span className="text-[#5eead4]">ARSENAL</span>
          </motion.h2>
          <div className="mt-2 md:mt-0 text-slate-400 font-light flex flex-col items-start md:items-end text-left md:text-right">
            <Cpu className="text-[#5eead4] mb-4" size={32} />
            <p className="max-w-xs eyebrow text-white/80 mb-2">Technical Rider v2026</p>
            <p className="max-w-sm leading-relaxed">A look into the digital and analog tools used to create modern Ethiopian music.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {arsenalItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="surface-card rounded-[28px] p-10 md:p-12 hover:-translate-y-1 hover:bg-[#113a3a]/80 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle grid background */}
              <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              
              <div className="relative z-10">
                <div className="mb-8 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.03]">
                  {item.icon}
                </div>
                <p className="text-[#5eead4] eyebrow mb-4">{item.category}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-[-0.05em] leading-tight">{item.name}</h3>
                <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
