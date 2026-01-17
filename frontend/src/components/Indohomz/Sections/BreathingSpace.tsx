/**
 * BreathingSpace - Dramatic pause sections
 * Premium brands use restraint. This is intentional silence.
 */

import { motion } from 'framer-motion'

interface Props {
  quote: string
  author?: string
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function BreathingSpace({ 
  quote, 
  author,
  variant = 'light',
  size = 'md' 
}: Props) {
  const sizeClasses = {
    sm: 'py-24 md:py-32',
    md: 'py-36 md:py-52',
    lg: 'py-48 md:py-64',
    xl: 'py-56 md:py-80'
  }

  const textSizes = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-4xl',
    lg: 'text-3xl md:text-5xl',
    xl: 'text-4xl md:text-6xl'
  }

  return (
    <section 
      className={`${sizeClasses[size]} ${
        variant === 'dark' ? 'bg-stone-900' : 'bg-stone-50'
      } relative overflow-hidden`}
    >
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className={`font-extralight leading-[1.3] tracking-tight ${textSizes[size]} ${
            variant === 'dark' ? 'text-stone-200' : 'text-stone-800'
          }`}
        >
          {quote}
        </motion.p>

        {author && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`mt-10 text-xs uppercase tracking-[0.3em] ${
              variant === 'dark' ? 'text-stone-500' : 'text-stone-400'
            }`}
          >
            {author}
          </motion.p>
        )}
      </div>
    </section>
  )
}
