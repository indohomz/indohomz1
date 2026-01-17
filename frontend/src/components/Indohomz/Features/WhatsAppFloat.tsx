/**
 * Indohomz - Luxury WhatsApp Floating Button
 * Premium styling with gold accents, subtle animations
 * Non-intrusive, appears after scroll
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WhatsAppFloatProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppFloat({ 
  phoneNumber, 
  message = "Hi, I'm interested in your properties. Can you help me find my perfect home?" 
}: WhatsAppFloatProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Show button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      
      // Show after scrolling past 40% of viewport
      if (scrollY > viewportHeight * 0.4) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check initial scroll position
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-expand after delay (once per session)
  useEffect(() => {
    if (isVisible && !hasInteracted) {
      const timer = setTimeout(() => {
        setIsExpanded(true)
        // Auto-collapse after 5 seconds
        setTimeout(() => {
          setIsExpanded(false)
          setHasInteracted(true)
        }, 5000)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, hasInteracted])

  const handleClick = () => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleMouseEnter = () => {
    setIsExpanded(true)
    setHasInteracted(true)
  }

  const handleMouseLeave = () => {
    if (hasInteracted) {
      setIsExpanded(false)
    }
  }

  return (
      <AnimatePresence>
      {isVisible && (
          <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-8 right-8 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Button */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 bg-luxury-charcoal text-white 
                       rounded-full shadow-xl hover:shadow-2xl transition-all duration-500
                       overflow-hidden"
          >
            {/* Glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-gold-500/20 via-gold-400/10 to-gold-500/20 opacity-0 group-hover:opacity-100"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Icon container */}
            <div className="relative z-10 w-14 h-14 flex items-center justify-center">
              {/* WhatsApp Icon - Custom luxury version */}
              <svg 
                className="w-6 h-6 text-gold-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              
              {/* Pulse ring */}
              <motion.span 
                className="absolute inset-0 rounded-full border-2 border-gold-500/30"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              </div>

            {/* Expanded text */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden whitespace-nowrap pr-5"
                >
                  <span className="text-sm font-sans font-medium text-white/90">
                    Chat with us
                  </span>
          </motion.div>
        )}
      </AnimatePresence>
          </motion.button>

          {/* Tooltip on hover (when collapsed) */}
        <AnimatePresence>
            {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden group-hover:block"
              >
                <div className="bg-luxury-charcoal text-white text-sm font-sans px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  Chat on WhatsApp
                  {/* Arrow */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-luxury-charcoal rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
  )
}

// Alternative: Minimal floating icon (for quieter pages)
export function WhatsAppMinimal({ phoneNumber }: { phoneNumber: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gold-500 hover:bg-gold-400 
                     text-luxury-charcoal rounded-full shadow-gold-lg flex items-center justify-center
                     transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
