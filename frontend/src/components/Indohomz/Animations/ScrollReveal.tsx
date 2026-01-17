/**
 * Indohomz - Scroll Reveal Animation Component
 * Subtle fade + translate on scroll
 */

import { ReactNode, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  threshold?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 40,
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once, 
    amount: threshold
  })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 }
      case 'down': return { y: -distance, x: 0 }
      case 'left': return { x: distance, y: 0 }
      case 'right': return { x: -distance, y: 0 }
      case 'none': return { x: 0, y: 0 }
    }
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children reveal
interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  containerDelay?: number
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.1,
  containerDelay = 0,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: containerDelay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

// Text reveal character by character
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  const words = text.split(' ')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.08,
      },
    },
  }

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Parallax scroll effect
interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const yOffset = speed * 50 // Calculate offset based on speed
  
  return (
    <motion.div
      className={className}
      initial={{ y: yOffset }}
      whileInView={{ y: -yOffset }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
