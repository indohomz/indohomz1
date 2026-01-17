/**
 * Indohomz - Smart Home Match
 * Soft AI - 3 questions, 1 recommendation
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROPERTIES } from '../../../data/properties'

type Step = 'intro' | 'budget' | 'duration' | 'lifestyle' | 'result'

interface Answers {
  budget: 'economy' | 'mid' | 'premium' | null
  duration: 'short' | 'medium' | 'long' | null
  lifestyle: 'quiet' | 'social' | null
}

export default function SmartHomeMatch() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<Step>('intro')
  const [answers, setAnswers] = useState<Answers>({
    budget: null,
    duration: null,
    lifestyle: null,
  })

  const reset = () => {
    setStep('intro')
    setAnswers({ budget: null, duration: null, lifestyle: null })
  }

  const getRecommendation = () => {
    // Simple matching logic
    let filtered = [...PROPERTIES]

    // Budget filter
    if (answers.budget === 'economy') {
      filtered = filtered.filter(p => {
        const price = parseInt(p.price.replace(/[^\d]/g, ''))
        return price < 20000
      })
    } else if (answers.budget === 'mid') {
      filtered = filtered.filter(p => {
        const price = parseInt(p.price.replace(/[^\d]/g, ''))
        return price >= 20000 && price < 30000
      })
    } else if (answers.budget === 'premium') {
      filtered = filtered.filter(p => {
        const price = parseInt(p.price.replace(/[^\d]/g, ''))
        return price >= 30000
      })
    }

    // Return first match or fallback
    return filtered[0] || PROPERTIES[0]
  }

  const recommendation = step === 'result' ? getRecommendation() : null

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-5 py-3 bg-stone-900 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="text-sm font-medium">Find My Home</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => { setIsOpen(false); reset(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {step === 'intro' && (
                  <StepContent key="intro">
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-8 h-8 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-light text-stone-900 mb-4">
                        Find Your Perfect Home
                      </h2>
                      <p className="text-stone-500 mb-8 max-w-sm mx-auto">
                        Answer 3 quick questions and we'll recommend the best home for your lifestyle.
                      </p>
                      <button
                        onClick={() => setStep('budget')}
                        className="px-8 py-3 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
                      >
                        Let's Start
                      </button>
                    </div>
                  </StepContent>
                )}

                {step === 'budget' && (
                  <StepContent key="budget">
                    <QuestionStep
                      question="What's your budget range?"
                      step={1}
                      options={[
                        { value: 'economy', label: 'Under ₹20,000/month' },
                        { value: 'mid', label: '₹20,000 - ₹30,000/month' },
                        { value: 'premium', label: '₹30,000+ /month' },
                      ]}
                      value={answers.budget}
                      onChange={(value) => {
                        setAnswers({ ...answers, budget: value as any })
                        setTimeout(() => setStep('duration'), 300)
                      }}
                    />
                  </StepContent>
                )}

                {step === 'duration' && (
                  <StepContent key="duration">
                    <QuestionStep
                      question="How long do you plan to stay?"
                      step={2}
                      options={[
                        { value: 'short', label: '1-3 months' },
                        { value: 'medium', label: '3-6 months' },
                        { value: 'long', label: '6+ months' },
                      ]}
                      value={answers.duration}
                      onChange={(value) => {
                        setAnswers({ ...answers, duration: value as any })
                        setTimeout(() => setStep('lifestyle'), 300)
                      }}
                    />
                  </StepContent>
                )}

                {step === 'lifestyle' && (
                  <StepContent key="lifestyle">
                    <QuestionStep
                      question="What's your lifestyle preference?"
                      step={3}
                      options={[
                        { value: 'quiet', label: 'Quiet & Private' },
                        { value: 'social', label: 'Social & Community' },
                      ]}
                      value={answers.lifestyle}
                      onChange={(value) => {
                        setAnswers({ ...answers, lifestyle: value as any })
                        setTimeout(() => setStep('result'), 300)
                      }}
                    />
                  </StepContent>
                )}

                {step === 'result' && recommendation && (
                  <StepContent key="result">
                    <div className="p-8">
                      <p className="text-stone-400 text-sm uppercase tracking-wider text-center mb-2">
                        Your Perfect Match
                      </p>
                      <h2 className="text-2xl font-light text-stone-900 text-center mb-8">
                        We found your home
                      </h2>

                      {/* Recommendation Card */}
                      <Link
                        to={`/property/${recommendation.slug}`}
                        onClick={() => { setIsOpen(false); reset(); }}
                        className="block group"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-6">
                          <img
                            src={recommendation.image_url}
                            alt={recommendation.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h3 className="text-xl text-stone-900 mb-2">
                          {recommendation.title}
                        </h3>
                        <p className="text-stone-500 text-sm mb-4">
                          {recommendation.area} · {recommendation.price}
                        </p>
                        <span className="inline-flex items-center gap-2 text-stone-900 text-sm font-medium">
                          View This Home
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </Link>

                      {/* Try Again */}
                      <button
                        onClick={reset}
                        className="w-full mt-6 py-3 text-stone-500 text-sm hover:text-stone-900 transition-colors"
                      >
                        Try different answers
                      </button>
                    </div>
                  </StepContent>
                )}
              </AnimatePresence>

              {/* Close Button */}
              <button
                onClick={() => { setIsOpen(false); reset(); }}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function StepContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

function QuestionStep({ 
  question, 
  step, 
  options, 
  value, 
  onChange 
}: { 
  question: string
  step: number
  options: { value: string; label: string }[]
  value: string | null
  onChange: (value: string) => void
}) {
  return (
    <div className="p-8">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-stone-900' : 'bg-stone-200'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <h2 className="text-2xl font-light text-stone-900 mb-8">
        {question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
              value === option.value
                ? 'border-stone-900 bg-stone-50'
                : 'border-stone-200 hover:border-stone-400'
            }`}
          >
            <span className="text-stone-900">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
