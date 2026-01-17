/**
 * Indohomz - Quiet View Mode Toggle
 * Hide prices, focus on visuals and vibe
 */

import { motion, AnimatePresence } from 'framer-motion'
import { createContext, useContext, useState, ReactNode } from 'react'

interface QuietModeContextType {
  isQuietMode: boolean
  toggleQuietMode: () => void
}

const QuietModeContext = createContext<QuietModeContextType | undefined>(undefined)

export function QuietModeProvider({ children }: { children: ReactNode }) {
  const [isQuietMode, setIsQuietMode] = useState(false)

  const toggleQuietMode = () => setIsQuietMode(prev => !prev)

  return (
    <QuietModeContext.Provider value={{ isQuietMode, toggleQuietMode }}>
      {children}
    </QuietModeContext.Provider>
  )
}

export function useQuietMode() {
  const context = useContext(QuietModeContext)
  if (!context) {
    throw new Error('useQuietMode must be used within a QuietModeProvider')
  }
  return context
}

export default function QuietModeToggle() {
  const { isQuietMode, toggleQuietMode } = useQuietMode()

  return (
    <motion.button
      onClick={toggleQuietMode}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-stone-200 hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <span className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {isQuietMode ? (
            <motion.svg
              key="quiet"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 text-stone-900 absolute inset-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="normal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 text-stone-500 absolute inset-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>

      {/* Label */}
      <span className="text-sm font-medium text-stone-700">
        {isQuietMode ? 'Quiet Mode On' : 'Quiet View'}
      </span>

      {/* Toggle */}
      <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${
        isQuietMode ? 'bg-stone-900' : 'bg-stone-200'
      }`}>
        <motion.div
          animate={{ x: isQuietMode ? 16 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </div>
    </motion.button>
  )
}
