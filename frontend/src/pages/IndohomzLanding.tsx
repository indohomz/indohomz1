/**
 * Indohomz - Premium Landing Page
 * Calm. Premium. Global. Aspirational.
 * "What kind of life will I live here?"
 */

import { useState } from 'react'
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

export default function IndohomzLanding() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showDiscovery, setShowDiscovery] = useState(false)

  return (
    <ThemeProvider>
      <QuietModeProvider>
        {/* Intro Reveal - Delayed Entry */}
        <IntroReveal onComplete={() => setIntroComplete(true)} />

        <div className={`min-h-screen bg-white transition-opacity duration-500 ${
          introComplete ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* SEO */}
          <SEO 
            title="Indohomz | Live Better. Not Louder."
            description="Curated homes for people who value comfort, privacy, and simplicity. Premium co-living spaces in Gurgaon, Bangalore, and Pune."
          />

          {/* Header */}
          <Header variant="light" />

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
            <section className="py-32 md:py-44 bg-stone-100">
              <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                <p className="text-stone-400 text-xs uppercase tracking-[0.3em] mb-8">
                  Not sure where to start?
                </p>
                <button
                  onClick={() => setShowDiscovery(true)}
                  className="group inline-flex items-center gap-5 text-stone-800 hover:text-stone-900 transition-all duration-500"
                >
                  <span className="text-2xl md:text-3xl font-light tracking-tight">
                    Help me find my space
                  </span>
                  <span className="w-14 h-14 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 transition-all duration-500">
                    <svg className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
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

            {/* Living Insights - Data Section */}
            <LivingInsights />

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
      </QuietModeProvider>
    </ThemeProvider>
  )
}
