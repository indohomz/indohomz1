/**
 * Indohomz - Luxury Custom Cursor
 * Premium cursor effect with gold accent ring
 * Adds sophistication to the browsing experience
 */

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface LuxuryCursorProps {
  enabled?: boolean
}

export default function LuxuryCursor({ enabled = true }: LuxuryCursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hoverText, setHoverText] = useState<string | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Mouse position with spring physics
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (!enabled) return

    // Check if device supports hover (not touch)
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for interactive elements
      const isLink = target.closest('a')
      const isButton = target.closest('button')
      const isInput = target.closest('input, textarea, select')
      const isCard = target.closest('[data-cursor="pointer"]')
      const hasViewText = target.closest('[data-cursor="view"]')
      
      if (hasViewText) {
        setIsHovering(true)
        setHoverText('View')
      } else if (isLink || isButton || isCard) {
        setIsHovering(true)
        setHoverText(null)
      } else if (isInput) {
        setIsHovering(false)
        setHoverText(null)
      } else {
        setIsHovering(false)
        setHoverText(null)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleElementHover)

    // Hide default cursor on body
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleElementHover)
      document.body.style.cursor = 'auto'
    }
  }, [enabled, cursorX, cursorY, isVisible])

  if (!enabled) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div 
          className="w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500"
          style={{ 
            boxShadow: '0 0 10px rgba(212, 165, 116, 0.3)' 
          }}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : isClicking ? 0.9 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div 
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 flex items-center justify-center ${
            isHovering 
              ? 'w-20 h-20 border-gold-500 bg-gold-500/10' 
              : 'w-10 h-10 border-gold-500/50'
          }`}
        >
          {/* Hover text */}
          {hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-gold-500 text-xs font-sans font-medium tracking-wide"
            >
              {hoverText}
            </motion.span>
          )}
        </div>
      </motion.div>
    </>
  )
}

// Simple dot cursor for minimal pages
export function SimpleCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 500 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.body.style.cursor = 'auto'
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500" />
    </motion.div>
  )
}

