/**
 * Indohomz - WhatsApp Floating Button
 * Floating icon with popup contact options
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WhatsAppFloatProps {
  phoneNumber?: string
  message?: string
}

export default function WhatsAppFloat({ 
  phoneNumber = '919053070100',
  message = 'Hi! I\'m interested in Indohomz properties. Can you help me find a home?'
}: WhatsAppFloatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showBadge, setShowBadge] = useState(true)

  // Hide badge after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  const quickMessages = [
    { label: 'Schedule a Visit', message: 'Hi! I\'d like to schedule a property visit.' },
    { label: 'Check Availability', message: 'Hi! I want to check room availability.' },
    { label: 'Get Pricing', message: 'Hi! Can you share the pricing details?' },
    { label: 'General Inquiry', message: 'Hi! I have some questions about Indohomz.' },
  ]

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-green-500 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="Indohomz" 
                      className="w-8 h-8 object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Indohomz</h3>
                    <p className="text-white/80 text-sm">Usually replies instantly</p>
                  </div>
                </div>
              </div>

              {/* Chat Preview */}
              <div className="p-4 bg-stone-50">
                <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
                  <p className="text-stone-700 text-sm">
                    👋 Hi there! Looking for a home in Gurgaon? We're here to help!
                  </p>
                  <p className="text-stone-400 text-xs mt-1 text-right">Just now</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 space-y-2">
                <p className="text-stone-500 text-xs uppercase tracking-wider mb-3">Quick Actions</p>
                {quickMessages.map((item) => (
                  <a
                    key={item.label}
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(item.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-4 py-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-700 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Main CTA */}
              <div className="p-4 pt-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Start Conversation
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Notification Badge */}
        <AnimatePresence>
          {showBadge && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute -top-12 right-0 bg-white rounded-full px-4 py-2 shadow-lg whitespace-nowrap"
            >
              <p className="text-stone-700 text-sm font-medium">Need help? Chat with us! 💬</p>
              <div className="absolute bottom-0 right-6 w-3 h-3 bg-white transform rotate-45 translate-y-1.5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-16 h-16 rounded-full shadow-xl flex items-center justify-center transition-colors ${
            isOpen ? 'bg-stone-800' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="whatsapp"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse Ring */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-green-500 -z-10"
          />
        )}
      </div>
    </>
  )
}
