import { TrendingUp, TrendingDown, DollarSign, Users, Home, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: 'revenue' | 'bookings' | 'properties' | 'occupancy';
  trend: 'up' | 'down';
}

const iconMap = {
  revenue: DollarSign,
  bookings: Users,
  properties: Home,
  occupancy: Activity,
};

export default function AnimatedStatCard({ title, value, change, icon, trend }: StatCardProps) {
  const Icon = iconMap[icon];
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-200 dark:border-neutral-700"
    >
      {/* Background Gradient Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
          isPositive 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
        }`}>
          <Icon className="h-6 w-6" />
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
          {title}
        </p>

        {/* Value */}
        <div className="flex items-end justify-between">
          <motion.h3
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="text-3xl font-bold text-neutral-900 dark:text-neutral-100"
          >
            {value}
          </motion.h3>

          {/* Trend */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            isPositive 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>

        {/* Trend Text */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
          {isPositive ? 'Increased' : 'Decreased'} from last month
        </p>
      </div>
    </motion.div>
  );
}
