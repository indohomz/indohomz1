/**
 * Premium Intro Animation
 * Cinematic brand reveal on page load
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
  duration?: number
}

export default function PremiumIntro({ onComplete, duration = 3000 }: Props) {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'reveal' | 'done'>('logo')

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('tagline'), 800),
      setTimeout(() => setPhase('reveal'), 2000),
      setTimeout(() => {
        setPhase('done')
        onComplete()
      }, duration),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete, duration])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 z-[9999] bg-luxury-charcoal flex items-center justify-center overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold-500 to-transparent"
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 50,
                opacity: 0 
              }}
              animate={{ 
                y: -50,
                opacity: [0, 1, 1, 0],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
              className="absolute w-1 h-1 bg-gold-500 rounded-full"
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: phase === 'reveal' ? 0.9 : 1, 
              opacity: phase === 'reveal' ? 0 : 1 
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            {/* Brand mark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              {/* IH Logo */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 border-2 border-gold-500 rounded-xl flex items-center justify-center"
                >
                  <span className="font-display text-4xl text-gold-500 font-light">IH</span>
                </motion.div>
                {/* Corner accents */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gold-500"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gold-500"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gold-500"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gold-500"
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl text-white font-light tracking-widest"
            >
              INDOHOMZ
            </motion.h1>
          </motion.div>

          {/* Tagline */}
          <AnimatePresence>
            {(phase === 'tagline' || phase === 'reveal') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: phase === 'reveal' ? 0 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
                <p className="text-stone-400 font-sans text-lg tracking-widest uppercase">
                  Live Better. Not Louder.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <div className="w-48 h-0.5 bg-stone-700 mx-auto rounded-full overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: duration / 1000 - 0.5, ease: 'linear' }}
                className="h-full bg-gold-500 origin-left"
              />
            </div>
          </motion.div>
        </div>

        {/* Reveal animation - curtain effect */}
        {phase === 'reveal' && (
          <>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: '-100%' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-luxury-charcoal z-20"
            />
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: '100%' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-luxury-charcoal z-20"
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

