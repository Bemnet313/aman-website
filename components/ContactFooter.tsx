'use client';
import { Phone, Mail } from 'lucide-react';
import Magnetic from './Magnetic';

export default function ContactFooter() {
  return (
    <section className="w-full bg-[#000000] text-white pt-28 md:pt-32 pb-10 px-6 sm:px-10 md:px-32 relative z-30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
        {/* Left Column: Title & Direct Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-[-0.07em] mb-6 leading-[0.9]">
              START<br/>THE<br/><span className="text-[#5eead4]">SESSION.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-md mt-8 leading-relaxed">
              Ready to shape your sonic identity? Drop the details below.
            </p>
          </div>

          <div className="mt-20 space-y-4">
            <a href="mailto:amanmuzika27@gmail.com" className="flex items-center space-x-4 text-slate-400 hover:text-[#5eead4] transition-colors text-lg md:text-xl font-light w-fit group tracking-[0.01em]">
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              <span>amanmuzika27@gmail.com</span>
            </a>
            <a href="tel:+251901110145" className="flex items-center space-x-4 text-slate-400 hover:text-[#5eead4] transition-colors text-lg md:text-xl font-light w-fit group tracking-[0.01em]">
              <Phone size={20} className="group-hover:scale-110 transition-transform" />
              <span>+251 901 110 145</span>
            </a>
          </div>
        </div>

        {/* Right Column: Form */}
        <form className="surface-card rounded-[28px] flex flex-col space-y-10 mt-10 lg:mt-0 px-6 py-8 md:px-8 md:py-10" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-transparent border-b border-white/20 pb-4 text-xl md:text-2xl focus:outline-none focus:border-[#5eead4] transition-colors placeholder-white/30"
              required
            />
          </div>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border-b border-white/20 pb-4 text-xl md:text-2xl focus:outline-none focus:border-[#5eead4] transition-colors placeholder-white/30"
              required
            />
          </div>
          <div className="relative">
            <select 
              className="w-full bg-transparent border-b border-white/20 pb-4 text-xl md:text-2xl focus:outline-none focus:border-[#5eead4] transition-colors text-white/80 appearance-none rounded-none"
              defaultValue=""
              required
            >
              <option value="" disabled className="text-black">Project Type</option>
              <option value="production" className="text-black">Production</option>
              <option value="mixing" className="text-black">Mixing & Mastering</option>
              <option value="scoring" className="text-black">Film Scoring</option>
              <option value="jingle" className="text-black">Commercial Jingle</option>
            </select>
          </div>
          <div className="relative">
            <textarea 
              placeholder="Tell me about the vision..." 
              rows={3}
              className="w-full bg-transparent border-b border-white/20 pb-4 text-xl md:text-2xl focus:outline-none focus:border-[#5eead4] transition-colors placeholder-white/30 resize-none"
              required
            ></textarea>
          </div>
          <Magnetic className="self-start">
            <button 
              type="submit" 
              className="button-shell text-base md:text-lg font-bold tracking-[0.22em] uppercase border-[#5eead4] text-[#5eead4] px-8 md:px-10 hover:bg-[#5eead4] hover:text-black transition-all duration-300"
            >
              Send Transmission
            </button>
          </Magnetic>
        </form>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/10 text-slate-500">
        <p className="tracking-widest uppercase text-xs">© 2026 AMAN. All rights reserved.</p>
        <div className="flex items-center space-x-6 mt-6 md:mt-0">
          <Magnetic>
            <a href="https://www.instagram.com/thisiz_aman" target="_blank" rel="noreferrer" className="hover:text-[#5eead4] transition-colors block p-2" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="https://youtube.com/@thisisaman.official" target="_blank" rel="noreferrer" className="hover:text-[#5eead4] transition-colors block p-2" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6C4 3.7 5.1 3.7 5.6 3.6C8.8 3.4 12 3.4 12 3.4C12 3.4 15.2 3.4 18.4 3.6C18.9 3.7 20 3.7 20.9 4.6C21.7 5.4 21.5 7.1 21.5 7.1C21.5 7.1 21.7 8.8 21.7 10.5V11.5C21.7 13.2 21.5 14.9 21.5 14.9C21.5 14.9 21.7 16.6 20.9 17.4C20 18.3 18.7 18.2 18.2 18.4C15.4 18.6 12 18.6 12 18.6C12 18.6 8.8 18.6 5.6 18.4C5.1 18.3 4 18.3 3.1 17.4C2.3 16.6 2.5 14.9 2.5 14.9C2.5 14.9 2.3 13.2 2.3 11.5V10.5C2.3 8.8 2.5 7.1 2.5 7.1Z"/><path d="M9.7 14.8V7.2L15.6 11L9.7 14.8Z"/></svg>
            </a>
          </Magnetic>
          <Magnetic>
             <a href="https://www.tiktok.com/@thisis_aman" target="_blank" rel="noreferrer" className="hover:text-[#5eead4] transition-colors block p-2" aria-label="TikTok">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
          </Magnetic>
          <Magnetic>
             <a href="https://t.me/thisiz_aman" target="_blank" rel="noreferrer" className="hover:text-[#5eead4] transition-colors block p-2" aria-label="Telegram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
