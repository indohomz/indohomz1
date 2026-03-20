import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image - Bedroom/Living Space */}
      <img
        src="/images/main.jpeg"
        alt="IndoHomz Premium Living Space"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/properties/placeholder.jpg";
        }}
      />

      {/* Dark Overlay for Text Visibility */}
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />

      {/* Content Layer */}
      <div className="relative z-20 flex h-full min-h-screen flex-col items-center justify-center px-4 text-center text-white py-20">
        
        {/* IndoHomz Branding - Large & Clear */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide mb-2 drop-shadow-2xl">
            IndoHomz
          </h1>
          <p className="text-xl md:text-3xl font-light tracking-widest drop-shadow-lg">
            GURGAON'S FINEST LIVING
          </p>
        </div>

        {/* Animated Badge */}
        <div className="mb-8 animate-fade-in-up flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md border border-white/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wide">Live in Gurgaon & Noida</span>
        </div>

        {/* Main Headline */}
        <h2 className="mb-8 max-w-4xl text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl">
          This is how <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
            You Live.
          </span>
        </h2>

        {/* Subheadline */}
        <p className="mb-12 max-w-2xl text-lg md:text-xl text-gray-100 drop-shadow-lg font-light">
          Fully furnished spaces with high-speed WiFi, housekeeping, and a supportive community. Zero brokerage.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button 
            onClick={() => {
              const el = document.getElementById('properties');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center justify-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 px-10 py-4 text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-amber-500/40 text-black"
          >
            Explore Homes
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-10 py-4 text-lg font-bold backdrop-blur-sm transition-all hover:bg-white/20 border border-white/40 hover:border-white/60">
            <MapPin className="h-5 w-5" />
            Schedule Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
