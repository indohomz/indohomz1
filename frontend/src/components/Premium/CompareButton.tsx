/**
 * Floating Compare Button
 * Triggers property comparison modal
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-24 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-luxury-charcoal text-white rounded-full shadow-lg hover:shadow-xl transition-shadow group"
    >
      <Scale className="w-5 h-5 text-gold-500" />
      <span className="text-sm font-sans font-medium group-hover:text-gold-500 transition-colors">
        Compare
      </span>
      {count > 0 && (
        <span className="w-5 h-5 rounded-full bg-gold-500 text-luxury-charcoal text-xs flex items-center justify-center font-medium">
          {count}
        </span>
      )}
    </motion.button>
  )
}

