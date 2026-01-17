/**
 * GuidedDiscovery - Full-screen guided flow
 * "Help me find my space" - Personal, high-end experience
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  isOpen: boolean
  onClose: () => void
}

type Step = 'duration' | 'lifestyle' | 'workspace' | 'result'

interface Answers {
  duration: string | null
  lifestyle: string | null
  workspace: string | null
}

const questions = {
  duration: {
    title: 'How long will you stay?',
    subtitle: 'This helps us find the perfect arrangement',
    options: [
      { value: 'short', label: 'A few months', sublabel: 'Flexible stay' },
      { value: 'medium', label: '6-12 months', sublabel: 'Settling in' },
      { value: 'long', label: 'A year or more', sublabel: 'Making it home' },
    ]
  },
  lifestyle: {
    title: 'Do you prefer quiet or social?',
    subtitle: 'Every home has its own rhythm',
    options: [
      { value: 'quiet', label: 'Quiet & Private', sublabel: 'Your own sanctuary' },
      { value: 'balanced', label: 'Balanced', sublabel: 'Best of both worlds' },
      { value: 'social', label: 'Social & Connected', sublabel: 'Community living' },
    ]
  },
  workspace: {
    title: 'Where do you work from?',
    subtitle: 'So we can match your daily flow',
    options: [
      { value: 'home', label: 'From Home', sublabel: 'Need a good workspace' },
      { value: 'office', label: 'Office/Hybrid', sublabel: 'Commute matters' },
      { value: 'flexible', label: 'Flexible', sublabel: 'Anywhere works' },
    ]
  }
}

const recommendations: Record<string, { title: string; description: string; slug: string }> = {
  'quiet-home': {
    title: 'The Sky Living - DLF Phase 4',
    description: 'A peaceful retreat with dedicated workspace, perfect for focused remote work in a serene environment.',
    slug: 'the-sky-living-dlf-phase-4'
  },
  'social-office': {
    title: 'IndoHomz 241',
    description: 'Vibrant community living with excellent metro connectivity for your daily commute.',
    slug: 'indohomz-241'
  },
  'balanced-flexible': {
    title: 'The Sky Living - Sushant Lok 1',
    description: 'The perfect balance of privacy and community, with flexible spaces that adapt to your lifestyle.',
    slug: 'the-sky-living-sushant-lok-1'
  },
  'default': {
    title: 'Lotus Villa - Sector 27',
    description: 'Our most loved home. Thoughtfully designed spaces that feel like yours from day one.',
    slug: 'lotus-villa-sector-27'
  }
}

export default function GuidedDiscovery({ isOpen, onClose }: Props) {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('duration')
  const [answers, setAnswers] = useState<Answers>({
    duration: null,
    lifestyle: null,
    workspace: null
  })
  const [isExiting, setIsExiting] = useState(false)

  const handleSelect = (key: keyof Answers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
    
    // Auto-advance after selection
    setTimeout(() => {
      if (step === 'duration') setStep('lifestyle')
      else if (step === 'lifestyle') setStep('workspace')
      else if (step === 'workspace') setStep('result')
    }, 400)
  }

  const getRecommendation = () => {
    const key = `${answers.lifestyle}-${answers.workspace}`
    return recommendations[key] || recommendations['default']
  }

  const handleViewProperty = () => {
    const rec = getRecommendation()
    setIsExiting(true)
    setTimeout(() => {
      onClose()
      navigate(`/property/${rec.slug}`)
    }, 300)
  }

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
      setStep('duration')
      setAnswers({ duration: null, lifestyle: null, workspace: null })
      setIsExiting(false)
    }, 300)
  }

  const stepOrder: Step[] = ['duration', 'lifestyle', 'workspace', 'result']
  const currentIndex = stepOrder.indexOf(step)

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[150] bg-stone-50"
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 p-3 rounded-full hover:bg-stone-100 transition-colors"
      >
        <X className="w-5 h-5 text-stone-500" />
      </button>

      {/* Progress */}
      <div className="absolute top-6 left-6 flex gap-2">
        {stepOrder.slice(0, 3).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 w-8 rounded-full transition-colors duration-300 ${
              i <= currentIndex ? 'bg-stone-900' : 'bg-stone-200'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="h-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {step !== 'result' ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl w-full text-center"
            >
              <h2 className="text-stone-900 text-3xl md:text-4xl font-light mb-4">
                {questions[step].title}
              </h2>
              <p className="text-stone-400 mb-12">
                {questions[step].subtitle}
              </p>

              <div className="space-y-4">
                {questions[step].options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleSelect(step, option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                      answers[step] === option.value
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <p className={`font-medium ${
                      answers[step] === option.value ? 'text-white' : 'text-stone-900'
                    }`}>
                      {option.label}
                    </p>
                    <p className={`text-sm mt-1 ${
                      answers[step] === option.value ? 'text-white/70' : 'text-stone-400'
                    }`}>
                      {option.sublabel}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="w-8 h-8 text-stone-600" />
              </motion.div>

              <p className="text-stone-400 text-sm uppercase tracking-[0.2em] mb-4">
                We recommend
              </p>
              
              <h2 className="text-stone-900 text-3xl md:text-4xl font-light mb-4">
                {getRecommendation().title}
              </h2>
              
              <p className="text-stone-500 leading-relaxed mb-12">
                {getRecommendation().description}
              </p>

              <motion.button
                onClick={handleViewProperty}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                View This Home
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <button
                onClick={() => {
                  setStep('duration')
                  setAnswers({ duration: null, lifestyle: null, workspace: null })
                }}
                className="block mx-auto mt-6 text-stone-400 text-sm hover:text-stone-600 transition-colors"
              >
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
