/**
 * Indohomz - Brand Philosophy Section
 * Luxury storytelling with elegant typography
 * Gold accents and premium animations
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function BrandPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const values = [
    {
      number: '01',
      title: 'Curated Living',
      description: "Every home is hand-selected for quality, location, and the lifestyle it enables. We don't do ordinary.",
    },
    {
      number: '02',
      title: 'Effortless Experience',
      description: 'From discovery to move-in, everything is designed to be seamless. Your time is valuable.',
    },
    {
      number: '03',
      title: 'Community First',
      description: 'Live among like-minded individuals who share your values. Connection without compromise.',
    },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-white overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-mesh-luxury" />
      
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* Left Column - Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Label */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-600 text-xs font-sans font-medium uppercase tracking-[0.25em]">
                  Our Philosophy
                </span>
              </div>

              {/* Title */}
              <h2 
                className="font-display text-luxury-charcoal font-light leading-tight mb-8"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                Living is an <span className="text-gold-600">art</span>.
                <br />
                We're the gallery.
              </h2>

              {/* Description */}
              <p className="text-stone-500 font-sans font-light text-lg leading-relaxed mb-10 max-w-lg">
                We believe a home should be more than shelter. It's where life unfolds, 
                where memories are made, where you become who you're meant to be. 
                That's why we obsess over every detail.
              </p>

              {/* CTA */}
              <Link
                to="/about"
                className="group inline-flex items-center gap-4"
              >
                <span className="text-luxury-charcoal font-sans font-medium text-sm tracking-wide group-hover:text-gold-600 transition-colors duration-300">
                  Discover Our Story
                </span>
                <span className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500">
                  <svg 
                    className="w-4 h-4 text-gold-500 group-hover:text-white transition-colors duration-300" 
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

          {/* Right Column - Values */}
          <div className="space-y-12">
            {values.map((value, index) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
                className="group"
              >
                <div className="flex gap-8">
                  {/* Number */}
                  <span className="text-gold-500/40 font-display text-5xl font-light group-hover:text-gold-500 transition-colors duration-500">
                    {value.number}
                  </span>
                  
                  <div className="flex-1 pt-2">
                    {/* Title */}
                    <h3 className="font-display text-luxury-charcoal text-2xl font-light mb-3 group-hover:text-gold-700 transition-colors duration-300">
                      {value.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-stone-500 font-sans font-light leading-relaxed">
                      {value.description}
                    </p>
                    
                    {/* Gold line on hover */}
                    <div className="mt-6 h-px bg-gold-500/20 group-hover:bg-gold-500 transition-colors duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-32 pt-16 border-t border-stone-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem number="5000+" label="Happy Residents" />
            <StatItem number="50+" label="Premium Properties" />
            <StatItem number="6" label="Prime Locations" />
            <StatItem number="4.9" label="Average Rating" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl md:text-5xl text-luxury-charcoal font-light mb-2">
        {number}
      </p>
      <p className="text-stone-500 font-sans text-sm tracking-wide">
        {label}
      </p>
    </div>
  )
}
