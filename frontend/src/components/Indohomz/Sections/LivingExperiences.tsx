/**
 * Indohomz - Living Experiences Section
 * Lifestyle choices, not real-estate categories
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const experiences = [
  {
    id: 'private-rooms',
    title: 'Private Rooms',
    subtitle: 'Your personal sanctuary',
    description: 'Thoughtfully designed private spaces within curated homes. Perfect for those who value independence with the convenience of shared amenities.',
    image: '/images/properties/dlf-phase-4/2.webp',
    link: '/properties?type=private',
  },
  {
    id: 'studio-living',
    title: 'Studio Living',
    subtitle: 'Complete independence',
    description: 'Self-contained studios for those who want their own kitchen, bathroom, and living space. All the privacy, none of the hassle.',
    image: '/images/properties/sushant-lok-2/1.webp',
    link: '/properties?type=studio',
  },
  {
    id: 'community-homes',
    title: 'Community Homes',
    subtitle: 'Connect and thrive',
    description: 'Vibrant shared spaces designed for social connection. Ideal for those who value community and meaningful relationships.',
    image: '/images/properties/dlf-phase-4/5.webp',
    link: '/properties?type=community',
  },
]

export default function LivingExperiences() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
            Choose Your Lifestyle
          </p>
          <h2 
            className="text-stone-900 font-light leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Living Experiences
          </h2>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-32">
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={experience.id}
              experience={experience}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ 
  experience, 
  index,
  isInView 
}: { 
  experience: typeof experiences[0]
  index: number
  isInView: boolean
}) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Image */}
      <div className={`order-1 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <Link to={experience.link} className="block group">
          <div className="relative overflow-hidden aspect-[4/3]">
            <motion.img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className={`order-2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <p className="text-stone-400 text-sm uppercase tracking-[0.15em] mb-4">
          {experience.subtitle}
        </p>
        <h3 className="text-stone-900 text-3xl md:text-4xl font-light mb-6">
          {experience.title}
        </h3>
        <p className="text-stone-500 text-lg font-light leading-relaxed mb-8 max-w-md">
          {experience.description}
        </p>
        <Link
          to={experience.link}
          className="group inline-flex items-center gap-3 text-stone-900"
        >
          <span className="text-sm font-medium uppercase tracking-wider">
            Discover
          </span>
          <span className="w-8 h-px bg-stone-300 group-hover:w-12 transition-all duration-300" />
        </Link>
      </div>
    </motion.div>
  )
}
