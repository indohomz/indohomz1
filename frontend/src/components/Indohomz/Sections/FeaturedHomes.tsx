/**
 * Indohomz - Luxury Featured Homes Section
 * Horizontal scroll with premium property cards
 * Gold accents, elegant typography, smooth animations
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROPERTIES, type AvailabilityStatus } from '../../../data/properties'
import { normalizeImageUrl } from '../../../services/liveProperties'
import AvailabilityBadge from '../UI/AvailabilityBadge'

export default function FeaturedHomes() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const featuredHomes = PROPERTIES.slice(0, 5).map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.area,
    description: p.description.slice(0, 120) + '...',
    price: p.price,
    image: normalizeImageUrl(p.image_url, p.id),
    bedrooms: p.bedrooms,
    sqft: p.area_sqft,
    availability_status: p.availability_status,
    availability_text: p.availability_text,
  }))

  const updateScrollButtons = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const newIndex = Math.round(scrollLeft / clientWidth)
    setActiveIndex(newIndex)
    updateScrollButtons()
  }

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const { clientWidth } = scrollRef.current
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    updateScrollButtons()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true })
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-44 bg-luxury-cream relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-pattern-luxury opacity-30" />
      
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <div>
            {/* Label */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-px bg-gold-500" />
              <p className="text-gold-600 text-xs font-sans font-medium uppercase tracking-[0.25em]">
                Curated Selection
              </p>
            </motion.div>
            
            {/* Title */}
            <h2 
              className="font-display text-luxury-charcoal font-light leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Featured <span className="text-gold-600">Homes</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-stone-500 font-sans font-light mt-4 max-w-md">
              Handpicked residences that exemplify comfort, style, and modern living.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <NavigationButton 
              direction="left" 
              onClick={() => scrollTo('left')} 
              disabled={!canScrollLeft} 
            />
            <NavigationButton 
              direction="right" 
              onClick={() => scrollTo('right')} 
              disabled={!canScrollRight} 
            />
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-8 lg:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 lg:px-16 relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredHomes.map((home, index) => (
          <LuxuryHomeCard 
            key={home.id} 
            home={home} 
            index={index}
          />
        ))}
        
        {/* View All Card */}
        <ViewAllCard />
      </div>

      {/* Progress Indicators */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-16 relative z-10">
        <div className="flex items-center gap-3">
          {featuredHomes.map((_, index) => (
            <motion.div 
              key={index}
              className={`h-0.5 rounded-full transition-all duration-500 ${
                index === activeIndex 
                  ? 'w-16 bg-gold-500' 
                  : 'w-8 bg-stone-300'
              }`}
              animate={{ 
                width: index === activeIndex ? 64 : 32,
                backgroundColor: index === activeIndex ? '#D4A574' : '#D6CFC4'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Navigation Button Component
function NavigationButton({ 
  direction, 
  onClick, 
  disabled 
}: { 
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean 
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
        disabled
          ? 'border-stone-200 text-stone-300 cursor-not-allowed'
          : 'border-gold-500/40 text-gold-600 hover:bg-gold-500 hover:border-gold-500 hover:text-white'
      }`}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} home`}
    >
      <svg 
        className={`w-5 h-5 transition-transform duration-300 ${
          !disabled && direction === 'right' ? 'group-hover:translate-x-0.5' : ''
        } ${
          !disabled && direction === 'left' ? 'group-hover:-translate-x-0.5' : ''
        }`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        {direction === 'left' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        )}
      </svg>
    </button>
  )
}

// Luxury Home Card Component
function LuxuryHomeCard({ 
  home, 
  index
}: { 
  home: {
    id: number
    slug: string
    title: string
    location: string
    description: string
    price: string
    image: string
    bedrooms: number
    sqft: number
    availability_status?: AvailabilityStatus
    availability_text?: string
  }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] snap-center"
    >
      <Link to={`/property/${home.slug}`} className="block group">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 mb-8">
          {/* Image with parallax effect */}
          <motion.img
            src={home.image}
            alt={home.title}
            className="w-full h-full object-cover transition-all duration-1000 ease-out filter-warm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Availability Badge */}
          {home.availability_status && (
            <div className="absolute top-5 left-5">
              <AvailabilityBadge 
                status={home.availability_status} 
                text={home.availability_text}
                size="md"
              />
            </div>
          )}

          {/* View button on hover */}
          <motion.div 
            className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-luxury-charcoal text-sm font-sans font-medium rounded-full shadow-lg">
              View Home
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.div>

          {/* Gold corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold-500" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            {/* Location */}
            <motion.p 
              className="text-gold-600 text-xs font-sans font-medium uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-4 h-px bg-gold-500" />
              {home.location}
            </motion.p>
            
            {/* Title */}
            <h3 className="font-display text-luxury-charcoal text-2xl md:text-3xl lg:text-4xl font-light mb-4 group-hover:text-gold-700 transition-colors duration-500">
              {home.title}
            </h3>
            
            {/* Description */}
            <p className="text-stone-500 font-sans font-light leading-relaxed max-w-xl">
              {home.description}
            </p>

            {/* Property details */}
            <div className="flex items-center gap-6 mt-5 text-stone-400 text-sm font-sans">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {home.bedrooms} Bed
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {home.sqft} sqft
              </span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-stone-400 text-sm font-sans">
              from <span className="text-gold-600 font-medium text-lg">{home.price}</span>
            </p>
            <span className="inline-flex items-center gap-3 text-luxury-charcoal text-sm font-sans font-medium group-hover:text-gold-600 transition-colors duration-300">
              Explore
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// View All Card
function ViewAllCard() {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] snap-center flex items-center justify-center">
      <Link 
        to="/properties"
        className="group flex flex-col items-center justify-center w-full aspect-[16/10] bg-luxury-sand border-2 border-dashed border-gold-500/30 hover:border-gold-500 transition-all duration-500"
      >
        <div className="w-20 h-20 rounded-full border-2 border-gold-500/40 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500">
          <svg 
            className="w-8 h-8 text-gold-500 group-hover:text-white transition-colors duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <p className="font-display text-2xl text-luxury-charcoal mb-2">View All Homes</p>
        <p className="text-stone-500 text-sm font-sans">Explore our complete collection</p>
      </Link>
    </div>
  )
}
