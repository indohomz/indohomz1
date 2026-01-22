/**
 * Floating Compare Button
 * Triggers property comparison modal
 * Mobile optimized with safe area support
 */

import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

interface Props {
  onClick: () => void
  count?: number
}

export default function CompareButton({ onClick, count = 0 }: Props) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed z-50 flex items-center gap-2 bg-luxury-charcoal text-white rounded-full shadow-lg active:shadow-md transition-all touch-feedback
                 /* Mobile: Icon only, larger tap target */
                 bottom-20 left-4 p-3.5
                 /* Desktop: Full button with text */
                 md:bottom-24 md:left-6 md:px-4 md:py-3 md:hover:shadow-xl md:hover:scale-105 group"
      style={{ bottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <Scale className="w-5 h-5 text-gold-500" />
      {/* Text hidden on mobile, shown on desktop */}
      <span className="hidden md:inline text-sm font-sans font-medium group-hover:text-gold-500 transition-colors">
        Compare
      </span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 md:relative md:top-0 md:right-0 w-5 h-5 rounded-full bg-gold-500 text-luxury-charcoal text-xs flex items-center justify-center font-medium">
          {count}
        </span>
      )}
    </motion.button>
  )
}
