/**
 * Indohomz - Premium Properties Listing Page
 * Clean, minimal, experience-focused
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
    <div className="min-h-screen bg-white">
      <SEO 
        title="Homes | Indohomz"
        description="Explore curated living spaces designed for comfort, privacy, and simplicity."
      />

      <Header variant="light" />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
              Curated Living Spaces
            </p>
            <h1 
              className="text-stone-900 font-light leading-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Find Your Home
            </h1>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-t border-b border-stone-100"
          >
            {/* Location Filter */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveLocation(null)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                  !activeLocation
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                All Locations
              </button>
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setActiveLocation(location)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                    activeLocation === location
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>

            {/* Move-in Filter */}
            <MoveInFilterInline value={moveInFilter} onChange={setMoveInFilter} />
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-24">
            {filteredProperties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                index={index}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg">
                No homes found for your criteria.
              </p>
              <button
                onClick={() => setActiveLocation(null)}
                className="mt-4 text-stone-900 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function PropertyCard({ property, index }: { property: typeof PROPERTIES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
    >
      {/* Image */}
      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <Link to={`/property/${property.slug}`} className="block group">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={property.image_url}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
            
            {/* Availability Badge */}
            {property.availability_status && (
              <div className="absolute top-4 left-4">
                <AvailabilityBadge 
                  status={property.availability_status} 
                  text={property.availability_text}
                  size="md"
                />
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <p className="text-stone-400 text-sm uppercase tracking-[0.15em] mb-3">
          {property.area}
        </p>
        <Link to={`/property/${property.slug}`}>
          <h2 className="text-stone-900 text-2xl md:text-3xl font-light mb-4 hover:text-stone-600 transition-colors">
            {property.title}
          </h2>
        </Link>
        <p className="text-stone-500 font-light leading-relaxed mb-6 max-w-md">
          {property.description.slice(0, 150)}...
        </p>
        
        <div className="flex items-center justify-between">
          <PriceDisplay price={property.price} />
          <Link
            to={`/property/${property.slug}`}
            className="group inline-flex items-center gap-3 text-stone-900"
          >
            <span className="text-sm font-medium">
              View Home
            </span>
            <span className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 transition-all duration-300">
              <svg 
                className="w-4 h-4 text-stone-600 group-hover:text-white transition-colors duration-300" 
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
    <p className="text-stone-400 text-sm">
      From <span className="text-stone-600">{price}</span>
    </p>
  )
}
