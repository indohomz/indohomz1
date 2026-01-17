/**
 * Indohomz - Premium Property Detail Page
 * Story-driven, not data table
 */

import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Header, Footer, QuietModeProvider, useQuietMode, WhatsAppFloat } from '../components/Indohomz'
import SEO from '../components/Common/SEO'
import { getPropertyBySlug, getPropertyById } from '../data/properties'
import AvailabilityBadge from '../components/Indohomz/UI/AvailabilityBadge'
import ImageGallery from '../components/Indohomz/Features/ImageGallery'
import InquiryForm from '../components/Indohomz/Features/InquiryForm'
import AvailabilityCalendar from '../components/Indohomz/Features/AvailabilityCalendar'
import NeighborhoodGuide from '../components/Indohomz/Features/NeighborhoodGuide'

export default function IndohomzPropertyDetail() {
  return (
    <QuietModeProvider>
      <PropertyDetailContent />
    </QuietModeProvider>
  )
}

function PropertyDetailContent() {
  const { slug } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [galleryStartIndex, setGalleryStartIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6])

  // Get property from static data
  const property = slug ? (
    isNaN(Number(slug)) 
      ? getPropertyBySlug(slug) 
      : getPropertyById(Number(slug))
  ) : undefined

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-light text-stone-900 mb-4">Home not found</h2>
          <p className="text-stone-500 mb-8">The home you're looking for doesn't exist.</p>
          <Link 
            to="/properties" 
            className="inline-flex items-center gap-2 text-stone-900 font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to homes
          </Link>
        </div>
      </div>
    )
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.image_url]

  // Parse highlights for "Who this home is for"
  const highlights = property.highlights?.split(',').map(h => h.trim()) || []
  
  // Parse amenities for "What you'll love"
  const amenities = property.amenities?.split(',').map(a => a.trim()).slice(0, 8) || []

  return (
    <div className="min-h-screen bg-white">
      {/* SEO */}
      <SEO 
        property={{
          id: property.id,
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          city: property.city || 'Gurgaon',
          image: property.image_url,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area_sqft: property.area_sqft,
          property_type: property.property_type,
          amenities: amenities,
          is_available: property.is_available
        }}
      />

      {/* Header */}
      <Header variant="dark" />

      {/* Hero Image - Full Width */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <img
            src={images[activeImage]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-stone-900/20" />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Availability Badge */}
              {property.availability_status && (
                <div className="mb-4">
                  <AvailabilityBadge 
                    status={property.availability_status} 
                    text={property.availability_text}
                    size="lg"
                  />
                </div>
              )}
              <p className="text-white/70 text-sm uppercase tracking-[0.2em] mb-4">
                {property.area}
              </p>
              <h1 className="text-white text-4xl md:text-6xl font-light mb-4">
                {property.title}
              </h1>
              <PriceDisplay price={property.price} />
            </motion.div>
          </div>
        </div>

        {/* Image Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-8 right-8 z-10 flex gap-2">
            {images.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeImage 
                    ? 'bg-white w-6' 
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Back Link */}
        <Link
          to="/properties"
          className="absolute top-24 left-6 lg:left-12 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="text-sm">All Homes</span>
        </Link>
      </section>

      {/* Content */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Main Content */}
            <div className="lg:col-span-7">
              {/* Editorial Description */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-20"
              >
                <h2 className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-6">
                  The Story
                </h2>
                <p className="text-stone-600 text-xl md:text-2xl font-light leading-relaxed">
                  {property.description}
                </p>
              </motion.div>

              {/* Who This Home Is For */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-20"
              >
                <h2 className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-6">
                  Who This Home Is For
                </h2>
                <div className="space-y-4">
                  {highlights.map((highlight, index) => (
                    <p key={index} className="text-stone-900 text-lg font-light flex items-start gap-4">
                      <span className="text-stone-300 mt-1">—</span>
                      {highlight}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* What You'll Love */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-20"
              >
                <h2 className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-8">
                  What You'll Love
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {amenities.map((amenity, index) => (
                    <p key={index} className="text-stone-700 font-light">
                      {amenity}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Image Gallery */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-stone-400 text-sm uppercase tracking-[0.2em]">
                      Gallery
                    </h2>
                    <button
                      onClick={() => {
                        setGalleryStartIndex(0)
                        setShowGallery(true)
                      }}
                      className="text-stone-600 text-sm hover:text-stone-900 transition-colors flex items-center gap-2"
                    >
                      View all {images.length} photos
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {images.slice(0, 6).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setGalleryStartIndex(index)
                          setShowGallery(true)
                        }}
                        className={`relative aspect-[4/3] overflow-hidden group ${
                          index === 0 ? 'col-span-2' : ''
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} - ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                            Click to expand
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Interactive Features */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-20"
              >
                <h2 className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-8">
                  Explore More
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Availability Calendar */}
                  <AvailabilityCalendar 
                    propertyTitle={property.title}
                    propertySlug={property.slug}
                  />
                  
                  {/* Neighborhood Guide */}
                  <NeighborhoodGuide 
                    propertyTitle={property.title}
                    location={property.location}
                    latitude={property.latitude}
                    longitude={property.longitude}
                    className="md:col-span-2"
                  />
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Inquiry Form */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-8">
                {/* Inquiry Form */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <InquiryForm 
                    propertyTitle={property.title}
                    propertySlug={property.slug}
                  />
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8"
                >
                  <h3 className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
                    Location
                  </h3>
                  <p className="text-stone-700 font-light leading-relaxed">
                    {property.location}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-stone-900 text-sm font-medium hover:gap-3 transition-all duration-300"
                  >
                    View on Maps
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8"
                >
                  <h3 className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-6">
                    At a Glance
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Type</p>
                      <p className="text-stone-900 font-medium capitalize">{property.property_type}</p>
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Size</p>
                      <p className="text-stone-900 font-medium">{property.area_sqft} sq.ft</p>
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Furnishing</p>
                      <p className="text-stone-900 font-medium capitalize">{property.furnishing}</p>
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Status</p>
                      <p className="text-emerald-600 font-medium">
                        {property.is_available ? 'Available' : 'Occupied'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float - Property specific */}
      <WhatsAppFloat 
        message={`Hi! I'm interested in ${property.title} (${property.price}). Please share more details.`}
      />

      {/* Image Gallery Modal */}
      <ImageGallery
        images={images}
        initialIndex={galleryStartIndex}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        propertyTitle={property.title}
      />
    </div>
  )
}

function PriceDisplay({ price }: { price: string }) {
  const { isQuietMode } = useQuietMode()

  if (isQuietMode) {
    return null
  }

  return (
    <p className="text-white/60 text-lg font-light">
      Starting from {price}
    </p>
  )
}
