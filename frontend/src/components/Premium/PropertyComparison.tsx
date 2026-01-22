/**
 * Property Comparison Tool
 * Compare up to 3 properties side by side
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Scale, Check, Minus, MapPin, Bed, Bath, Square, Wifi, Car, Shield, Zap } from 'lucide-react'
import { PROPERTIES as allProperties } from '../../data/properties'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const COMPARISON_FEATURES = [
  { key: 'price', label: 'Monthly Rent', icon: null },
  { key: 'area_sqft', label: 'Area (sq.ft)', icon: Square },
  { key: 'bedrooms', label: 'Bedrooms', icon: Bed },
  { key: 'bathrooms', label: 'Bathrooms', icon: Bath },
  { key: 'furnishing', label: 'Furnishing', icon: null },
  { key: 'location', label: 'Location', icon: MapPin },
]

const AMENITIES = [
  { key: 'wifi', label: 'High-Speed WiFi', icon: Wifi },
  { key: 'parking', label: 'Parking', icon: Car },
  { key: 'security', label: '24/7 Security', icon: Shield },
  { key: 'power', label: 'Power Backup', icon: Zap },
]

export default function PropertyComparison({ isOpen, onClose }: Props) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [showSelector, setShowSelector] = useState(false)

  const selectedData = selectedProperties.map(id => 
    allProperties.find(p => p.id === id)
  ).filter(Boolean)

  const addProperty = (id: string) => {
    if (selectedProperties.length < 3 && !selectedProperties.includes(id)) {
      setSelectedProperties([...selectedProperties, id])
    }
    setShowSelector(false)
  }

  const removeProperty = (id: string) => {
    setSelectedProperties(selectedProperties.filter(p => p !== id))
  }

  const hasAmenity = (property: any, amenity: string) => {
    const amenitiesStr = (property?.amenities || '').toLowerCase()
    return amenitiesStr.includes(amenity.toLowerCase())
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white shadow-2xl overflow-hidden
                   /* Mobile: Full screen sheet from bottom */
                   fixed inset-x-0 bottom-0 rounded-t-3xl max-h-[95vh]
                   /* Desktop: Centered modal */
                   md:relative md:inset-auto md:max-w-5xl md:max-h-[90vh] md:rounded-2xl md:mx-4"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Mobile drag handle */}
        <div className="md:hidden w-full flex justify-center pt-3 bg-luxury-charcoal">
          <div className="w-12 h-1.5 bg-stone-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="bg-luxury-charcoal px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Scale className="w-5 h-5 md:w-6 md:h-6 text-gold-500" />
            <div>
              <h2 className="text-white font-display text-lg md:text-xl">Compare Properties</h2>
              <p className="text-stone-400 text-xs md:text-sm hidden sm:block">Select up to 3 properties to compare</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors tap-target">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          {/* Property Slots - Horizontal scroll on mobile */}
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 bg-stone-50 border-b overflow-x-auto snap-x scrollbar-hide">
            {[0, 1, 2].map((slot) => {
              const property = selectedData[slot]
              
              if (property) {
                return (
                  <div key={slot} className="relative group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200">
                      <div className="relative h-40">
                        <img 
                          src={property.image_url} 
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeProperty(property.id)}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg text-luxury-charcoal line-clamp-1">
                          {property.title}
                        </h3>
                        <p className="text-gold-600 font-sans font-medium mt-1">
                          {property.price}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <button
                  key={slot}
                  onClick={() => setShowSelector(true)}
                  className="flex-shrink-0 w-[200px] md:w-auto h-56 md:h-64 border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-gold-500 active:border-gold-500 hover:bg-gold-50/50 active:bg-gold-50/50 transition-all group snap-center touch-feedback"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                    <Plus className="w-6 h-6 text-stone-400 group-hover:text-gold-600" />
                  </div>
                  <span className="text-stone-500 font-sans group-hover:text-gold-600">
                    Add Property
                  </span>
                </button>
              )
            })}
          </div>

          {/* Comparison Table */}
          {selectedData.length > 0 && (
            <div className="p-6">
              {/* Basic Features */}
              <h3 className="font-display text-lg text-luxury-charcoal mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-gold-500" />
                Basic Details
              </h3>
              <div className="space-y-3 mb-8">
                {COMPARISON_FEATURES.map((feature) => (
                  <div key={feature.key} className="grid grid-cols-4 gap-4 items-center">
                    <div className="text-stone-500 font-sans text-sm flex items-center gap-2">
                      {feature.icon && <feature.icon className="w-4 h-4" />}
                      {feature.label}
                    </div>
                    {[0, 1, 2].map((slot) => {
                      const property = selectedData[slot]
                      const value = property?.[feature.key as keyof typeof property]
                      
                      return (
                        <div key={slot} className="text-center">
                          {property ? (
                            <span className="font-sans font-medium text-luxury-charcoal">
                              {feature.key === 'area_sqft' ? `${value} sq.ft` : value || '-'}
                            </span>
                          ) : (
                            <span className="text-stone-300">-</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <h3 className="font-display text-lg text-luxury-charcoal mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-gold-500" />
                Amenities
              </h3>
              <div className="space-y-3">
                {AMENITIES.map((amenity) => (
                  <div key={amenity.key} className="grid grid-cols-4 gap-4 items-center">
                    <div className="text-stone-500 font-sans text-sm flex items-center gap-2">
                      <amenity.icon className="w-4 h-4" />
                      {amenity.label}
                    </div>
                    {[0, 1, 2].map((slot) => {
                      const property = selectedData[slot]
                      const has = property && hasAmenity(property, amenity.label.split(' ')[0])
                      
                      return (
                        <div key={slot} className="text-center">
                          {property ? (
                            has ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <Minus className="w-5 h-5 text-stone-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-stone-300">-</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {selectedData.length === 0 && (
            <div className="p-12 text-center">
              <Scale className="w-16 h-16 text-stone-200 mx-auto mb-4" />
              <h3 className="font-display text-xl text-stone-400 mb-2">No properties selected</h3>
              <p className="text-stone-400 text-sm">Click "Add Property" to start comparing</p>
            </div>
          )}
        </div>

        {/* Property Selector Modal */}
        <AnimatePresence>
          {showSelector && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center p-6"
              onClick={() => setShowSelector(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl w-full max-w-2xl max-h-[70vh] overflow-hidden"
              >
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-display text-lg">Select a Property</h3>
                  <button onClick={() => setShowSelector(false)}>
                    <X className="w-5 h-5 text-stone-400" />
                  </button>
                </div>
                <div className="p-4 overflow-auto max-h-[calc(70vh-60px)] grid grid-cols-2 gap-3">
                  {allProperties
                    .filter(p => !selectedProperties.includes(p.id))
                    .map((property) => (
                      <button
                        key={property.id}
                        onClick={() => addProperty(property.id)}
                        className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 hover:border-gold-500 hover:bg-gold-50/50 transition-all text-left"
                      >
                        <img 
                          src={property.image_url} 
                          alt={property.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans font-medium text-sm line-clamp-1">{property.title}</h4>
                          <p className="text-gold-600 text-sm">{property.price}</p>
                        </div>
                      </button>
                    ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

