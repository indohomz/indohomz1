/**
 * Indohomz - Gurgaon Map Discovery Section
 * Dark-mode interactive map with property markers
 */

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROPERTIES } from '../../../data/properties'
import ScrollReveal from '../Animations/ScrollReveal'

// Gurgaon property locations with coordinates
const gurgaonLocations = [
  {
    id: 'dlf-phase-4',
    name: 'DLF Phase 4',
    description: 'Premium location near Cyber City & Golf Course Road',
    homes: PROPERTIES.filter(p => p.area.includes('DLF')).length || 1,
    coordinates: { lat: 28.4675, lng: 77.0839 },
    mapPosition: { x: 65, y: 35 },
  },
  {
    id: 'sushant-lok',
    name: 'Sushant Lok',
    description: 'Well-connected residential hub near Metro & markets',
    homes: PROPERTIES.filter(p => p.area.includes('Sushant')).length || 2,
    coordinates: { lat: 28.4690, lng: 77.0730 },
    mapPosition: { x: 45, y: 40 },
  },
  {
    id: 'sector-40',
    name: 'Sector 40',
    description: 'Budget-friendly area near Unitech Cyber Park & NH-8',
    homes: PROPERTIES.filter(p => p.area.includes('Sector 40')).length || 1,
    coordinates: { lat: 28.4598, lng: 77.0489 },
    mapPosition: { x: 25, y: 55 },
  },
  {
    id: 'malibu-town',
    name: 'Malibu Town',
    description: 'Peaceful residential area with modern amenities',
    homes: PROPERTIES.filter(p => p.area.includes('Malibu') || p.title.includes('241')).length || 1,
    coordinates: { lat: 28.4500, lng: 77.0500 },
    mapPosition: { x: 30, y: 65 },
  },
]

export default function GurgaonMap() {
  const [activeLocation, setActiveLocation] = useState(gurgaonLocations[0])
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-stone-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">
              All Properties in Gurgaon
            </p>
            <h2 
              className="text-white font-light leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Discover Your Neighborhood
            </h2>
          </div>
        </ScrollReveal>

        {/* Map and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Interactive Map */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative aspect-square lg:aspect-[4/3] bg-stone-900 rounded-2xl overflow-hidden border border-stone-800">
              {/* Gurgaon Map Background */}
              <div className="absolute inset-0">
                {/* Road grid pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                  {/* Major roads */}
                  <path d="M10,50 L90,50" stroke="#57534E" strokeWidth="0.8" fill="none" />
                  <path d="M50,10 L50,90" stroke="#57534E" strokeWidth="0.8" fill="none" />
                  <path d="M20,20 L80,80" stroke="#57534E" strokeWidth="0.5" fill="none" />
                  <path d="M80,20 L20,80" stroke="#57534E" strokeWidth="0.5" fill="none" />
                  
                  {/* Grid */}
                  {[20, 40, 60, 80].map(pos => (
                    <g key={pos}>
                      <path d={`M${pos},10 L${pos},90`} stroke="#44403C" strokeWidth="0.3" fill="none" />
                      <path d={`M10,${pos} L90,${pos}`} stroke="#44403C" strokeWidth="0.3" fill="none" />
                    </g>
                  ))}
                </svg>

                {/* Area labels */}
                <div className="absolute top-[20%] left-[70%] text-stone-700 text-[10px] uppercase tracking-wider">
                  Cyber City
                </div>
                <div className="absolute top-[30%] left-[20%] text-stone-700 text-[10px] uppercase tracking-wider">
                  NH-48
                </div>
                <div className="absolute bottom-[25%] right-[15%] text-stone-700 text-[10px] uppercase tracking-wider">
                  Golf Course Rd
                </div>
                <div className="absolute top-[60%] left-[15%] text-stone-700 text-[10px] uppercase tracking-wider">
                  Sector 40
                </div>
              </div>

              {/* Location Markers */}
              {gurgaonLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setActiveLocation(location)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
                    activeLocation.id === location.id ? 'z-20' : 'z-10'
                  }`}
                  style={{ 
                    left: `${location.mapPosition.x}%`, 
                    top: `${location.mapPosition.y}%` 
                  }}
                >
                  {/* Pulse ring for active */}
                  {activeLocation.id === location.id && (
                    <motion.div
                      animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 w-5 h-5 -m-0.5 bg-white rounded-full"
                    />
                  )}
                  
                  {/* Marker dot */}
                  <motion.div
                    animate={activeLocation.id === location.id ? { scale: 1.3 } : { scale: 1 }}
                    className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      activeLocation.id === location.id 
                        ? 'bg-white border-white' 
                        : 'bg-stone-700 border-stone-600 hover:bg-stone-500 hover:border-stone-400'
                    }`}
                  />
                  
                  {/* Label */}
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
                      activeLocation.id === location.id ? 'text-white' : 'text-stone-500'
                    }`}
                  >
                    {location.name}
                  </motion.span>
                </button>
              ))}

              {/* Map attribution */}
              <div className="absolute bottom-4 left-4 text-stone-600 text-xs">
                Gurgaon, Haryana
              </div>
            </div>
          </ScrollReveal>

          {/* Location Details */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="flex flex-col justify-center h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-white text-4xl md:text-5xl font-light mb-4">
                    {activeLocation.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-white text-5xl md:text-6xl font-light">
                      {activeLocation.homes}
                    </span>
                    <span className="text-stone-400 text-xl">
                      {activeLocation.homes === 1 ? 'home' : 'homes'} available
                    </span>
                  </div>

                  <p className="text-stone-400 text-lg font-light leading-relaxed mb-8 max-w-md">
                    {activeLocation.description}
                  </p>

                  <Link
                    to={`/properties?location=${activeLocation.id}`}
                    className="group inline-flex items-center gap-4"
                  >
                    <span className="text-white text-sm font-medium uppercase tracking-wider">
                      View Homes in {activeLocation.name}
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

              {/* Location Pills */}
              <div className="flex flex-wrap gap-3 pt-8 border-t border-stone-800">
                {gurgaonLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setActiveLocation(location)}
                    className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                      activeLocation.id === location.id
                        ? 'bg-white text-stone-900'
                        : 'bg-transparent border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-300'
                    }`}
                  >
                    {location.name}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Total Stats */}
        <ScrollReveal delay={0.5}>
          <div className="mt-20 pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-stone-500 text-sm uppercase tracking-wider mb-2">Total Available</p>
              <p className="text-white text-3xl font-light">
                {PROPERTIES.length} Curated Homes
              </p>
            </div>
            <Link
              to="/properties"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
            >
              <span className="font-medium">View All Properties</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
