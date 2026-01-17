/**
 * ImageGallery - Fullscreen image gallery modal
 * Premium image viewing experience with swipe support
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react'

interface Props {
  images: string[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  propertyTitle?: string
}

export default function ImageGallery({ 
  images, 
  initialIndex = 0, 
  isOpen, 
  onClose,
  propertyTitle = 'Property'
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setIsZoomed(false)
    }
  }, [isOpen, initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
        case 'Escape':
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Touch handlers for swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/70 to-transparent"
        >
          <div>
            <h3 className="text-white font-medium">{propertyTitle}</h3>
            <p className="text-white/60 text-sm">
              {currentIndex + 1} of {images.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Button */}
            <button
              onClick={toggleZoom}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? (
                <ZoomOut className="w-5 h-5" />
              ) : (
                <ZoomIn className="w-5 h-5" />
              )}
            </button>

            {/* Download Button */}
            <a
              href={images[currentIndex]}
              download={`${propertyTitle}-${currentIndex + 1}.jpg`}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Download image"
            >
              <Download className="w-5 h-5" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Main Image */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`relative w-full h-full flex items-center justify-center p-4 md:p-16 ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={toggleZoom}
            >
              <motion.img
                src={images[currentIndex]}
                alt={`${propertyTitle} - Image ${currentIndex + 1}`}
                className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows - Desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 z-10 px-6 py-4 bg-gradient-to-t from-black/70 to-transparent"
          >
            <div className="flex justify-center gap-2 overflow-x-auto max-w-2xl mx-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex 
                      ? 'border-white opacity-100' 
                      : 'border-transparent opacity-50 hover:opacity-75'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Swipe Indicator - Mobile */}
        <div className="md:hidden absolute bottom-24 left-1/2 -translate-x-1/2 text-white/40 text-xs">
          Swipe to navigate • Tap to zoom
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
