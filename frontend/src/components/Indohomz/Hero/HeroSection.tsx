/**
 * Indohomz - Cinematic Hero Section with Video
 * Full-screen, muted video loop, editorial text
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from '../Brand/Logo'

// Video URL - using a premium co-living/apartment video
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

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.4], ['0%', '15%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.6])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8
    }
  }, [videoLoaded])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-stone-900"
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Gradient Overlays */}
        <motion.div 
          className="absolute inset-0 bg-stone-900"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-stone-900/30" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 h-full flex items-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            {/* Overline - Smaller, more understated */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-white/40 text-xs uppercase tracking-[0.4em] mb-10"
            >
              Gurgaon
            </motion.p>

            {/* Headline - DECLARATIVE, CONFIDENT, OPINIONATED */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-white font-extralight leading-[0.95] mb-10 tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 7.5rem)' }}
            >
              This is
              <br />
              <span className="font-light">how you live.</span>
            </motion.h1>

            {/* Subtext - Shorter, more confident */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-14 max-w-md"
            >
              Not rooms. Not rentals. A life, curated.
            </motion.p>

            {/* CTA - Minimal, confident */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <Link
                to="/properties"
                className="group inline-flex items-center gap-6"
              >
                <span className="text-white/60 text-sm uppercase tracking-[0.15em] group-hover:text-white transition-colors duration-500">
                  Explore
                </span>
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:scale-110 transition-all duration-500">
                  <svg 
                    className="w-4 h-4 text-white group-hover:text-stone-900 transition-colors duration-300" 
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

      {/* Logo in Corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute top-8 left-6 lg:left-12 z-30"
      >
        <Logo variant="dark" size="md" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Location Badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-12 right-6 lg:right-12 z-20 hidden md:flex items-center gap-3"
      >
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-white/60 text-sm">
          6 Homes Available in Gurgaon
        </span>
      </motion.div>
    </section>
  )
}
