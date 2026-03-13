/**
 * Testimonial Video/Image Slider
 * Premium testimonials with video support
 */

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star, Play, Pause } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  image: string
  video?: string
  rating: number
  text: string
  highlight: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Software Engineer',
    location: 'DLF Phase 4',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
    text: 'Moving to IndoHomz was the best decision I made. The space is beautifully designed, and the community feel is amazing. I finally have a place that feels like home.',
    highlight: 'Feels like home'
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    role: 'Product Manager',
    location: 'Sector 40',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
    text: 'The attention to detail in these properties is incredible. From the furniture to the amenities, everything is premium quality. Worth every rupee.',
    highlight: 'Premium quality'
  },
  {
    id: '3',
    name: 'Ananya Gupta',
    role: 'UX Designer',
    location: 'Sushant Lok',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 5,
    text: 'I was skeptical about co-living, but IndoHomz changed my perspective. The privacy is maintained while having access to amazing shared spaces.',
    highlight: 'Perfect balance'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    role: 'Startup Founder',
    location: 'Golf Course Road',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    rating: 5,
    text: 'As a founder, I needed a space that supported my lifestyle. The high-speed WiFi, quiet work areas, and networking opportunities are perfect.',
    highlight: 'Perfect for founders'
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const current = testimonials[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === testimonials.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  return (
    <section className="py-24 md:py-32 bg-luxury-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-luxury-sand/50 -skew-x-12 transform origin-top-right" />
      
      {/* Large quote decoration */}
      <Quote className="absolute top-20 left-10 w-32 h-32 text-gold-500/10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold-600 text-xs font-sans uppercase tracking-[0.3em] mb-4">
            What Residents Say
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-luxury-charcoal font-light">
            Stories from our community
          </h2>
        </motion.div>

        {/* Main testimonial */}
        <div className="max-w-3xl mx-auto">
          {/* Text side */}
          <div className="">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < current.rating ? 'text-gold-500 fill-gold-500' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-2xl md:text-3xl text-luxury-charcoal font-light leading-relaxed mb-8">
                  "{current.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-sans font-medium text-luxury-charcoal">
                      {current.name}
                    </h4>
                    <p className="text-stone-500 text-sm">
                      {current.role} • {current.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-12">
              <button
                onClick={() => navigate(-1)}
                className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center hover:border-gold-500 hover:bg-gold-50 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-stone-600" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center hover:border-gold-500 hover:bg-gold-50 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-stone-600" />
              </button>

              {/* Dots */}
              <div className="flex gap-2 ml-auto">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-8 bg-gold-500'
                        : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

