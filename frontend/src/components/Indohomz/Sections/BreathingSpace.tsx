/**
 * Indohomz - Breathing Space Section
 * Elegant quote sections that create visual pauses
 * Luxury typography with gold accents
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface BreathingSpaceProps {
  quote: string
  author?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

export default function BreathingSpace({ 
  quote, 
  author,
  size = 'md', 
  variant = 'light' 
}: BreathingSpaceProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const isDark = variant === 'dark'
  
  const sizeStyles = {
    sm: {
      padding: 'py-24 md:py-32',
      fontSize: 'text-2xl md:text-3xl lg:text-4xl',
      maxWidth: 'max-w-2xl',
    },
    md: {
      padding: 'py-32 md:py-44',
      fontSize: 'text-3xl md:text-4xl lg:text-5xl',
      maxWidth: 'max-w-3xl',
    },
    lg: {
      padding: 'py-40 md:py-56',
      fontSize: 'text-4xl md:text-5xl lg:text-6xl',
      maxWidth: 'max-w-4xl',
    },
  }

  const styles = sizeStyles[size]

  return (
    <section 
      ref={ref}
      className={`relative overflow-hidden ${styles.padding} ${
        isDark ? 'bg-luxury-charcoal' : 'bg-luxury-cream'
      }`}
    >
      {/* Subtle pattern */}
      <div className={`absolute inset-0 bg-pattern-luxury ${isDark ? 'opacity-5' : 'opacity-30'}`} />
      
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/20 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/20 hidden lg:block" />

      <div className={`${styles.maxWidth} mx-auto px-6 lg:px-12 text-center relative z-10`}>
        {/* Top gold accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-12 h-px bg-gold-500 mx-auto mb-12"
        />

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className={`font-display font-light leading-tight tracking-tight ${styles.fontSize} ${
            isDark ? 'text-white' : 'text-luxury-charcoal'
          }`}>
            <span className="text-gold-500">"</span>
            {quote}
            <span className="text-gold-500">"</span>
          </p>
        </motion.blockquote>

        {/* Author (if provided) */}
        {author && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`mt-8 font-sans text-sm tracking-wide ${
              isDark ? 'text-stone-400' : 'text-stone-500'
            }`}
          >
            — {author}
          </motion.p>
        )}

        {/* Bottom gold accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-12 h-px bg-gold-500 mx-auto mt-12"
        />
      </div>
    </section>
  )
}
