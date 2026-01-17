/**
 * Indohomz - Luxury Properties Listing Page
 * Clean, minimal, experience-focused with gold accents
 */

import { useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Header, Footer, QuietModeProvider, useQuietMode, MoveInFilterInline } from '../components/Indohomz'
import type { MoveInTimeline } from '../components/Indohomz/Features/MoveInFilter'
import SEO from '../components/Common/SEO'
import { PROPERTIES } from '../data/properties'
import AvailabilityBadge from '../components/Indohomz/UI/AvailabilityBadge'

export default function IndohomzProperties() {
  return (
    <QuietModeProvider>
      <PropertiesContent />
    </QuietModeProvider>
  )
}

function PropertiesContent() {
  const [searchParams] = useSearchParams()
  const [moveInFilter, setMoveInFilter] = useState<MoveInTimeline>(null)
  const [activeLocation, setActiveLocation] = useState<string | null>(
    searchParams.get('location')
  )

  const locations = [...new Set(PROPERTIES.map(p => p.area))]

  const filteredProperties = PROPERTIES.filter(p => {
    if (activeLocation && p.area.toLowerCase() !== activeLocation.toLowerCase()) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-luxury-cream">
      <SEO 
        title="Homes | Indohomz - Premium Living Spaces"
        description="Explore curated living spaces designed for comfort, privacy, and simplicity in Gurgaon's finest neighborhoods."
      />

      <Header variant="light" />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-pattern-luxury opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-gold-500" />
              <p className="text-gold-600 text-xs font-sans font-medium uppercase tracking-[0.25em]">
                Curated Living Spaces
              </p>
            </div>
            
            <h1 
              className="font-display text-luxury-charcoal font-light leading-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Find Your <span className="text-gold-600">Home</span>
            </h1>
            
            <p className="text-stone-500 font-sans font-light text-lg max-w-xl">
              Each residence is handpicked to ensure it meets our exacting standards 
              for quality, comfort, and location.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 py-8 border-t border-b border-gold-500/10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Location Filter */}
              <div className="flex flex-wrap gap-3">
                <FilterButton 
                  active={!activeLocation}
                  onClick={() => setActiveLocation(null)}
                >
                  All Locations
                </FilterButton>
                {locations.map((location) => (
                  <FilterButton
                    key={location}
                    active={activeLocation === location}
                    onClick={() => setActiveLocation(location)}
                  >
                    {location}
                  </FilterButton>
                ))}
              </div>

              {/* Move-in Filter */}
              <MoveInFilterInline value={moveInFilter} onChange={setMoveInFilter} />
            </div>
          </motion.div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center gap-2"
          >
            <span className="text-gold-600 font-display text-2xl font-light">
              {filteredProperties.length}
            </span>
            <span className="text-stone-500 font-sans text-sm">
              {filteredProperties.length === 1 ? 'home' : 'homes'} available
            </span>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="space-y-28">
            {filteredProperties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                index={index}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />
              <p className="text-stone-400 font-display text-2xl mb-4">
                No homes found
              </p>
              <p className="text-stone-500 font-sans text-sm mb-8">
                Try adjusting your filters to see more options.
              </p>
              <button
                onClick={() => setActiveLocation(null)}
                className="px-6 py-3 bg-luxury-charcoal text-white font-sans text-sm rounded-full hover:bg-gold-500 transition-colors duration-300"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FilterButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode
  active: boolean
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-sans transition-all duration-300 ${
        active
          ? 'bg-luxury-charcoal text-white'
          : 'text-stone-600 hover:text-luxury-charcoal bg-white border border-gold-500/20 hover:border-gold-500'
      }`}
    >
      {children}
    </button>
  )
}

function PropertyCard({ property, index }: { property: typeof PROPERTIES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
    >
      {/* Image */}
      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <Link to={`/property/${property.slug}`} className="block group" data-cursor="view">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
            <motion.img
              src={property.image_url}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter-warm"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Gold accent corner */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold-500" />
            </div>
            
            {/* Availability Badge */}
            {property.availability_status && (
              <div className="absolute top-5 left-5">
                <AvailabilityBadge 
                  status={property.availability_status} 
                  text={property.availability_text}
                  size="md"
                />
              </div>
            )}

            {/* View button */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-luxury-charcoal text-sm font-sans font-medium rounded-full shadow-lg">
                View Home
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        {/* Location */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-gold-500" />
          <p className="text-gold-600 text-xs font-sans font-medium uppercase tracking-[0.2em]">
            {property.area}
          </p>
        </div>
        
        {/* Title */}
        <Link to={`/property/${property.slug}`}>
          <h2 className="font-display text-luxury-charcoal text-3xl md:text-4xl font-light mb-5 hover:text-gold-600 transition-colors duration-300">
            {property.title}
          </h2>
        </Link>
        
        {/* Description */}
        <p className="text-stone-500 font-sans font-light leading-relaxed mb-6 max-w-md">
          {property.description.slice(0, 160)}...
        </p>

        {/* Property details */}
        <div className="flex items-center gap-6 mb-8 text-stone-400 text-sm font-sans">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.bedrooms} Bedroom
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.area_sqft} sqft
          </span>
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <PriceDisplay price={property.price} />
          <Link
            to={`/property/${property.slug}`}
            className="group inline-flex items-center gap-3 text-luxury-charcoal"
          >
            <span className="text-sm font-sans font-medium group-hover:text-gold-600 transition-colors">
              View Details
            </span>
            <span className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
              <svg 
                className="w-4 h-4 text-gold-500 group-hover:text-white transition-colors duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function PriceDisplay({ price }: { price: string }) {
  const { isQuietMode } = useQuietMode()

  if (isQuietMode) {
    return <span />
  }

  return (
    <p className="text-stone-400 font-sans text-sm">
      From <span className="text-gold-600 font-medium text-lg">{price}</span>
    </p>
  )
}
