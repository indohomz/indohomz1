/**
 * Animated Statistics Counter
 * Premium counting animation with scroll trigger
 */

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
}

interface Props {
  stats?: Stat[]
  className?: string
}

const defaultStats: Stat[] = [
  { value: 500, suffix: '+', label: 'Happy Families', description: 'Living their best life' },
  { value: 50, suffix: '+', label: 'Premium Properties', description: 'Across Gurgaon' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', description: 'From our residents' },
  { value: 24, suffix: '/7', label: 'Support', description: 'Always here for you' },
]

function AnimatedNumber({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 2000 
}: { 
  value: number
  suffix?: string
  prefix?: string
  duration?: number 
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      setDisplayValue(Math.floor(value * easeOutExpo))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export default function AnimatedStats({ stats = defaultStats, className = '' }: Props) {
  return (
    <section className={`py-24 md:py-32 bg-luxury-charcoal relative overflow-hidden ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4A574 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-4">
            Our Impact
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-white font-light">
            Numbers that speak
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Number */}
              <div className="font-display text-5xl md:text-7xl font-light text-gold-500 mb-4 group-hover:scale-110 transition-transform duration-500">
                <AnimatedNumber 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix}
                />
              </div>

              {/* Gold line */}
              <div className="w-12 h-px bg-gold-500/30 mx-auto mb-4 group-hover:w-20 transition-all duration-500" />

              {/* Label */}
              <h3 className="text-white font-sans font-medium text-lg mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              {stat.description && (
                <p className="text-stone-400 font-sans text-sm font-light">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

