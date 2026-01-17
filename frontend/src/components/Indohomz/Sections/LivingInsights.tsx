/**
 * LivingInsights - Data maturity section
 * Shows average stay, popular locations, preferences
 */

import { motion } from 'framer-motion'
import { TrendingUp, MapPin, Users, Clock } from 'lucide-react'

export default function LivingInsights() {
  const insights = [
    {
      icon: Clock,
      value: '8.5',
      unit: 'months',
      label: 'Average stay duration',
      trend: '+12%',
      trendLabel: 'vs last year'
    },
    {
      icon: MapPin,
      value: 'DLF Phase 4',
      unit: '',
      label: 'Most chosen location',
      trend: '34%',
      trendLabel: 'of residents'
    },
    {
      icon: Users,
      value: '67%',
      unit: '',
      label: 'Prefer private rooms',
      trend: '',
      trendLabel: 'growing trend'
    },
    {
      icon: TrendingUp,
      value: '4.8',
      unit: '/5',
      label: 'Average satisfaction',
      trend: '892',
      trendLabel: 'reviews'
    }
  ]

  return (
    <section className="py-32 md:py-40 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-stone-500 text-xs uppercase tracking-[0.3em] mb-4">
            Living Insights
          </p>
          <h2 
            className="text-white font-light leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Understanding how people live helps us create better spaces
          </h2>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-stone-400" />
                </div>

                {/* Value */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-light text-white">
                    {insight.value}
                  </span>
                  {insight.unit && (
                    <span className="text-stone-400 text-lg">
                      {insight.unit}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p className="text-stone-400 text-sm mb-4">
                  {insight.label}
                </p>

                {/* Trend */}
                {insight.trend && (
                  <p className="text-stone-500 text-xs">
                    <span className="text-emerald-400">{insight.trend}</span> {insight.trendLabel}
                  </p>
                )}

                {/* Divider */}
                {index < insights.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-stone-800" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-stone-600 text-xs text-center mt-20"
        >
          Data from 5000+ residents across Gurgaon • Updated monthly
        </motion.p>
      </div>
    </section>
  )
}
