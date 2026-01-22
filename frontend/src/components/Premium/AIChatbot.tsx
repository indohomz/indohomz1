/**
 * AI Chatbot Component
 * Smart property assistant with pre-built responses
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, Home, MapPin, IndianRupee } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: Date
  suggestions?: string[]
}

const QUICK_REPLIES = [
  "Show me 3 BHK in DLF Phase 4",
  "What's available under ₹30,000?",
  "Properties near metro station",
  "Furnished apartments",
  "Schedule a visit",
]

const BOT_RESPONSES: Record<string, { text: string; suggestions?: string[] }> = {
  'default': {
    text: "Hello! I'm your AI property assistant. How can I help you find your perfect home today?",
    suggestions: ["Show properties", "Budget options", "Book a visit", "Contact agent"]
  },
  '3bhk': {
    text: "Great choice! We have 3 beautiful 3BHK properties in DLF Phase 4:\n\n🏠 Sky Living - ₹45,000/month (Fully Furnished)\n🏠 Horizon Heights - ₹38,000/month (Semi-Furnished)\n🏠 Green Valley - ₹42,000/month (Fully Furnished)\n\nWould you like to schedule a visit?",
    suggestions: ["View Sky Living", "Schedule visit", "More options", "Talk to agent"]
  },
  'under': {
    text: "I found 5 amazing properties under ₹30,000:\n\n✨ Cozy Studio in Sector 40 - ₹18,000\n✨ 1BHK in Sushant Lok - ₹22,000\n✨ Shared Villa Room - ₹12,000\n✨ 2BHK in Malibu Town - ₹28,000\n✨ Premium PG - ₹15,000\n\nWhich one interests you?",
    suggestions: ["View all", "1BHK only", "Furnished only", "Book visit"]
  },
  'metro': {
    text: "Properties within 5 mins of metro:\n\n🚇 Rapid Metro - DLF Phase 4 (3 properties)\n🚇 HUDA City Centre - Sector 29 (2 properties)\n🚇 Sikanderpur - Sector 40 (4 properties)\n\nAll our properties are strategically located!",
    suggestions: ["DLF Phase 4", "Sector 40", "Show on map", "All locations"]
  },
  'furnished': {
    text: "All our properties come with premium furnishing:\n\n✅ Premium mattresses & bedding\n✅ Modern kitchen appliances\n✅ Smart TV & high-speed WiFi\n✅ Designer furniture\n✅ Air conditioning\n\nWant to see our fully furnished options?",
    suggestions: ["Show furnished", "Semi-furnished", "Compare", "Book tour"]
  },
  'visit': {
    text: "Perfect! I can help you schedule a visit.\n\n📅 Available slots:\n• Today, 4:00 PM - 7:00 PM\n• Tomorrow, 10:00 AM - 6:00 PM\n• Weekend slots available\n\nOr you can WhatsApp us directly at +91 9053070100 for instant booking!",
    suggestions: ["Book for today", "Tomorrow morning", "Weekend visit", "WhatsApp now"]
  },
}

function getBotResponse(message: string): { text: string; suggestions?: string[] } {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('3bhk') || lowerMessage.includes('3 bhk') || lowerMessage.includes('dlf')) {
    return BOT_RESPONSES['3bhk']
  }
  if (lowerMessage.includes('under') || lowerMessage.includes('budget') || lowerMessage.includes('30000') || lowerMessage.includes('30,000')) {
    return BOT_RESPONSES['under']
  }
  if (lowerMessage.includes('metro') || lowerMessage.includes('near')) {
    return BOT_RESPONSES['metro']
  }
  if (lowerMessage.includes('furnished') || lowerMessage.includes('furnish')) {
    return BOT_RESPONSES['furnished']
  }
  if (lowerMessage.includes('visit') || lowerMessage.includes('schedule') || lowerMessage.includes('book') || lowerMessage.includes('tour')) {
    return BOT_RESPONSES['visit']
  }
  
  return BOT_RESPONSES['default']
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'bot',
        text: BOT_RESPONSES['default'].text,
        timestamp: new Date(),
        suggestions: BOT_RESPONSES['default'].suggestions,
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(() => {
      const response = getBotResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response.text,
        timestamp: new Date(),
        suggestions: response.suggestions,
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  return (
    <>
      {/* Chat Button - Mobile Optimized */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className={`fixed z-50 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/30 flex items-center justify-center active:scale-95 md:hover:scale-110 transition-transform touch-feedback
                    /* Mobile: Larger button, better position */
                    bottom-20 right-4 w-14 h-14
                    /* Desktop */
                    md:bottom-24 md:right-6 md:w-14 md:h-14 ${
          isOpen ? 'hidden' : ''
        }`}
        style={{ bottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <MessageCircle className="w-6 h-6" />
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-30" />
      </motion.button>

      {/* Chat Window - Mobile Optimized */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed z-50 bg-white shadow-2xl overflow-hidden flex flex-col border border-stone-200
                       /* Mobile: Full screen sheet */
                       inset-0 rounded-none
                       /* Tablet & Desktop: Floating window */
                       md:inset-auto md:bottom-6 md:right-6 md:w-[380px] md:h-[600px] md:rounded-2xl md:max-h-[80vh]"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {/* Mobile drag handle */}
            <div className="md:hidden w-full flex justify-center pt-3 pb-1 bg-gradient-to-r from-luxury-charcoal to-luxury-espresso">
              <div className="w-10 h-1 bg-stone-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="bg-gradient-to-r from-luxury-charcoal to-luxury-espresso p-4 pt-2 md:pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-white font-sans font-medium">AI Property Assistant</h3>
                  <p className="text-stone-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Online now
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white transition-colors tap-target"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'bot' 
                      ? 'bg-gold-500/20 text-gold-600' 
                      : 'bg-luxury-charcoal text-white'
                  }`}>
                    {message.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Message bubble */}
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                      message.type === 'bot' 
                        ? 'bg-white text-stone-700 shadow-sm border border-stone-100' 
                        : 'bg-luxury-charcoal text-white'
                    }`}>
                      {message.text}
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendMessage(suggestion)}
                            className="px-3 py-1.5 text-xs bg-white border border-gold-200 text-gold-700 rounded-full hover:bg-gold-50 hover:border-gold-300 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-stone-100">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-white border-t border-stone-100">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {QUICK_REPLIES.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(reply)}
                    className="flex-shrink-0 px-3 py-1.5 text-xs bg-stone-100 text-stone-600 rounded-full hover:bg-gold-100 hover:text-gold-700 transition-colors flex items-center gap-1"
                  >
                    {idx === 0 && <Home className="w-3 h-3" />}
                    {idx === 1 && <IndianRupee className="w-3 h-3" />}
                    {idx === 2 && <MapPin className="w-3 h-3" />}
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-stone-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                  placeholder="Ask about properties..."
                  className="flex-1 px-4 py-3 bg-stone-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 rounded-xl bg-gold-500 text-white flex items-center justify-center hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

