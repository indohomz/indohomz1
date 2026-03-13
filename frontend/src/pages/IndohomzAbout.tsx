/**
 * Indohomz - About Page
 * Premium, impressive, story-driven
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Header, Footer } from '../components/Indohomz'
import SEO from '../components/Common/SEO'

const stats = [
  { number: '5000+', label: 'Happy Residents' },
  { number: '6', label: 'Curated Homes' },
  { number: '98%', label: 'Satisfaction Rate' },
  { number: '24/7', label: 'Support Available' },
]

const values = [
  {
    title: 'Comfort First',
    description: 'Every space is designed with your well-being in mind. From ergonomic furniture to ambient lighting, we sweat the details so you can relax.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Privacy Matters',
    description: 'Your space is your sanctuary. We respect boundaries and ensure every resident enjoys the privacy they deserve.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Community Spirit',
    description: 'Live independently, but never alone. Our thoughtfully designed common spaces foster genuine connections.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Hassle-Free Living',
    description: 'Bills, maintenance, WiFi, housekeeping — all included. Just move in with your bags and start living.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const team = [
  {
    name: 'Founders',
    role: 'Vision & Leadership',
    description: 'Young entrepreneurs passionate about transforming how professionals live in cities.',
  },
  {
    name: 'Operations Team',
    role: 'Day-to-Day Excellence',
    description: 'Dedicated professionals ensuring every home runs smoothly, every day.',
  },
  {
    name: 'Support Team',
    role: '24/7 Assistance',
    description: 'Always available to help with anything you need, anytime.',
  },
]

export default function IndohomzAbout() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About | Indohomz - Live Better"
        description="We're building the future of urban living. Premium co-living spaces designed for comfort, community, and convenience."
      />

      <Header variant="dark" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
            alt="Modern living space"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-6 max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-stone-400 text-sm uppercase tracking-[0.3em] mb-6"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white font-light leading-tight mb-8"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Redefining How
            <br />
            Professionals Live
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-stone-300 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            We believe everyone deserves a beautiful, comfortable space to call home. 
            That's why we're on a mission to make premium living accessible.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-6">
              Our Mission
            </p>
            <h2 
              className="text-stone-900 font-light leading-snug"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              "We're not just providing rooms. We're creating <span className="text-stone-500">spaces where life happens</span> — 
              where careers flourish, friendships form, and memories are made."
            </h2>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-light text-stone-900 mb-2">
                    {stat.number}
                  </p>
                  <p className="text-stone-500 text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="max-w-2xl mb-20">
              <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
                What We Stand For
              </p>
              <h2 
                className="text-stone-900 font-light"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Our Values
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.15}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-stone-900 text-xl font-medium mb-3">
                      {value.title}
                    </h3>
                    <p className="text-stone-500 font-light leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Indohomz */}
      <section className="py-32 md:py-40 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection direction="left">
              <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
                Why Choose Us
              </p>
              <h2 
                className="font-light mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                More Than Just
                <br />
                a Place to Stay
              </h2>
              <div className="space-y-6 text-stone-300 font-light leading-relaxed">
                <p>
                  Traditional PGs and rentals in Gurgaon are often cramped, poorly maintained, 
                  and come with a laundry list of restrictions. We saw a better way.
                </p>
                <p>
                  Indohomz homes are designed for modern professionals who refuse to compromise 
                  on quality. Spacious rooms, premium amenities, professional management, and 
                  a welcoming community.
                </p>
                <p>
                  Whether you're a startup founder, corporate professional, or creative freelancer — 
                  we've got the perfect space for you.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053"
                  alt="Premium living space"
                  className="rounded-lg w-full"
                />
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-xl">
                  <p className="text-stone-900 text-3xl font-light mb-1">4.9/5</p>
                  <p className="text-stone-500 text-sm">Resident Rating</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
                The People Behind Indohomz
              </p>
              <h2 
                className="text-stone-900 font-light"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Our Team
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.15}>
                <div className="text-center p-8 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors duration-300">
                  <div className="w-20 h-20 rounded-full bg-stone-200 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-stone-900 text-xl font-medium mb-1">
                    {member.name}
                  </h3>
                  <p className="text-stone-500 text-sm uppercase tracking-wider mb-4">
                    {member.role}
                  </p>
                  <p className="text-stone-500 font-light">
                    {member.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-stone-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h2 
              className="text-stone-900 font-light mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Ready to Experience
              <br />
              Better Living?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/properties"
                className="px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Explore Homes
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-stone-300 text-stone-900 rounded-full font-medium hover:bg-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Animated section wrapper
function AnimatedSection({ 
  children, 
  delay = 0,
  direction = 'up' 
}: { 
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const getInitial = () => {
    switch (direction) {
      case 'left': return { opacity: 0, x: -50 }
      case 'right': return { opacity: 0, x: 50 }
      default: return { opacity: 0, y: 40 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
