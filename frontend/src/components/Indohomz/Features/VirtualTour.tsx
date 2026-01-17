/**
 * VirtualTour - 360° Property Tour Component
 * Immersive exploration before visiting
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, RotateCcw, Eye, Compass } from 'lucide-react'

interface Props {
  propertyTitle: string
  images: string[]
  className?: string
}

interface Hotspot {
  id: string
  label: string
  x: number
  y: number
  targetImage: number
}

export default function VirtualTour({ propertyTitle, images, className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentView, setCurrentView] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [isRotating, setIsRotating] = useState(false)

  // Simulated room labels for each image
  const roomLabels = [
    'Living Area',
    'Bedroom',
    'Kitchen',
    'Bathroom',
    'Balcony',
    'Common Area'
  ]

  // Simulated hotspots for navigation
  const hotspots: Hotspot[] = [
    { id: '1', label: 'View Bedroom', x: 75, y: 45, targetImage: 1 },
    { id: '2', label: 'View Kitchen', x: 25, y: 55, targetImage: 2 },
  ]

  const handleRotate = () => {
    setIsRotating(true)
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360)
    }, 50)
    
    setTimeout(() => {
      clearInterval(interval)
      setIsRotating(false)
    }, 3000)
  }

  const navigateView = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentView(prev => (prev - 1 + images.length) % images.length)
    } else {
      setCurrentView(prev => (prev + 1) % images.length)
    }
    setRotation(0)
  }

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 p-6 text-left ${className}`}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Virtual Tour</h3>
              <p className="text-white/60 text-sm">360° Experience</p>
            </div>
          </div>
          
          <p className="text-white/70 text-sm mb-4">
            Explore every corner of this home without leaving yours
          </p>
          
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <Play className="w-4 h-4" />
            Start Tour
          </div>
        </div>
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_50%)] animate-pulse" />
        </div>
      </motion.button>

      {/* Fullscreen Tour Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
              <div>
                <h3 className="text-white font-medium">{propertyTitle}</h3>
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  {roomLabels[currentView] || `View ${currentView + 1}`}
                </p>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main 360 View */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ rotateY: rotation }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="relative w-full h-full"
                style={{ perspective: '1000px' }}
              >
                <img
                  src={images[currentView]}
                  alt={`360 view - ${roomLabels[currentView]}`}
                  className="w-full h-full object-cover"
                  style={{ 
                    transform: `scale(1.2) translateX(${(rotation - 180) * 0.5}px)`,
                    transition: isRotating ? 'none' : 'transform 0.3s ease'
                  }}
                />
                
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)] opacity-40" />
              </motion.div>

              {/* Hotspots */}
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => {
                    setCurrentView(hotspot.targetImage)
                    setRotation(0)
                  }}
                  className="absolute z-10 group"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-white items-center justify-center">
                      <span className="w-2 h-2 bg-stone-900 rounded-full" />
                    </span>
                  </span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-stone-900 text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {hotspot.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="max-w-2xl mx-auto">
                {/* Room Selector */}
                <div className="flex justify-center gap-2 mb-6">
                  {images.slice(0, 6).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentView(index)
                        setRotation(0)
                      }}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        index === currentView
                          ? 'bg-white text-stone-900 font-medium'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {roomLabels[index] || `View ${index + 1}`}
                    </button>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => navigateView('prev')}
                    className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={handleRotate}
                    disabled={isRotating}
                    className={`p-4 rounded-full transition-colors ${
                      isRotating 
                        ? 'bg-white text-stone-900' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <RotateCcw className={`w-5 h-5 ${isRotating ? 'animate-spin' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => navigateView('next')}
                    className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Instructions */}
                <p className="text-center text-white/40 text-xs mt-4">
                  Click hotspots to navigate • Use arrows to change rooms • Rotate for 360° view
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
