/**
 * IntroReveal - Delayed reveal entry experience
 * Premium brands control pace
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
  skipIntro?: boolean
}

export default function IntroReveal({ onComplete, skipIntro = false }: Props) {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'reveal'>('logo')
  const [isVisible, setIsVisible] = useState(!skipIntro)

  useEffect(() => {
    if (skipIntro) {
      onComplete()
      return
    }

    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem('indohomz-intro-seen')
    if (hasSeenIntro) {
      setIsVisible(false)
      onComplete()
      return
    }

    // Phase timeline
    const timer1 = setTimeout(() => setPhase('tagline'), 800)
    const timer2 = setTimeout(() => setPhase('reveal'), 2200)
    const timer3 = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('indohomz-intro-seen', 'true')
      onComplete()
    }, 2800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [skipIntro, onComplete])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-[200] bg-stone-50 flex items-center justify-center"
      >
        <div className="text-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-stone-900 text-4xl md:text-5xl font-light tracking-wide">
              Indohomz
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: phase === 'tagline' || phase === 'reveal' ? 1 : 0 
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-stone-400 text-sm uppercase tracking-[0.3em] mt-4"
          >
            Curated Living Spaces
          </motion.p>

          {/* Subtle line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: phase === 'reveal' ? 1 : 0 
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-12 h-px bg-stone-300 mx-auto mt-8 origin-center"
          />
        </div>

        {/* Skip hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 }}
          onClick={() => {
            setIsVisible(false)
            sessionStorage.setItem('indohomz-intro-seen', 'true')
            onComplete()
          }}
          className="absolute bottom-8 text-stone-400 text-xs tracking-wider hover:opacity-60 transition-opacity"
        >
          Press anywhere to continue
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
