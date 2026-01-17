/**
 * Indohomz - Luxury Cinematic Hero Section
 * Full-screen, muted video loop, editorial typography
 * Premium animations with gold accents
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

// Premium video - self-hosted or high-quality stock
const HERO_VIDEO_URL = 'https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_30fps.mp4'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.35], ['0%', '10%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75 // Slower for luxury feel
    }
  }, [videoLoaded])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-luxury-charcoal"
    >
      {/* Background Media with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: mediaY, scale: mediaScale }}
      >
        {/* Video */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 filter-warm ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        )}

        {/* Fallback Image */}
        <img
          src="/images/properties/dlf-phase-4/5.webp"
          alt="Premium living space"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 filter-warm ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Gradient Overlays - Warmer, more luxurious */}
        <motion.div 
          className="absolute inset-0 bg-luxury-charcoal"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-charcoal/90 via-luxury-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/70 via-transparent to-luxury-charcoal/40" />
        
        {/* Warm gold tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-gold-600/10 mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 h-full flex items-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
          <div className="max-w-3xl">
            {/* Gold accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-16 h-px bg-gold-500 mb-10 origin-left"
            />

            {/* Overline - Luxury label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-gold-500 text-xs font-sans font-medium uppercase tracking-[0.35em] mb-8"
            >
              Gurgaon's Finest Living
            </motion.p>

            {/* Headline - Elegant serif typography */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-white font-light leading-[0.92] mb-10 tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 7.5rem)' }}
            >
              This is how
              <br />
              <span className="text-gold-400">you live.</span>
            </motion.h1>

            {/* Subtext - Clean and confident */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-stone-400 text-lg md:text-xl font-sans font-light leading-relaxed mb-14 max-w-lg"
            >
              Not rooms. Not rentals. 
              <span className="text-stone-300"> A life, curated</span> for those who 
              appreciate the extraordinary.
            </motion.p>

            {/* CTA - Luxury button style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link
                to="/properties"
                className="group inline-flex items-center gap-5"
              >
                <span className="relative px-8 py-4 bg-gold-500 text-luxury-charcoal text-sm font-sans font-medium tracking-wide rounded-full overflow-hidden transition-all duration-500 hover:bg-gold-400 hover:shadow-gold-lg">
                  <span className="relative z-10">Explore Homes</span>
                </span>
              </Link>
              
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-500"
              >
                <span className="text-sm font-sans tracking-wide">Schedule a Visit</span>
                <span className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center group-hover:border-gold-500 group-hover:bg-gold-500/10 transition-all duration-500">
                  <svg 
                    className="w-4 h-4 text-gold-500 transition-transform duration-500 group-hover:translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Elegant */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-gold-500/60 text-[10px] font-sans uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Location Badge - Premium style */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-12 right-6 lg:right-16 z-20 hidden md:flex items-center gap-4 
                   bg-luxury-charcoal/50 backdrop-blur-xl px-5 py-3 rounded-full border border-gold-500/20"
      >
        <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse-gold" />
        <span className="text-stone-300 text-sm font-sans font-light tracking-wide">
          <span className="text-gold-500 font-medium">6</span> Curated Homes Available
        </span>
      </motion.div>

      {/* Decorative corner accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute top-8 right-8 lg:right-16 z-20 hidden lg:block"
      >
        <div className="w-16 h-16 border-t border-r border-gold-500/30" />
      </motion.div>
    </section>
  )
}
