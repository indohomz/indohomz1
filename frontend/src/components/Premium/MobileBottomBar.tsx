/**
 * Mobile Bottom Action Bar
 * Clean, organized bottom toolbar for mobile
 * Consolidates all floating actions into one elegant bar
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Scale, Search, Moon, Sun, X, Phone } from 'lucide-react'

interface Props {
  onOpenChat: () => void
  onOpenCompare: () => void
  onOpenSearch: () => void
  isDarkMode?: boolean
  onToggleDarkMode?: () => void
  whatsappNumber?: string
}

export default function MobileBottomBar({
  onOpenChat,
  onOpenCompare,
  onOpenSearch,
  isDarkMode = false,
  onToggleDarkMode,
  whatsappNumber = '919053070100'
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank')
  }

  return (
    <>
      {/* Backdrop when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
          />
        )}
      </AnimatePresence>

      {/* Mobile Bottom Bar - Only visible on mobile */}
      <div 
        className="md:hidden fixed bottom-0 left-0 right-0 z-[95]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Expanded Actions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full left-0 right-0 p-4 pb-2"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden">
                {/* Action Items */}
                <div className="divide-y divide-stone-100">
                  <ActionItem 
                    icon={<MessageCircle className="w-5 h-5" />}
                    label="AI Property Assistant"
                    sublabel="Get instant help finding your home"
                    onClick={() => { onOpenChat(); setIsExpanded(false); }}
                  />
                  <ActionItem 
                    icon={<Scale className="w-5 h-5" />}
                    label="Compare Properties"
                    sublabel="Compare up to 3 properties"
                    onClick={() => { onOpenCompare(); setIsExpanded(false); }}
                  />
                  <ActionItem 
                    icon={<Search className="w-5 h-5" />}
                    label="Find My Home"
                    sublabel="Take our quick matching quiz"
                    onClick={() => { onOpenSearch(); setIsExpanded(false); }}
                  />
                  <ActionItem 
                    icon={<Phone className="w-5 h-5" />}
                    label="WhatsApp Us"
                    sublabel="Chat directly with our team"
                    onClick={() => { handleWhatsApp(); setIsExpanded(false); }}
                    highlight
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Bar */}
        <div className="bg-luxury-charcoal border-t border-stone-800">
          <div className="flex items-center justify-around py-2 px-4">
            {/* WhatsApp Quick Action */}
            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center gap-1 py-2 px-3 text-stone-400 active:text-gold-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="text-[10px] font-sans">WhatsApp</span>
            </button>

            {/* AI Chat */}
            <button
              onClick={onOpenChat}
              className="flex flex-col items-center gap-1 py-2 px-3 text-stone-400 active:text-gold-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-luxury-charcoal" />
              </div>
              <span className="text-[10px] font-sans">AI Chat</span>
            </button>

            {/* Compare */}
            <button
              onClick={onOpenCompare}
              className="flex flex-col items-center gap-1 py-2 px-3 text-stone-400 active:text-gold-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center">
                <Scale className="w-5 h-5 text-gold-500" />
              </div>
              <span className="text-[10px] font-sans">Compare</span>
            </button>

            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="flex flex-col items-center gap-1 py-2 px-3 text-stone-400 active:text-gold-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center">
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-gold-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-stone-300" />
                  )}
                </div>
                <span className="text-[10px] font-sans">{isDarkMode ? 'Light' : 'Dark'}</span>
              </button>
            )}

            {/* More Options */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex flex-col items-center gap-1 py-2 px-3 text-stone-400 active:text-gold-500 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isExpanded ? 'bg-gold-500' : 'bg-stone-700'
              }`}>
                {isExpanded ? (
                  <X className={`w-5 h-5 ${isExpanded ? 'text-luxury-charcoal' : 'text-stone-300'}`} />
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                  </div>
                )}
              </div>
              <span className="text-[10px] font-sans">More</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// Action Item Component for expanded menu
function ActionItem({ 
  icon, 
  label, 
  sublabel, 
  onClick,
  highlight = false
}: { 
  icon: React.ReactNode
  label: string
  sublabel: string
  onClick: () => void
  highlight?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 active:bg-stone-50 transition-colors text-left"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        highlight ? 'bg-green-100 text-green-600' : 'bg-gold-100 text-gold-600'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-sans font-medium text-luxury-charcoal">{label}</p>
        <p className="text-sm text-stone-500 font-light">{sublabel}</p>
      </div>
      <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

