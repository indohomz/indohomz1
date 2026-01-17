/**
 * Indohomz - Contact Page
 * Professional, clean, with all contact details
 */

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Header, Footer } from '../components/Indohomz'
import SEO from '../components/Common/SEO'

const contactInfo = {
  phone: '+91 9053070100',
  whatsapp: '+91 9053070100',
  email: 'info@indohomz.com',
  address: 'Plot No 1018, Lotus Villas, DLF Phase IV, Sector 27, Gurugram, Haryana 122009',
  hours: 'Mon - Sat: 9:00 AM - 8:00 PM',
}

const offices = [
  {
    city: 'Gurgaon',
    address: 'Plot No 1018, Lotus Villas, DLF Phase IV, Sector 27, Gurugram, Haryana 122009',
    phone: '+91 9053070100',
    isPrimary: true,
  },
]

const faqs = [
  {
    question: 'What is included in the rent?',
    answer: 'Rent includes furnished room, high-speed WiFi, electricity, water, daily housekeeping, laundry, 24/7 security, and access to common areas.',
  },
  {
    question: 'What is the minimum stay duration?',
    answer: 'We offer flexible stays starting from 1 month. Longer commitments often come with special pricing.',
  },
  {
    question: 'Can I visit before booking?',
    answer: 'Absolutely! We encourage property visits. Schedule a tour through WhatsApp or call us to book a convenient time.',
  },
  {
    question: 'What documents are required?',
    answer: 'You\'ll need a valid government ID (Aadhaar/Passport), company ID or admission letter, and passport-size photographs.',
  },
  {
    question: 'Is there a security deposit?',
    answer: 'Yes, we require a refundable security deposit equivalent to 1-2 months rent, returned at the end of your stay.',
  },
]

export default function IndohomzContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyInterest: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '', propertyInterest: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Contact | Indohomz"
        description="Get in touch with us. We're here to help you find your perfect home in Gurgaon."
      />

      <Header variant="light" />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
              Get In Touch
            </p>
            <h1 
              className="text-stone-900 font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Let's Find Your
              <br />
              Perfect Home
            </h1>
            <p className="text-stone-500 text-lg md:text-xl font-light">
              Have questions? Want to schedule a visit? We're here to help 
              you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Call */}
            <motion.a
              href={`tel:${contactInfo.phone}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:border-stone-200 transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-6 group-hover:bg-stone-900 transition-colors">
                <svg className="w-6 h-6 text-stone-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-stone-900 text-lg font-medium mb-2">Call Us</h3>
              <p className="text-stone-600 font-medium">{contactInfo.phone}</p>
              <p className="text-stone-400 text-sm mt-1">{contactInfo.hours}</p>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=Hi! I'm interested in Indohomz properties.`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 p-8 rounded-2xl border border-green-100 hover:bg-green-100 transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="text-stone-900 text-lg font-medium mb-2">WhatsApp</h3>
              <p className="text-green-600 font-medium">Chat with us</p>
              <p className="text-stone-400 text-sm mt-1">Quick responses guaranteed</p>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${contactInfo.email}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:border-stone-200 transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-6 group-hover:bg-stone-900 transition-colors">
                <svg className="w-6 h-6 text-stone-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-stone-900 text-lg font-medium mb-2">Email Us</h3>
              <p className="text-stone-600 font-medium">{contactInfo.email}</p>
              <p className="text-stone-400 text-sm mt-1">We reply within 24 hours</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <AnimatedSection>
                <h2 className="text-stone-900 text-3xl font-light mb-8">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-stone-900 text-xl font-medium mb-2">Message Sent!</h3>
                    <p className="text-stone-500">We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-stone-600 font-medium hover:text-stone-900"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-stone-600 text-sm mb-2">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 text-sm mb-2">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-stone-600 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 text-sm mb-2">Interested Property</label>
                      <select
                        value={formData.propertyInterest}
                        onChange={e => setFormData({ ...formData, propertyInterest: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select a property (optional)</option>
                        <option value="dlf-phase-4">Sky Living - DLF Phase IV</option>
                        <option value="sushant-lok-3">IndoHomz 571 - Sushant Lok 3</option>
                        <option value="sector-40">IndoHomz - Sector 40</option>
                        <option value="sushant-lok-1">The Sky Living - Sushant Lok 1</option>
                        <option value="general">Not sure yet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-600 text-sm mb-2">Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Office Info */}
            <div>
              <AnimatedSection delay={0.2}>
                <h2 className="text-stone-900 text-3xl font-light mb-8">
                  Visit Our Office
                </h2>

                {offices.map(office => (
                  <div key={office.city} className="mb-8">
                    <div className="bg-stone-50 rounded-2xl p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-stone-900 text-xl font-medium mb-1">
                            {office.city} {office.isPrimary && <span className="text-xs text-stone-400 font-normal">(Head Office)</span>}
                          </h3>
                          <p className="text-stone-500">{office.address}</p>
                          <p className="text-stone-600 font-medium mt-2">{office.phone}</p>
                        </div>
                      </div>

                      {/* Map Embed Placeholder */}
                      <div className="aspect-video bg-stone-200 rounded-xl overflow-hidden relative">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14026.583086086584!2d77.08!3d28.467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f0e95a0c01%3A0x8e38f1d1d4fe4f1d!2sDLF%20Phase%204%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                          className="w-full h-full border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Office Location"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-6 border border-stone-200 rounded-xl">
                  <h4 className="text-stone-900 font-medium mb-3">Office Hours</h4>
                  <div className="space-y-2 text-stone-500">
                    <div className="flex justify-between">
                      <span>Monday - Saturday</span>
                      <span className="text-stone-900">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-stone-900">10:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
                Common Questions
              </p>
              <h2 
                className="text-stone-900 font-light"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-5 flex items-center justify-between text-left"
        >
          <span className="text-stone-900 font-medium pr-4">{question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </button>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-5 text-stone-500 font-light leading-relaxed">
            {answer}
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function AnimatedSection({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
