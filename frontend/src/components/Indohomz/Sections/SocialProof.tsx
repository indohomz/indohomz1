/**
 * Indohomz - Social Proof Section
 * Text-based, subtle, no testimonials
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-stone-500 text-lg md:text-xl font-light">
            Trusted by{' '}
            <span className="text-stone-900 font-medium">2,000+</span>
            {' '}residents
          </p>
          <p className="text-stone-400 text-lg md:text-xl font-light mt-2">
            across Gurgaon, Bangalore, and Pune.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
