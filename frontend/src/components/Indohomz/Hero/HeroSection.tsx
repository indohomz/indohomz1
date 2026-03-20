import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.35], ['0%', '10%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.6])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-luxury-charcoal"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: mediaY, scale: mediaScale }}
      >
        {/* Main Image */}
        <img
          ref={imageRef}
          src="/images/main.jpg"
          alt="IndoHomz - Gurgaon's Finest Living"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/logo.png"
          }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />

        {/* Dark Gradient Overlays - Better text contrast */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
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
              className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mb-12 origin-left rounded-full"
            />

            {/* Overline - LARGE & CLEAR */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-gold-300 text-2xl md:text-4xl font-display font-bold uppercase tracking-widest mb-6 drop-shadow-2xl"
            >
              IndoHomz
            </motion.p>

            {/* Subheading - Clear branding */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-stone-200 text-xl md:text-2xl font-sans uppercase tracking-[0.35em] mb-12 drop-shadow-lg"
            >
              Gurgaon's Finest Living
            </motion.p>

            {/* Headline - Large & Bold */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-white font-bold leading-[0.95] mb-10 tracking-tight drop-shadow-2xl"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 8.5rem)' }}
            >
              This is how <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400">
                you live.
              </span>
            </motion.h1>

            {/* Subtext - Prominent */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-stone-100 text-lg md:text-xl font-sans font-medium leading-relaxed mb-16 max-w-2xl drop-shadow-lg"
            >
              Not rooms. Not rentals. 
              <span className="text-gold-200"> A life, curated</span> for those who 
              appreciate the extraordinary.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link
                to="/properties"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gold-500 hover:bg-gold-400 text-black font-display text-lg font-bold rounded-full transition-all duration-300 shadow-2xl shadow-gold-500/50 hover:shadow-gold-500/70"
              >
                Explore Homes
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
