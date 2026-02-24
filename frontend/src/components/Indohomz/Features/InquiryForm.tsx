/**
 * InquiryForm - Property inquiry form component
 * Premium form for property inquiries with validation
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Phone, User, Mail, MessageSquare, CheckCircle, Calendar } from 'lucide-react'

interface Props {
  propertyTitle?: string
  propertySlug?: string
  onSubmit?: (data: FormData) => void
  className?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  moveInDate: string
  sharingType: string
}

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL as string
  if (import.meta.env.PROD) return 'https://indohomz-backend.onrender.com'
  return 'http://localhost:8000'
}

export default function InquiryForm({ 
  propertyTitle = '', 
  propertySlug = '',
  onSubmit,
  className = '' 
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: propertyTitle ? `Hi, I'm interested in ${propertyTitle}. Please share more details.` : '',
    moveInDate: '',
    sharingType: 'single'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const API_BASE = getApiBaseUrl()

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit phone number'
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)

    let propertyId: number | undefined

    if (propertySlug) {
      try {
        const propertyResponse = await fetch(`${API_BASE}/api/v1/properties?limit=100`)
        if (propertyResponse.ok) {
          const propertyData = await propertyResponse.json() as { items?: Array<{ id: number; slug?: string }> }
          const matched = propertyData.items?.find((item) => item.slug === propertySlug)
          if (matched) {
            propertyId = matched.id
          }
        }
      } catch {
        // If lookup fails, still submit inquiry without property mapping.
      }
    }

    try {
      await fetch(`${API_BASE}/api/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || undefined,
          phone: formData.phone,
          property_id: propertyId,
          message: `${formData.message}\nPreferred Move-in: ${formData.moveInDate || 'Flexible'}\nSharing: ${formData.sharingType}`,
          source: 'website',
        }),
      })
    } catch {
      // Keep UX uninterrupted even if backend is temporarily unavailable.
    }
    
    // Send WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `Hi IndoHomz! 👋\n\n` +
      `I'm interested in: ${propertyTitle || 'a property'}\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Preferred Move-in: ${formData.moveInDate || 'Flexible'}\n` +
      `Sharing Type: ${formData.sharingType}\n\n` +
      `Message: ${formData.message}`
    )
    
    // Open WhatsApp in new tab
    window.open(`https://wa.me/919053070100?text=${whatsappMessage}`, '_blank')
    
    onSubmit?.(formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center ${className}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h3 className="text-xl font-medium text-stone-900 mb-2">Thank You!</h3>
        <p className="text-stone-600 mb-6">
          Your inquiry has been sent. Our team will contact you within 2 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-stone-600 hover:text-stone-900 text-sm underline underline-offset-4"
        >
          Send another inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8 ${className}`}
    >
      <h3 className="text-xl font-medium text-stone-900 mb-2">Schedule a Visit</h3>
      <p className="text-stone-500 text-sm mb-6">
        Fill the form below and we'll get back to you within 2 hours
      </p>

      <div className="space-y-5">
        {/* Name Input */}
        <div>
          <label className="block text-stone-600 text-sm mb-2">Full Name *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all ${
                errors.name ? 'border-red-300 focus:ring-red-400' : 'border-stone-200'
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-stone-600 text-sm mb-2">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all ${
                errors.phone ? 'border-red-300 focus:ring-red-400' : 'border-stone-200'
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-stone-600 text-sm mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all ${
                errors.email ? 'border-red-300 focus:ring-red-400' : 'border-stone-200'
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Move-in Date & Sharing Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-600 text-sm mb-2">Move-in Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                type="date"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-stone-600 text-sm mb-2">Sharing Type</label>
            <select
              name="sharingType"
              value={formData.sharingType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
            >
              <option value="single">Single Occupancy</option>
              <option value="double">Double Sharing</option>
              <option value="triple">Triple Sharing</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-stone-600 text-sm mb-2">Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-stone-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
              rows={3}
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-stone-900 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Inquiry
            </>
          )}
        </motion.button>

        {/* Quick Contact */}
        <div className="text-center pt-4 border-t border-stone-200">
          <p className="text-stone-500 text-sm mb-2">Or call us directly</p>
          <a 
            href="tel:+919053070100"
            className="inline-flex items-center gap-2 text-stone-900 font-medium hover:text-stone-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            +91 9053070100
          </a>
        </div>
      </div>
    </motion.form>
  )
}
