import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target, Award } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'revenue' | 'performance' | 'prediction' | 'achievement';
}

const categoryConfig = {
  revenue: {
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  performance: {
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  prediction: {
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  achievement: {
    icon: Award,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
};

const impactBadge = {
  high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
};

export default function AIInsightCard({ title, description, impact, category }: InsightCardProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl ${config.bgColor} border border-neutral-200 dark:border-neutral-700 p-5 hover:shadow-lg transition-shadow duration-300`}
    >
      {/* Gradient Background */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${config.color} opacity-20 rounded-full blur-2xl`}></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${impactBadge[impact]}`}>
            {impact.toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>

        {/* Action Button */}
        <button className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          View details →
        </button>
      </div>
    </motion.div>
  );
}
