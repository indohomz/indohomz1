/**
 * Indohomz - Map Discovery Section
 * Dark-mode map, smooth transitions
 */

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROPERTIES } from '../../../data/properties'

interface Location {
  id: string
  name: string
  city: string
  homes: number
  description: string
  coordinates: { x: number; y: number }
}

const locations: Location[] = [
  {
    id: 'gurgaon',
    name: 'Gurgaon',
    city: 'Haryana',
    homes: PROPERTIES.filter(p => p.city === 'Gurgaon').length,
    description: 'The corporate heart of NCR. Premium homes near DLF Cyber City, Golf Course Road, and Sohna Road.',
    coordinates: { x: 45, y: 38 },
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    city: 'Karnataka',
    homes: 12,
    description: 'India\'s tech capital. Vibrant neighborhoods near Koramangala, HSR Layout, and Whitefield.',
    coordinates: { x: 42, y: 72 },
  },
  {
    id: 'pune',
    name: 'Pune',
    city: 'Maharashtra',
    homes: 8,
    description: 'Where tradition meets innovation. Living spaces in Hinjewadi, Kharadi, and Baner.',
    coordinates: { x: 32, y: 58 },
  },
]

export default function MapDiscovery() {
  const [activeLocation, setActiveLocation] = useState<Location>(locations[0])
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">
            Find Your Place
          </p>
          <h2 
            className="text-white font-light leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Discover by Location
          </h2>
        </motion.div>

        {/* Map and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square lg:aspect-[4/3] bg-stone-900 rounded-lg overflow-hidden"
          >
            {/* India Map SVG - Simplified */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full opacity-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              >
                {/* Simplified India outline */}
                <path 
                  d="M30,15 L45,10 L55,12 L65,15 L70,20 L72,30 L75,40 L73,50 L70,55 L68,65 L60,75 L50,85 L45,82 L40,75 L35,70 L30,60 L28,50 L25,40 L28,30 L30,20 Z"
                  className="text-stone-600"
                />
              </svg>
            </div>

            {/* Location Markers */}
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  activeLocation.id === location.id ? 'z-20' : 'z-10'
                }`}
                style={{ 
                  left: `${location.coordinates.x}%`, 
                  top: `${location.coordinates.y}%` 
                }}
              >
                <motion.div
                  animate={activeLocation.id === location.id ? { scale: 1.2 } : { scale: 1 }}
                  className={`relative ${
                    activeLocation.id === location.id ? 'text-white' : 'text-stone-500'
                  }`}
                >
                  {/* Pulse effect for active */}
                  {activeLocation.id === location.id && (
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 w-4 h-4 bg-white rounded-full"
                    />
                  )}
                  {/* Dot */}
                  <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                    activeLocation.id === location.id ? 'bg-white' : 'bg-stone-600 hover:bg-stone-400'
                  }`} />
                  {/* Label */}
                  <span className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm transition-colors duration-300 ${
                    activeLocation.id === location.id ? 'text-white' : 'text-stone-500'
                  }`}>
                    {location.name}
                  </span>
                </motion.div>
              </button>
            ))}
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* City Name */}
                <h3 className="text-white text-4xl md:text-5xl font-light mb-2">
                  {activeLocation.name}
                </h3>
                <p className="text-stone-500 text-lg mb-8">
                  {activeLocation.city}
                </p>

                {/* Homes Count */}
                <div className="mb-8">
                  <span className="text-white text-6xl font-light">
                    {activeLocation.homes}
                  </span>
                  <span className="text-stone-500 text-xl ml-3">
                    homes available
                  </span>
                </div>

                {/* Description */}
                <p className="text-stone-400 text-lg font-light leading-relaxed mb-10 max-w-md">
                  {activeLocation.description}
                </p>

                {/* CTA */}
                <Link
                  to={`/properties?location=${activeLocation.id}`}
                  className="group inline-flex items-center gap-4"
                >
                  <span className="text-white text-sm font-medium uppercase tracking-wider">
                    Explore {activeLocation.name}
                  </span>
                  <span className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <svg 
                      className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Location Buttons */}
            <div className="flex gap-4 mt-16">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setActiveLocation(location)}
                  className={`px-6 py-3 rounded-full text-sm transition-all duration-300 ${
                    activeLocation.id === location.id
                      ? 'bg-white text-stone-900'
                      : 'bg-transparent border border-stone-700 text-stone-400 hover:border-stone-500'
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
