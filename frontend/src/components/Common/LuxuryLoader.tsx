/**
 * Indohomz - Luxury Loading Components
 * Premium loading states with brand styling and gold accents
 */

import { motion } from 'framer-motion'

// Full page loader with logo animation
export default function LuxuryLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-pattern-luxury opacity-20" />
      
      <div className="relative text-center">
        {/* Logo with pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <img 
            src="/logo.png" 
            alt="Indohomz" 
            className="h-14 w-auto mx-auto"
          />
        </motion.div>

        {/* Elegant loading bar */}
        <div className="w-48 h-px bg-stone-200 mx-auto overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gold-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: [0.4, 0, 0.6, 1]
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-stone-400 text-sm font-sans font-light tracking-wide"
        >
          Loading your experience...
        </motion.p>
      </div>
    </div>
  )
}

// Smaller inline loader
export function InlineLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4 border',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-2',
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} border-gold-500 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

// Card skeleton loader
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-100">
      {/* Image skeleton */}
      <div className="aspect-[16/10] bg-stone-100 animate-shimmer" 
           style={{ 
             background: 'linear-gradient(90deg, #F5F0E8 0%, #FAF8F5 50%, #F5F0E8 100%)',
             backgroundSize: '200% 100%'
           }} 
      />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-3 w-20 bg-stone-100 rounded-full animate-shimmer" />
        <div className="h-6 w-3/4 bg-stone-100 rounded-full animate-shimmer" />
        <div className="h-4 w-full bg-stone-100 rounded-full animate-shimmer" />
        <div className="h-4 w-2/3 bg-stone-100 rounded-full animate-shimmer" />
        <div className="flex justify-between items-center pt-4">
          <div className="h-5 w-24 bg-stone-100 rounded-full animate-shimmer" />
          <div className="h-5 w-16 bg-stone-100 rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  )
}

// Property grid skeleton
export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <CardSkeleton />
        </motion.div>
      ))}
    </div>
  )
}

// Section skeleton
export function SectionSkeleton() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header skeleton */}
        <div className="mb-16 space-y-4">
          <div className="h-3 w-32 bg-stone-100 rounded-full animate-shimmer" />
          <div className="h-12 w-64 bg-stone-100 rounded-full animate-shimmer" />
        </div>
        
        {/* Grid skeleton */}
        <PropertyGridSkeleton count={3} />
      </div>
    </div>
  )
}

// Page transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
    >
      {children}
    </motion.div>
  )
}

// Dots loader (for buttons)
export function DotsLoader() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

// Luxury spinner with gold ring
export function LuxurySpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-stone-200"
        style={{ borderTopColor: '#D4A574' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner dot */}
      <div 
        className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500"
      />
    </div>
  )
}

