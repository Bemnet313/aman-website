'use client';

const LOGOS = [
  "Studio 30", "Urban Film Production", "Minew Shewa Entertainment", "Hope Music Ethiopia",
  "Studio 30", "Urban Film Production", "Minew Shewa Entertainment", "Hope Music Ethiopia"
];

export default function InfiniteSlider() {
  return (
    <section className="w-full py-16 overflow-hidden bg-[#0d2c2c] border-t border-white/5 relative z-20">
      <div className="flex animate-marquee">
        {LOGOS.map((logo, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 px-12 md:px-24 text-4xl md:text-6xl font-bold tracking-tighter text-white/40 transition-colors duration-500 hover:text-[#5eead4] hover:opacity-100 cursor-default"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}