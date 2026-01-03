/**
 * Floating Action Button for Lead Generation
 * Sticky CTA that appears after user scrolls
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Mail, X } from 'lucide-react'

interface FloatingCTAProps {
  onContactClick: () => void
}

export default function FloatingCTA({ onContactClick }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40">
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-3 space-y-2 min-w-[200px]"
              >
                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/919053070100"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">WhatsApp</div>
                    <div className="text-xs text-gray-600">Chat instantly</div>
                  </div>
                </motion.a>

                {/* Call */}
                <motion.a
                  href="tel:+919053070100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors"
                >
                  <Phone className="h-5 w-5 text-indigo-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Call Now</div>
                    <div className="text-xs text-gray-600">9053070100</div>
                  </div>
                </motion.a>

                {/* Contact Form */}
                <motion.button
                  onClick={() => {
                    setIsExpanded(false)
                    onContactClick()
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  <Mail className="h-5 w-5 text-purple-600" />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-900">Get Callback</div>
                    <div className="text-xs text-gray-600">Within 30 mins</div>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
              isExpanded
                ? 'bg-gray-800'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            }`}
          >
            {isExpanded ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </motion.button>

          {/* Pulse Animation */}
          {!isExpanded && (
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 -z-10"
            />
          )}
        </div>
      )}
    </AnimatePresence>
  )
}
