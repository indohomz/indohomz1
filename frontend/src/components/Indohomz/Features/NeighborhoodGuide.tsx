/**
 * NeighborhoodGuide - What's nearby interactive map
 * Walking distances to metro, cafes, gyms, hospitals
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, Train, Coffee, Dumbbell, Cross, ShoppingBag, 
  GraduationCap, Building2, X, Navigation, Star,
  Clock, Footprints
} from 'lucide-react'

interface NearbyPlace {
  id: string
  name: string
  category: PlaceCategory
  distance: string
  walkTime: string
  rating?: number
  isOpen?: boolean
}

type PlaceCategory = 'metro' | 'food' | 'gym' | 'hospital' | 'shopping' | 'office' | 'education'

interface Props {
  propertyTitle: string
  location: string
  latitude?: number
  longitude?: number
  className?: string
}

const categoryConfig: Record<PlaceCategory, { 
  icon: typeof MapPin
  label: string
  color: string
  bgColor: string
}> = {
  metro: { icon: Train, label: 'Metro Station', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  food: { icon: Coffee, label: 'Food & Cafes', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  gym: { icon: Dumbbell, label: 'Fitness', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  hospital: { icon: Cross, label: 'Healthcare', color: 'text-red-600', bgColor: 'bg-red-50' },
  shopping: { icon: ShoppingBag, label: 'Shopping', color: 'text-pink-600', bgColor: 'bg-pink-50' },
  office: { icon: Building2, label: 'Offices', color: 'text-stone-600', bgColor: 'bg-stone-100' },
  education: { icon: GraduationCap, label: 'Education', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
}

export default function NeighborhoodGuide({ 
  propertyTitle: _propertyTitle, 
  location,
  latitude,
  longitude,
  className = '' 
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all'>('all')
  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null)

  // Simulated nearby places data - in production, this would come from Google Places API
  const nearbyPlaces: NearbyPlace[] = [
    // Metro
    { id: '1', name: 'HUDA City Centre Metro', category: 'metro', distance: '800m', walkTime: '10 min', rating: 4.5 },
    { id: '2', name: 'Sikanderpur Metro Station', category: 'metro', distance: '1.2 km', walkTime: '15 min', rating: 4.3 },
    
    // Food & Cafes
    { id: '3', name: 'Starbucks Reserve', category: 'food', distance: '300m', walkTime: '4 min', rating: 4.4, isOpen: true },
    { id: '4', name: 'Chaayos', category: 'food', distance: '450m', walkTime: '6 min', rating: 4.2, isOpen: true },
    { id: '5', name: 'Haldiram\'s', category: 'food', distance: '500m', walkTime: '7 min', rating: 4.0, isOpen: true },
    
    // Gym
    { id: '6', name: 'Cult.fit Gym', category: 'gym', distance: '600m', walkTime: '8 min', rating: 4.6, isOpen: true },
    { id: '7', name: 'Gold\'s Gym', category: 'gym', distance: '900m', walkTime: '12 min', rating: 4.3 },
    
    // Hospital
    { id: '8', name: 'Fortis Memorial Hospital', category: 'hospital', distance: '2.1 km', walkTime: '25 min', rating: 4.5 },
    { id: '9', name: 'Max Hospital', category: 'hospital', distance: '3.5 km', walkTime: '45 min', rating: 4.7 },
    
    // Shopping
    { id: '10', name: 'Ambience Mall', category: 'shopping', distance: '1.8 km', walkTime: '22 min', rating: 4.4 },
    { id: '11', name: 'DLF Mega Mall', category: 'shopping', distance: '2.2 km', walkTime: '28 min', rating: 4.2 },
    
    // Offices
    { id: '12', name: 'Cyber Hub', category: 'office', distance: '1.5 km', walkTime: '18 min', rating: 4.6 },
    { id: '13', name: 'DLF Cyber City', category: 'office', distance: '2.0 km', walkTime: '24 min', rating: 4.4 },
    
    // Education
    { id: '14', name: 'Amity University', category: 'education', distance: '4.5 km', walkTime: '55 min', rating: 4.1 },
    { id: '15', name: 'British School', category: 'education', distance: '1.8 km', walkTime: '22 min', rating: 4.5 },
  ]

  const filteredPlaces = activeCategory === 'all' 
    ? nearbyPlaces 
    : nearbyPlaces.filter(p => p.category === activeCategory)

  const openGoogleMaps = (place: NearbyPlace) => {
    const query = encodeURIComponent(`${place.name}, Gurgaon`)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
  }

  const openDirections = () => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank')
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank')
    }
  }

  return (
    <>
      {/* Trigger Card */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group text-left w-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 hover:border-blue-200 transition-all ${className}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-blue-600 text-sm font-medium bg-blue-100 px-3 py-1 rounded-full">
            Interactive Map
          </span>
        </div>
        
        <h3 className="text-stone-900 font-medium mb-1">Neighborhood Guide</h3>
        <p className="text-stone-500 text-sm mb-4">
          Explore what's nearby - metro, cafes, gyms & more
        </p>
        
        {/* Quick stats */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
            <Train className="w-3 h-3" /> 10 min to metro
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
            <Coffee className="w-3 h-3" /> 5+ cafes nearby
          </span>
        </div>
      </motion.button>

      {/* Full Guide Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-stone-100 px-6 py-4 z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-medium text-stone-900">Neighborhood Guide</h2>
                    <p className="text-stone-500 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={openDirections}
                      className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                    >
                      <X className="w-5 h-5 text-stone-500" />
                    </button>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === 'all'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    All Places
                  </button>
                  {(Object.keys(categoryConfig) as PlaceCategory[]).map(cat => {
                    const config = categoryConfig[cat]
                    const Icon = config.icon
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                          activeCategory === cat
                            ? 'bg-stone-900 text-white'
                            : `${config.bgColor} ${config.color} hover:opacity-80`
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {config.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Places List */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPlaces.map(place => {
                    const config = categoryConfig[place.category]
                    const Icon = config.icon
                    
                    return (
                      <motion.div
                        key={place.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedPlace?.id === place.id 
                            ? 'border-stone-900 bg-stone-50' 
                            : 'border-stone-100 hover:border-stone-200'
                        }`}
                        onClick={() => setSelectedPlace(
                          selectedPlace?.id === place.id ? null : place
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${config.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium text-stone-900 truncate">{place.name}</h4>
                              {place.isOpen && (
                                <span className="flex-shrink-0 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  Open
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3 mt-1 text-sm text-stone-500">
                              <span className="flex items-center gap-1">
                                <Footprints className="w-3 h-3" />
                                {place.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {place.walkTime}
                              </span>
                              {place.rating && (
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  {place.rating}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded view */}
                        <AnimatePresence>
                          {selectedPlace?.id === place.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-stone-100"
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openGoogleMaps(place)
                                }}
                                className="w-full py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                              >
                                <Navigation className="w-4 h-4" />
                                Open in Google Maps
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>

                {filteredPlaces.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-stone-400">No places found in this category</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-stone-50 border-t border-stone-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-stone-500 text-sm">
                    {filteredPlaces.length} places nearby
                  </p>
                  <p className="text-stone-400 text-xs">
                    Data powered by local insights
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
