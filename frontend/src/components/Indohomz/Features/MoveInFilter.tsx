/**
 * Indohomz - Move-in Timeline Filter
 * Immediately, Within 7 days, Next month
 */

import { useState } from 'react'
import { motion } from 'framer-motion'

export type MoveInTimeline = 'immediately' | 'within-7-days' | 'next-month' | null

interface MoveInFilterProps {
  value: MoveInTimeline
  onChange: (value: MoveInTimeline) => void
}

const options = [
  { value: 'immediately' as const, label: 'Move in Immediately' },
  { value: 'within-7-days' as const, label: 'Within 7 Days' },
  { value: 'next-month' as const, label: 'Next Month' },
]

export default function MoveInFilter({ value, onChange }: MoveInFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(value === option.value ? null : option.value)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            value === option.value
              ? 'text-white'
              : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
          }`}
        >
          {/* Background */}
          {value === option.value && (
            <motion.div
              layoutId="moveInFilter"
              className="absolute inset-0 bg-stone-900 rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          
          {/* Label */}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  )
}

// Inline version for minimal UI
export function MoveInFilterInline({ value, onChange }: MoveInFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedLabel = options.find(o => o.value === value)?.label || 'When are you moving?'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm">{selectedLabel}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 py-2 bg-white rounded-lg shadow-xl border border-stone-100 min-w-[200px] z-50"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                value === option.value
                  ? 'text-stone-900 bg-stone-50'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              {option.label}
            </button>
          ))}
          {value && (
            <button
              onClick={() => {
                onChange(null)
                setIsOpen(false)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-stone-400 hover:bg-stone-50 border-t border-stone-100 mt-1"
            >
              Clear filter
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}
