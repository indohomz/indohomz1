/**
 * Scroll Progress Indicator
 * Premium progress bar showing page scroll position
 */

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

interface Props {
  color?: string
  height?: number
  position?: 'top' | 'bottom'
  showPercentage?: boolean
}

export default function ScrollProgress({
  color = '#D4A574',
  height = 3,
  position = 'top',
  showPercentage = false,
}: Props) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100))
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={`fixed left-0 right-0 z-[100] origin-left ${
          position === 'top' ? 'top-0' : 'bottom-0'
        }`}
        style={{
          scaleX,
          height,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}80`,
        }}
      />

      {/* Percentage indicator (optional) */}
      {showPercentage && percentage > 0 && percentage < 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`fixed right-6 z-[100] ${
            position === 'top' ? 'top-6' : 'bottom-6'
          }`}
        >
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-sans font-medium"
            style={{ 
              backgroundColor: `${color}20`,
              color: color,
              border: `2px solid ${color}40`
            }}
          >
            {percentage}%
          </div>
        </motion.div>
      )}
    </>
  )
}

