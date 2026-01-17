/**
 * Indohomz - Horizontal Scroll Featured Homes
 * One home visible at a time, large images dominate
 */

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROPERTIES, type AvailabilityStatus } from '../../../data/properties'
import AvailabilityBadge from '../UI/AvailabilityBadge'

export default function FeaturedHomes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const featuredHomes = PROPERTIES.slice(0, 5).map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.area,
    description: p.description.slice(0, 100) + '...',
    price: p.price,
    image: p.image_url,
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
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section ref={containerRef} className="py-32 md:py-40 bg-stone-50">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
              Curated Selection
            </p>
            <h2 
              className="text-stone-900 font-light leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Featured Homes
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo('left')}
              disabled={!canScrollLeft}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft 
                  ? 'border-stone-300 hover:bg-stone-900 hover:border-stone-900 hover:text-white text-stone-600' 
                  : 'border-stone-200 text-stone-300 cursor-not-allowed'
              }`}
              aria-label="Previous home"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo('right')}
              disabled={!canScrollRight}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight 
                  ? 'border-stone-300 hover:bg-stone-900 hover:border-stone-900 hover:text-white text-stone-600' 
                  : 'border-stone-200 text-stone-300 cursor-not-allowed'
              }`}
              aria-label="Next home"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 lg:px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredHomes.map((home, index) => (
          <HomeCard key={home.id} home={home} isActive={index === activeIndex} />
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        <div className="flex gap-2">
          {featuredHomes.map((_, index) => (
            <div 
              key={index}
              className={`h-0.5 transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-12 bg-stone-900' 
                  : 'w-6 bg-stone-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function HomeCard({ home, isActive }: { home: {
  id: number
  slug: string
  title: string
  location: string
  description: string
  price: string
  image: string
  availability_status?: AvailabilityStatus
  availability_text?: string
}; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0.7 }}
      transition={{ duration: 0.5 }}
      className="flex-shrink-0 w-[85vw] md:w-[75vw] lg:w-[60vw] snap-center"
    >
      <Link to={`/property/${home.slug}`} className="block group">
        {/* Image with mood shift */}
        <div className="relative aspect-[16/10] overflow-hidden mb-8 bg-stone-200">
          <motion.img
            src={home.image}
            alt={home.title}
            className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03]"
            whileHover={{ filter: 'brightness(1.05) saturate(1.1)' }}
          />
          {/* Warm atmospheric overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Availability Badge */}
          {home.availability_status && (
            <div className="absolute top-4 left-4">
              <AvailabilityBadge 
                status={home.availability_status} 
                text={home.availability_text}
                size="md"
              />
            </div>
          )}

          {/* Subtle "Explore" hint on hover */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <span className="text-white/80 text-xs uppercase tracking-[0.2em]">Explore →</span>
          </div>
        </div>

        {/* Content with text slide effect */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1 overflow-hidden">
            <p className="text-stone-400 text-xs uppercase tracking-[0.2em] mb-3 transform transition-transform duration-500 group-hover:translate-x-1">
              {home.location}
            </p>
            <h3 className="text-stone-900 text-2xl md:text-3xl lg:text-4xl font-light mb-3 transform transition-all duration-500 group-hover:translate-x-2 group-hover:text-stone-800">
              {home.title}
            </h3>
            <p className="text-stone-400 font-light max-w-lg transition-colors duration-500 group-hover:text-stone-500">
              {home.description}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-stone-300 text-sm tracking-wide">
              from <span className="text-stone-600 font-medium">{home.price}</span>
            </p>
            <span className="inline-flex items-center gap-3 text-stone-900 text-sm tracking-wide group-hover:gap-5 transition-all duration-500">
              View
              <svg className="w-4 h-4 transform transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
