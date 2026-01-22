/**
 * Indohomz - Luxury Landing Page
 * Premium lifestyle-first living platform
 * Calm. Premium. Global. Aspirational.
 * "What kind of life will I live here?"
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Header,
  Footer,
  HeroSection,
  LivingExperiences,
  FeaturedHomes,
  BrandPhilosophy,
  GurgaonMap,
  SocialProof,
  QuietModeProvider,
  QuietModeToggle,
  SmartHomeMatch,
  WhatsAppFloat,
} from '../components/Indohomz'
import SEO from '../components/Common/SEO'
import IntroReveal from '../components/Indohomz/Features/IntroReveal'
import GuidedDiscovery from '../components/Indohomz/Features/GuidedDiscovery'
import LivingInsights from '../components/Indohomz/Sections/LivingInsights'
import BreathingSpace from '../components/Indohomz/Sections/BreathingSpace'
import { ThemeProvider, ThemeToggle } from '../components/Indohomz/Features/ThemeProvider'

// Premium Components
import {
  ParticlesBackground,
  AnimatedStats,
  ScrollProgress,
  AIChatbot,
  PropertyComparison,
  TestimonialSlider,
  CompareButton,
} from '../components/Premium'

export default function IndohomzLanding() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showDiscovery, setShowDiscovery] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  return (
    <ThemeProvider>
      <QuietModeProvider>
        {/* Intro Reveal - Delayed Entry */}
        <IntroReveal onComplete={() => setIntroComplete(true)} />

        <div className={`min-h-screen bg-luxury-cream transition-opacity duration-700 ${
          introComplete ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* SEO */}
          <SEO 
            title="Indohomz | Live Better. Not Louder."
            description="Curated homes for people who value comfort, privacy, and simplicity. Premium co-living spaces in Gurgaon's finest neighborhoods."
          />

          {/* Scroll Progress Indicator */}
          <ScrollProgress color="#D4A574" height={3} />

          {/* Floating Particles Background */}
          <ParticlesBackground particleCount={30} color="#D4A574" />

          {/* Header */}
          <Header variant="dark" />

          {/* Main Content */}
          <main>
            {/* Hero - Full Screen */}
            <HeroSection />

            {/* Breathing Space - The Pause */}
            <BreathingSpace 
              quote="Living should feel effortless."
              size="lg"
            />

            {/* Living Experiences */}
            <LivingExperiences />

            {/* Guided Discovery CTA - Dramatic pause */}
            <section className="py-32 md:py-44 bg-luxury-sand relative overflow-hidden">
              {/* Subtle pattern */}
              <div className="absolute inset-0 bg-pattern-luxury opacity-30" />
              
              {/* Gold accents */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
              
              <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-gold-600 text-xs font-sans uppercase tracking-[0.3em] mb-8"
                >
                  Not sure where to start?
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  onClick={() => setShowDiscovery(true)}
                  className="group inline-flex items-center gap-6"
                >
                  <span className="font-display text-2xl md:text-4xl font-light text-luxury-charcoal tracking-tight group-hover:text-gold-600 transition-colors duration-500">
                    Help me find my space
                  </span>
                  <span className="w-14 h-14 rounded-full border-2 border-gold-500/40 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500">
                    <svg className="w-5 h-5 text-gold-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </div>
            </section>

            {/* Featured Homes - Horizontal Scroll */}
            <FeaturedHomes />

            {/* Breathing Space - The Recognition */}
            <BreathingSpace 
              quote="The best homes are not found. They're recognized."
              size="md"
              variant="light"
            />

            {/* Brand Philosophy */}
            <BrandPhilosophy />

            {/* Animated Statistics */}
            <AnimatedStats />

            {/* Living Insights - Data Section */}
            <LivingInsights />

            {/* Premium Testimonials */}
            <TestimonialSlider />

            {/* Gurgaon Map - Dark Section */}
            <GurgaonMap />

            {/* Breathing Space - The Statement */}
            <BreathingSpace 
              quote="5,000+ chose differently."
              size="lg"
              variant="dark"
            />

            {/* Social Proof */}
            <SocialProof />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Features */}
          <QuietModeToggle />
          <SmartHomeMatch />
          <WhatsAppFloat phoneNumber="919053070100" />
          
          {/* AI Chatbot */}
          <AIChatbot />
          
          {/* Property Comparison Button */}
          <CompareButton onClick={() => setShowComparison(true)} />
          
          {/* Theme Toggle - Bottom Left */}
          <div className="fixed bottom-6 left-6 z-50">
            <ThemeToggle />
          </div>
        </div>

        {/* Guided Discovery Modal */}
        <GuidedDiscovery 
          isOpen={showDiscovery} 
          onClose={() => setShowDiscovery(false)} 
        />
        
        {/* Property Comparison Modal */}
        <PropertyComparison 
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />
      </QuietModeProvider>
    </ThemeProvider>
  )
}
