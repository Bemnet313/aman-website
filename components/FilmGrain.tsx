export default function FilmGrain() {
  return (
    <div className="fixed inset-0 z-[90] pointer-events-none mix-blend-overlay">
      <div className="absolute inset-[-200%] w-[400%] h-[400%] bg-noise"></div>
    </div>
  );
}