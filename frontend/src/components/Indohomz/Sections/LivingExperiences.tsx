/**
 * Indohomz - Living Experiences Section
 * Lifestyle categories with luxury styling
 * Gold accents and elegant animations
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const experiences = [
  {
    id: 'professionals',
    title: 'Young Professionals',
    subtitle: 'Career-focused living',
    description: 'Designed for ambitious minds. Fast WiFi, dedicated workspaces, and networking opportunities built in.',
    image: '/images/properties/dlf-phase-4/5.webp',
    features: ['High-speed WiFi', 'Co-working spaces', 'Networking events'],
    link: '/properties?lifestyle=professional',
  },
  {
    id: 'students',
    title: 'Students',
    subtitle: 'Study in comfort',
    description: 'Focus on what matters. Quiet study areas, affordable pricing, and a community that understands deadlines.',
    image: '/images/properties/sector-40/4.webp',
    features: ['Quiet study areas', 'Affordable pricing', 'Peer community'],
    link: '/properties?lifestyle=student',
  },
  {
    id: 'couples',
    title: 'Couples',
    subtitle: 'Privacy & togetherness',
    description: 'Your first home together. Private spaces with community benefits, without compromising on quality.',
    image: '/images/properties/sushant-lok-2/3S7A1332_3_4.webp',
    features: ['Private suites', 'Couple-friendly', 'Premium amenities'],
    link: '/properties?lifestyle=couples',
  },
]

export default function LivingExperiences() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-white overflow-hidden"
    >
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-luxury" />
      
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-gold-500" />
            <span className="text-gold-600 text-xs font-sans font-medium uppercase tracking-[0.25em]">
              Lifestyle Living
            </span>
            <div className="w-8 h-px bg-gold-500" />
          </div>

          <h2 
            className="font-display text-luxury-charcoal font-light leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Choose Your <span className="text-gold-600">Experience</span>
          </h2>

          <p className="text-stone-500 font-sans font-light text-lg max-w-2xl mx-auto">
            Different lifestyles, one standard of excellence. Find the community that fits your journey.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.2 + index * 0.15,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className="group"
    >
      <Link to={experience.link} className="block" data-cursor="view">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-stone-100">
          <motion.img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 filter-warm"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-luxury-charcoal/20 to-transparent" />
          <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-500" />
          
          {/* Gold corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold-500" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-gold-400 text-xs font-sans uppercase tracking-[0.2em] mb-2">
              {experience.subtitle}
            </p>
            <h3 className="font-display text-white text-2xl font-light mb-3">
              {experience.title}
            </h3>
            <p className="text-white/70 font-sans text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {experience.description}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-3">
          {experience.features.map((feature, i) => (
            <span 
              key={i}
              className="px-4 py-2 bg-luxury-sand text-stone-600 text-xs font-sans tracking-wide rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-gold-600 font-sans text-sm font-medium">
            Explore this lifestyle
          </span>
          <svg 
            className="w-4 h-4 text-gold-600 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}
