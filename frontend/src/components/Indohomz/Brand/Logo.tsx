/**
 * Indohomz - Premium Logo
 * Uses actual logo.png from public folder
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
}

export default function Logo({ variant = 'light', size = 'md', showTagline = false }: LogoProps) {
  const isDark = variant === 'dark'
  const accentColor = isDark ? 'text-stone-400' : 'text-stone-500'
  
  const sizes = {
    sm: { height: 'h-10', tagline: 'text-xs' },
    md: { height: 'h-14', tagline: 'text-sm' },
    lg: { height: 'h-20', tagline: 'text-base' },
  }

  return (
    <Link to="/" className="inline-flex items-center gap-2 group">
      {/* Actual Logo Image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="relative flex items-center"
      >
        <img 
          src="/logo.png" 
          alt="Indohomz" 
          className={`${sizes[size].height} w-auto object-contain ${isDark ? 'brightness-0 invert' : ''}`}
        />
      </motion.div>

      {/* Optional Tagline */}
      {showTagline && (
        <span className={`${sizes[size].tagline} ${accentColor} tracking-wide hidden sm:block`}>
          Live Better.
        </span>
      )}
    </Link>
  )
}

// Logo mark for favicon, mobile header, etc.
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <img 
      src="/logo.png" 
      alt="Indohomz" 
      width={size}
      height={size}
      className="object-contain"
    />
  )
}
