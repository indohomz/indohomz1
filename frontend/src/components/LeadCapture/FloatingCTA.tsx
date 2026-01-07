/**
 * Floating WhatsApp Chat Widget
 * Interactive popup with chat-like interface
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Mail, X, Send } from 'lucide-react'

interface FloatingCTAProps {
  onContactClick: () => void
}

export default function FloatingCTA({ onContactClick }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showChatPopup, setShowChatPopup] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppSubmit = () => {
    if (!formData.name || !formData.phone) return
    
    const message = `Hi! I'm ${formData.name}. I'm interested in IndoHomz properties. My phone: ${formData.phone}`
    const whatsappUrl = `https://wa.me/919053070100?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setShowChatPopup(false)
    setFormData({ name: '', phone: '' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* WhatsApp Chat Popup */}
          <AnimatePresence>
            {showChatPopup && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="absolute bottom-24 right-0 w-[380px] bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="bg-indigo-600 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">IndoHomz</h3>
                      <p className="text-indigo-100 text-xs">Usually responds in minutes</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowChatPopup(false)}
                    className="text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Chat Content */}
                <div className="p-5 bg-gray-50 space-y-4">
                  {/* Bot Message */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2"
                  >
                    <div className="flex-shrink-0 text-2xl">👋</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[85%]">
                      <p className="text-gray-800 text-sm leading-relaxed">
                        Hi! I'm here to help you with IndoHomz. Let me connect you with the property owner.
                      </p>
                    </div>
                  </motion.div>

                  {/* Input Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-indigo-600 mb-1.5 ml-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-indigo-600 mb-1.5 ml-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleWhatsAppSubmit}
                    disabled={!formData.name || !formData.phone || formData.phone.length !== 10}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Tell me more!
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                <motion.button
                  onClick={() => {
                    setIsExpanded(false)
                    setShowChatPopup(true)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors w-full"
                >
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-900">WhatsApp</div>
                    <div className="text-xs text-gray-600">Chat instantly</div>
                  </div>
                </motion.button>

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
            onClick={() => {
              if (showChatPopup) {
                setShowChatPopup(false)
              } else if (isExpanded) {
                setIsExpanded(false)
              } else {
                setShowChatPopup(true)
              }
            }}
            className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
              showChatPopup || isExpanded
                ? 'bg-gray-800'
                : 'bg-gradient-to-br from-green-500 to-green-600'
            }`}
          >
            {showChatPopup || isExpanded ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </motion.button>

          {/* Pulse Animation */}
          {!isExpanded && !showChatPopup && (
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
              className="absolute inset-0 rounded-full bg-green-500 -z-10"
            />
          )}
        </div>
      )}
    </AnimatePresence>
  )
}
