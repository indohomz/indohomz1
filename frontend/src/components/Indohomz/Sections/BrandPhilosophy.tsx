/**
 * Indohomz - Brand Philosophy Section
 * Apple-style typography, no icons
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const philosophyPoints = [
  {
    title: 'Fully Managed Homes',
    description: 'Every aspect of your living experience is handled with care. From maintenance to cleaning, we take care of the details so you can focus on living.',
  },
  {
    title: 'Zero Brokerage',
    description: 'No hidden fees, no middlemen. What you see is what you pay. Simple, transparent, and fair.',
  },
  {
    title: 'Verified Communities',
    description: 'Every resident is verified. Every home is inspected. Safety and quality are non-negotiable.',
  },
]

export default function BrandPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Statement */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <h2 
            className="text-stone-900 font-light leading-[1.1] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Not Just Homes.
            <br />
            <span className="text-stone-400">Curated Living.</span>
          </h2>
          <p className="text-stone-500 text-xl font-light max-w-2xl mx-auto">
            We believe living well shouldn't be complicated. That's why we've reimagined 
            what it means to find a home.
          </p>
        </motion.div>

        {/* Philosophy Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {philosophyPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="text-center md:text-left"
            >
              {/* Number */}
              <span className="text-stone-200 text-6xl md:text-7xl font-light mb-6 block">
                0{index + 1}
              </span>
              
              {/* Title */}
              <h3 className="text-stone-900 text-xl md:text-2xl font-medium mb-4">
                {point.title}
              </h3>
              
              {/* Description */}
              <p className="text-stone-500 font-light leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
