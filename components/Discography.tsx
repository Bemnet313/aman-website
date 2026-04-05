'use client';
import { motion } from 'framer-motion';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { amanMusicVideos, amanUpcomingRelease, type AmanMusicVideo, type AmanUpcomingRelease } from '@/lib/amanData';
import Magnetic from './Magnetic';

function hasVideoUrl(release: AmanMusicVideo | AmanUpcomingRelease): release is AmanMusicVideo {
  return 'videoUrl' in release;
}

export default function Discography() {
  const releases = [...amanMusicVideos, amanUpcomingRelease];

  return (
    <section className="w-full py-28 md:py-32 px-6 sm:px-10 md:px-32 bg-[#061414] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-[-0.06em] leading-[0.94] text-white"
          >
            THE<br/><span className="text-[#5eead4]">CATALOG</span>
          </motion.h2>
          <p className="text-slate-400 font-light max-w-md text-left md:text-right leading-relaxed">
            Official music videos and the upcoming album pulled from the live Aman site, so every link here is real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {releases.map((release, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="surface-card rounded-[28px] p-4 md:p-5 group relative"
            >
              <div className="aspect-square w-full bg-black rounded-[22px] overflow-hidden mb-6 relative shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06] opacity-60 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                  style={{ backgroundImage: `url(${release.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent group-hover:from-black/35 transition-colors duration-500" />
                
                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {hasVideoUrl(release) ? (
                    <Magnetic>
                      <a
                        href={release.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button-shell w-16 h-16 rounded-full bg-[#5eead4] flex items-center justify-center text-black border-[#5eead4]"
                        aria-label={`Watch ${release.title} on YouTube`}
                      >
                        <PlayCircle size={32} />
                      </a>
                    </Magnetic>
                  ) : (
                    <div className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      Upcoming
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-[1.75rem] font-bold text-white tracking-[-0.04em]">{release.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{release.artist} • {release.year}</p>
                </div>
                <span className="text-[10px] tracking-[0.22em] uppercase border border-white/15 px-2.5 py-1.5 rounded-full text-white/40">
                  {release.type}
                </span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4 min-h-[3rem]">{release.description}</p>

              {hasVideoUrl(release) ? (
                <Magnetic>
                  <a
                    href={release.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-shell inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5eead4] hover:text-white transition-colors"
                  >
                    Watch official video
                    <ExternalLink size={16} />
                  </a>
                </Magnetic>
              ) : (
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                  Album in development
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
