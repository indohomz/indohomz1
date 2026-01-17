/**
 * AvailabilityBadge - Shows property availability status
 * Premium visual indicator for property availability
 */

import { motion } from 'framer-motion'

export type AvailabilityStatus = 'available-now' | 'available-soon' | 'limited' | 'fully-booked'

interface Props {
  status: AvailabilityStatus
  text?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const statusConfig: Record<AvailabilityStatus, {
  bgClass: string
  textClass: string
  dotClass: string
  defaultText: string
}> = {
  'available-now': {
    bgClass: 'bg-emerald-50 border-emerald-200',
    textClass: 'text-emerald-700',
    dotClass: 'bg-emerald-500',
    defaultText: 'Available Now'
  },
  'available-soon': {
    bgClass: 'bg-amber-50 border-amber-200',
    textClass: 'text-amber-700',
    dotClass: 'bg-amber-500',
    defaultText: 'Coming Soon'
  },
  'limited': {
    bgClass: 'bg-orange-50 border-orange-200',
    textClass: 'text-orange-700',
    dotClass: 'bg-orange-500',
    defaultText: 'Limited Availability'
  },
  'fully-booked': {
    bgClass: 'bg-stone-100 border-stone-300',
    textClass: 'text-stone-500',
    dotClass: 'bg-stone-400',
    defaultText: 'Fully Booked'
  }
}

const sizeConfig = {
  sm: 'px-2 py-0.5 text-xs gap-1.5',
  md: 'px-3 py-1 text-sm gap-2',
  lg: 'px-4 py-1.5 text-base gap-2.5'
}

export default function AvailabilityBadge({ 
  status, 
  text, 
  size = 'md',
  className = '' 
}: Props) {
  const config = statusConfig[status]
  const displayText = text || config.defaultText
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        inline-flex items-center rounded-full border backdrop-blur-sm
        ${config.bgClass}
        ${sizeConfig[size]}
        ${className}
      `}
    >
      {/* Animated pulse dot for available-now and limited */}
      {(status === 'available-now' || status === 'limited') && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dotClass} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotClass}`}></span>
        </span>
      )}
      
      {/* Static dot for other statuses */}
      {(status === 'available-soon' || status === 'fully-booked') && (
        <span className={`h-2 w-2 rounded-full ${config.dotClass}`}></span>
      )}
      
      <span className={`font-medium ${config.textClass}`}>
        {displayText}
      </span>
    </motion.div>
  )
}
